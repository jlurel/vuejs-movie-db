<template>
  <div class="card">
    <div class="card-img">
      <router-link :to="link">
        <img
          v-if="item.poster_path"
          v-bind:src="poster"
          v-bind:alt="label"
          class="poster"
          loading="lazy"
        />
        <img
          v-else-if="item.profile_path"
          v-bind:src="profile"
          v-bind:alt="label"
          class="profile"
          loading="lazy"
        />
        <img
          v-else
          src="@/assets/no-image.svg"
          v-bind:alt="label"
          class="poster"
          loading="lazy"
        />
      </router-link>
    </div>
    <div class="card-content">
      <div v-if="item.vote_average" class="rating">
        <RatingCircle
          v-if="item.vote_average !== 0"
          :rating="item.vote_average * 10"
        />
        <div v-else class="no-rating">
          <span>NR</span>
        </div>
      </div>
      <router-link :to="link">
        <h2>{{ label }}</h2>
      </router-link>
      <p v-if="knownFor">{{ knownFor }}</p>
      <p v-else-if="date">{{ date }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ref, PropType } from "vue";
import moment from "moment";
import { Movie, MovieDbObject, Person, TVShow } from "@/types";

export default defineComponent({
  data: () => ({
    gradient: {
      radial: false,
      colors: [
        {
          color: "#f74646",
          offset: "35",
          opacity: "0.6",
        },
        {
          color: "lime",
          offset: "100",
          opacity: "1",
        },
      ],
    },
  }),
  props: {
    item: Object as PropType<MovieDbObject>,
    type: String,
  },
  computed: {
    date() {
      if (
        (this.item as Movie).release_date ||
        (this.item as TVShow).first_air_date
      ) {
        return moment(
          (this.item as Movie).release_date ||
            (this.item as TVShow).first_air_date
        ).format("DD MMM YYYY");
      } else {
        return null;
      }
    },
    knownFor() {
      if ((this.item as Person).known_for) {
        return (
          ((this.item as Person).known_for[0] as Movie).title ||
          ((this.item as Person).known_for[0] as TVShow).name
        );
      } else {
        return null;
      }
    },
  },
  setup(props) {
    const poster = ref(
      `https://image.tmdb.org/t/p/w220_and_h330_face${
        (props.item as Movie | TVShow)?.poster_path
      }`
    );
    const profile = ref(
      `https://image.tmdb.org/t/p/w235_and_h235_face${
        (props.item as Person)?.profile_path
      }`
    );

    const label = ref(
      (props.item as TVShow | Person)?.name || (props.item as Movie)?.title
    );

    const link = ref(`/movie/${(props.item as MovieDbObject).id}`);

    switch (props.type) {
      case "tv":
        link.value = `/tv-show/${(props.item as MovieDbObject).id}`;
        break;

      case "people":
        link.value = `/person/${(props.item as MovieDbObject).id}`;

        break;

      default:
        link.value = `/movie/${(props.item as MovieDbObject).id}`;
        break;
    }

    return { poster, label, link, profile };
  },
});
</script>

<style lang="scss">
.card {
  margin-left: 20px;
  background-color: var(--secondary-bg-color);
  border-radius: 15px;
  box-shadow: 0 2px 8px var(--box-shadow-color);
}

.poster {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  height: 225px;
  width: 150px;
  background-color: #dbdbdb;
}

.profile {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  height: 235px;
  width: 235px;
  background-color: #dbdbdb;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  position: relative;
  padding: 15px 10px 10px;

  .rating {
    height: 50px;
    width: 50px;
    position: absolute;
    top: -35px;
    left: -10px;
    color: #fff;
    background-color: black;
    border-radius: 50px;
  }

  .no-rating {
    border: 1px solid #ffffff94;
    padding: 5px;
  }

  a {
    text-decoration: none;
    color: var(--font-color);
  }

  h2 {
    font-size: 1em;
    margin: 0;
    word-wrap: normal;
    overflow-wrap: break-word;
  }

  p {
    font-size: 1em;
    color: rgba($color: var(--font-color), $alpha: 0.6);
    margin: 0;
  }
}
</style>
