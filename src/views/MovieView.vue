<template>
  <div class="content" v-if="movie">
    <div
      class="movie-header"
      v-bind:style="{
        backgroundPosition: 'right -200px top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(
          https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}
        )`,
      }"
    >
      <div class="fade">
        <div class="single-column">
          <div class="movie-poster">
            <img
              v-if="movie.poster_path"
              v-bind:src="poster"
              v-bind:alt="movie.title"
              loading="lazy"
            />
            <img v-else src="@/assets/no-image.svg" v-bind:alt="movie.title" />
          </div>
          <div class="movie-info">
            <h1 class="movie-title">{{ movie.title }}</h1>
            <div class="facts">
              <span class="release">{{ releaseDate }}</span>
              <span class="genres">
                {{ genres }}
              </span>
              <span class="runtime">{{ runtime }}</span>
            </div>
            <div class="actions">
              <RatingCircle
                v-if="movie.vote_average !== 0"
                :rating="movie.vote_average * 10"
              />
            </div>
            <div class="movie-tagline-overview">
              <h2 class="movie-tagline">{{ movie.tagline }}</h2>
              <h2>Overview</h2>
              <div class="movie-overview">
                <p>{{ movie.overview }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="movie-content-wrapper">
      <div class="movie-content">
        <div class="left-column">
          <div class="movie-cast">
            <h2>Top Billed Cast</h2>
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
            <div v-if="movie.homepage" class="social-link website">
              <a
                :href="movie.homepage"
                title="Visit Website"
                target="_blank"
                rel="noopener"
                data-role="tooltip"
              >
                <i class="fas fa-link fa-lg"></i>
              </a>
            </div>
          </div>
          <div class="movie-fact">
            <p>
              <strong>Status</strong>
            </p>
            {{ movie.status }}
          </div>
          <div class="movie-fact">
            <p>
              <strong>Original Language</strong>
            </p>
            {{ originalLanguage }}
          </div>
          <div class="movie-fact">
            <p>
              <strong>Budget</strong>
            </p>
            {{ budget }}
          </div>
          <div class="movie-fact">
            <p>
              <strong>Revenue</strong>
            </p>
            {{ revenue }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movie-header {
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

.movie-poster {
  height: 450px;
  width: 300px;
}

.movie-info {
  padding-left: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.movie-title {
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

.movie-tagline-overview {
  text-align: left;

  h2 {
    font-size: 1.1em;
  }
}

.movie-tagline {
  font-weight: 400;
  font-style: italic;
  opacity: 0.7;
}

.movie-content-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
}

.movie-content {
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

.movie-cast {
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

.movie-fact {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  p {
    margin-bottom: 1px;
  }
}

@media screen and (max-width: 750px) {
  .fade {
    flex-direction: column;
  }

  .movie-info {
    padding-right: 2rem;
  }

  .movie-content {
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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import numeral from "numeral";
import axios from "axios";
import moment from "moment";
import ISO6391 from "iso-639-1";
import { Movie } from "@/types";

export default defineComponent({
  setup() {
    const route = useRoute();
    const loading = ref(false);
    const movieId = route.params.id;
    const movie: Ref<Movie | null> = ref(null);
    const poster = ref("");
    const runtime = ref("");
    const releaseDate = ref("");
    const budget = ref("");
    const revenue = ref("");
    const originalLanguage = ref("English");
    const cast = ref([]);
    const genres = ref([]);
    const externalLinks = ref(null);

    onMounted(() => {
      loading.value = true;
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US`
        )
        .then((response) => {
          loading.value = false;
          const { data } = response;

          document.title = `${data.title} -- Movie DB`;
          movie.value = data;
          poster.value = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${data.poster_path}`;

          const hours = data.runtime / 60;
          const rhours = Math.floor(hours);
          const minutes = (hours - rhours) * 60;
          const rminutes = Math.round(minutes);

          runtime.value = `${rhours}h${rminutes}`;

          releaseDate.value = moment(data.release_date).format("DD/MM/YYYY");
          budget.value =
            data.budget !== 0 ? `$${numeral(data.budget).format("0,0")}` : "-";
          revenue.value =
            data.revenue !== 0
              ? `$${numeral(data.revenue).format("0,0")}`
              : "-";

          originalLanguage.value = ISO6391.getName(data.original_language);
          genres.value = data.genres
            .map((genre: { id: number; name: string }) => genre.name)
            .join(", ");
        });
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US`
        )
        .then((response) => {
          const { data } = response;
          cast.value = data.cast;
        });
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}/external_ids?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US`
        )
        .then((response) => {
          const { data } = response;
          externalLinks.value = data;
        });
    });

    return {
      budget,
      externalLinks,
      cast,
      genres,
      movieId,
      movie,
      originalLanguage,
      poster,
      releaseDate,
      revenue,
      runtime,
    };
  },
});
</script>
