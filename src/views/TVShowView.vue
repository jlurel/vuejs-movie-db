<template>
  <div class="content" v-if="tvShow">
    <div
      class="tv-show-header"
      v-bind:style="{
        backgroundPosition: 'right -200px top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(
          https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${tvShow.backdrop_path}
        )`,
      }"
    >
      <div class="fade">
        <div class="single-column">
          <div class="tv-show-poster">
            <img
              v-if="tvShow.poster_path"
              v-bind:src="poster"
              v-bind:alt="tvShow.name"
              loading="lazy"
            />
            <img v-else src="@/assets/no-image.svg" v-bind:alt="tvShow.name" />
          </div>
          <div class="tv-show-info">
            <h1 class="tv-show-title">{{ tvShow.name }}</h1>
            <div class="facts">
              <span class="release">{{ releaseDate }}</span>
              <span class="genres">
                {{ genres }}
              </span>
            </div>
            <div class="actions">
              <RatingCircle
                v-if="tvShow.vote_average !== 0"
                :rating="tvShow.vote_average * 10"
              />
            </div>
            <div class="tv-show-tagline-overview">
              <h2 class="tv-show-tagline">{{ tvShow.tagline }}</h2>
              <h2>Overview</h2>
              <div class="tv-show-overview">
                <p>{{ tvShow.overview }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tv-show-content-wrapper">
      <div class="tv-show-content">
        <div class="left-column">
          <div class="tv-show-cast">
            <h2>Series Cast</h2>
            <div class="card-list scroller fading">
              <CastMemberCard
                v-for="(member, index) in cast"
                v-bind:key="index"
                v-bind:member="member"
              />
            </div>
          </div>
        </div>
        <div class="right-column">
          <div class="social-links">
            <div v-if="externalLinks?.facebook_id" class="social-link">
              <a
                :href="'https://www.facebook.com/' + externalLinks.facebook_id"
                title="Visit Facebook"
                target="_blank"
                rel="noopener"
                data-role="tooltip"
              >
                <span
                  class="fa-brands fa-facebook fa-lg"
                  aria-hidden="true"
                ></span>
              </a>
            </div>
            <div v-if="externalLinks?.twitter_id" class="social-link">
              <a
                :href="'https://www.twitter.com/' + externalLinks.twitter_id"
                title="Visit Twitter"
                target="_blank"
                rel="noopener"
                data-role="tooltip"
              >
                <span class="fa-brands fa-twitter fa-lg"></span>
              </a>
            </div>
            <div v-if="externalLinks?.instagram_id" class="social-link">
              <a
                :href="
                  'https://www.instagram.com/' + externalLinks.instagram_id
                "
                title="Visit Instagram"
                target="_blank"
                rel="noopener"
                data-role="tooltip"
              >
                <span class="fa-brands fa-instagram fa-lg"></span>
              </a>
            </div>
            <div v-if="tvShow.homepage" class="social-link website">
              <a
                :href="tvShow.homepage"
                title="Visit Website"
                target="_blank"
                rel="noopener"
                data-role="tooltip"
              >
                <i class="fas fa-link fa-lg"></i>
              </a>
            </div>
          </div>
          <div class="tv-show-fact">
            <p>
              <strong>Status</strong>
            </p>
            {{ tvShow.status }}
          </div>
          <div class="tv-show-fact">
            <p>
              <strong>Network</strong>
            </p>
            <ul class="networks">
              <li v-for="(network, index) in networks" :key="index">
                <img
                  :src="'https://image.tmdb.org/t/p/h30' + network.logo_path"
                  :alt="network.name"
                />
              </li>
            </ul>
          </div>
          <div class="tv-show-fact">
            <p>
              <strong>Type</strong>
            </p>
            {{ tvShow.type }}
          </div>
          <div class="tv-show-fact">
            <p>
              <strong>Original Language</strong>
            </p>
            {{ originalLanguage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.tv-show-header {
  width: 100%;
  color: white;
  display: flex;
}

.fade {
  background-image: linear-gradient(
    to right,
    rgba(10.5, 31.5, 31.5, 1) 150px,
    rgba(10.5, 31.5, 31.5, 0.84) 100%
  );
  display: flex;
  justify-content: center;
  padding: 30px 40px;
  box-sizing: content-box;
  width: 100%;
}

.single-column {
  display: flex;
  width: 80%;
}

.tv-show-poster {
  height: 450px;
  width: 300px;
}

.tv-show-info {
  padding-left: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.tv-show-title {
  margin: 0 0 3px;
  font-size: 1.5rem;
}

.facts {
  display: inline-flex;
  margin-bottom: 24px;
}

.genres,
.runtime {
  padding-left: 20px;
  position: relative;
  display: inline-flex;
  width: max-content;

  &::before {
    content: "\2022";
    position: absolute;
    top: 0;
    left: 7px;
  }
}

.genre {
  margin: 0 2px;
}

.actions {
  margin-bottom: 24px;
}

.legend {
  font-size: 0.5rem;
}

.tv-show-tagline-overview {
  text-align: left;

  h2 {
    font-size: 1.1em;
  }
}

.tv-show-tagline {
  font-weight: 400;
  font-style: italic;
  opacity: 0.7;
}

.tv-show-content-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
}

.tv-show-content {
  display: flex;
  flex-direction: row;
  padding: 30px 0;
  width: 80%;
}

.left-column {
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.right-column {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
}

.tv-show-cast {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  h2 {
    margin-top: 0;
    font-size: 1.2rem;
    text-align: left;
  }
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

.social-links {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.social-link {
  margin: 0 15px;
}

.social-link a {
  color: var(--font-color);
}

.website {
  border-left: 1px solid #d7d7d7;

  a {
    margin-left: 12px;
  }
}

.tv-show-fact {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  p {
    margin-bottom: 1px;
  }
}

.networks {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

@media screen and (max-width: 750px) {
  .fade {
    flex-direction: column;
  }

  .tv-show-info {
    padding-right: 2rem;
  }

  .tv-show-content {
    flex-direction: column;
  }

  .left-column {
    width: 100%;
    margin-bottom: 30px;
  }

  .right-column {
    width: 100%;
    padding-left: 20px;
  }
}
</style>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import moment from "moment";
import ISO6391 from "iso-639-1";
import { TVShow } from "@/types";

export default defineComponent({
  setup() {
    const route = useRoute();
    const loading = ref(false);
    const tvShowId = route.params.id;
    const tvShow: Ref<TVShow | null> = ref(null);
    const poster = ref("");
    const releaseDate = ref("");
    const originalLanguage = ref("English");
    const cast = ref([]);
    const genres = ref([]);
    const externalLinks = ref(null);
    const networks = ref([]);

    onMounted(() => {
      loading.value = true;
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US`
        )
        .then((response) => {
          loading.value = false;
          const { data } = response;
          tvShow.value = data;
          poster.value = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${data.poster_path}`;

          document.title = `${data.name} -- Movie DB`;

          releaseDate.value = moment(data.first_air_date).format("DD/MM/YYYY");

          originalLanguage.value = ISO6391.getName(data.original_language);
          genres.value = data.genres
            .map((genre: { id: number; name: string }) => genre.name)
            .join(", ");

          networks.value = data.networks;
        });
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${tvShowId}/credits?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US`
        )
        .then((response) => {
          const { data } = response;
          cast.value = data.cast;
        });
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${tvShowId}/external_ids?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US`
        )
        .then((response) => {
          const { data } = response;
          externalLinks.value = data;
        });
    });

    return {
      cast,
      externalLinks,
      genres,
      tvShowId,
      tvShow,
      networks,
      originalLanguage,
      poster,
      releaseDate,
    };
  },
});
</script>
