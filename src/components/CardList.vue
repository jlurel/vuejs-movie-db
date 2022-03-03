<template>
  <div class="column-header">
    <h2>{{ purpose }}</h2>
    <div class="selector-wrap">
      <div class="selector">
        <div
          v-for="(option, index) in options"
          v-bind:option="option"
          v-bind:key="index"
          class="anchor"
          :class="{ selected: selected === option.value }"
          @click="selectOption(option.value)"
        >
          <h3>{{ option.title }}</h3>
        </div>
      </div>
    </div>
  </div>
  <div class="card-list-wrapper">
    <div class="card-list scroller fading">
      <CardItem
        v-for="(item, index) in items"
        v-bind:item="item"
        v-bind:index="index"
        v-bind:key="item.id"
      ></CardItem>
    </div>
  </div>
</template>

<style lang="scss">
.column-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 2rem;
}

.selector {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid black;
  border-radius: 30px;
  height: 30px;
  margin-left: 5px;
}

.anchor {
  height: 30px;
  display: flex;
  align-items: center;
}

.anchor h3 {
  padding: 0 10px;
  font-weight: 300;
}

.anchor.selected {
  background-color: black;
  color: var(--primary-color);
  border-radius: 30px;
  height: 30px;
}

.card-list-wrapper {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.card-list {
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  padding: 1rem 0;
}

.card-list > div:first-child {
  margin-left: 40px;
}

.scroller {
  overflow-x: scroll;
  overflow-y: hidden;
}

.fading::after {
  content: "";
  width: 60px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-image: linear-gradient(
    to right,
    var(--from-left-gradient-color) 0%,
    var(--to-right-gradient-color) 100%
  );
  will-change: opacity;
  pointer-events: none;
}
</style>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, Ref } from "vue";
import axios from "axios";
import { MovieDbObject, Option } from "@/types";

export default defineComponent({
  props: {
    purpose: String,
    options: Array as PropType<Option[]>,
  },
  setup(props) {
    const loading = ref(false);
    const items: Ref<MovieDbObject[] | never[]> = ref([]);
    const selected = ref((props.options as Option[])[0].value);
    const request = ref("");

    switch (props.purpose) {
      case "Free To Watch":
        request.value = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US&include_adult=true&include_video=false&page=1&with_watch_monetization_types=free`;
        break;

      case "What's Popular":
        request.value = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US&page=1`;
        break;

      default:
        request.value = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}`;
        break;
    }

    function selectOption(option: string) {
      selected.value = option;
      loading.value = true;

      switch (props.purpose) {
        case "Free To Watch":
          axios
            .get(
              `https://api.themoviedb.org/3/discover/${selected.value}?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US&include_adult=true&include_video=false&page=1&with_watch_monetization_types=free`
            )
            .then((response) => {
              const { data } = response;
              items.value = data.results;
              loading.value = false;
            });
          break;

        case "What's Popular":
          axios
            .get(
              `https://api.themoviedb.org/3/${selected.value}/popular?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US&page=1`
            )
            .then((response) => {
              const { data } = response;
              items.value = data.results;
              loading.value = false;
            });
          break;

        default:
          axios
            .get(
              `https://api.themoviedb.org/3/trending/all/${selected.value}?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}`
            )
            .then((response) => {
              const { data } = response;
              items.value = data.results;
              loading.value = false;
            });
          break;
      }
    }

    onMounted(() => {
      loading.value = true;
      axios.get(request.value).then((response) => {
        const { data } = response;
        items.value = data.results;
        loading.value = false;
      });
    });

    return {
      loading,
      items,
      selected,
      selectOption,
    };
  },
});
</script>
