<template>
  <div class="person-content-wrapper">
    <div class="person-content" v-if="person">
      <div class="left-column">
        <div class="person-poster">
          <img
            v-if="person.profile_path"
            :src="
              'https://image.tmdb.org/t/p/w300_and_h450_bestv2' +
              person.profile_path
            "
            :alt="person.name"
            class="profile"
          />
          <img
            v-else
            src="@/assets/no-user-img.svg"
            :alt="person.name"
            class="profile"
          />
        </div>
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
              :href="'https://www.instagram.com/' + externalLinks.instagram_id"
              title="Visit Instagram"
              target="_blank"
              rel="noopener"
              data-role="tooltip"
            >
              <span class="fa-brands fa-instagram fa-lg"></span>
            </a>
          </div>
          <div v-if="person.homepage" class="social-link website">
            <a
              :href="person.homepage"
              title="Visit Website"
              target="_blank"
              rel="noopener"
              data-role="tooltip"
            >
              <i class="fas fa-link fa-lg"></i>
            </a>
          </div>
        </div>
        <div class="personal-info">
          <h2>Personal Info</h2>
          <div class="personal-fact">
            <p>
              <strong>Known For</strong>
            </p>
            <span>
              {{ person.known_for_department }}
            </span>
          </div>
          <div class="personal-fact">
            <p>
              <strong>Gender</strong>
            </p>
            <span>
              {{ gender }}
            </span>
          </div>
          <div class="personal-fact">
            <p>
              <strong>Birthday</strong>
            </p>
            <span> {{ birthday }} </span>
          </div>
          <div class="personal-fact">
            <p>
              <strong>Place of Birth</strong>
            </p>
            <span>
              {{ birthPlace }}
            </span>
          </div>
          <div v-if="person.also_known_as.length !== 0" class="personal-fact">
            <p>
              <strong>Also Known As</strong>
            </p>
            <ul class="aka">
              <li v-for="(aka, index) in person.also_known_as" :key="index">
                {{ aka }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="right-column">
        <h1 class="person-name">{{ person.name }}</h1>
        <div class="biography">
          <h3>Biography</h3>
          <p>{{ biography }}</p>
        </div>
        <div class="credits">
          <CreditsTable :credits="actingHistory" title="Acting" />
          <CreditsTable :credits="productionCrewHistory" title="Production" />
          <CreditsTable :credits="artCrewHistory" title="Art" />
          <CreditsTable :credits="soundCrewHistory" title="Sound" />
          <CreditsTable :credits="writingCrewHistory" title="Writing" />
          <CreditsTable :credits="directingCrewHistory" title="Directing" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.person-content-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
}

.person-content {
  display: flex;
  flex-direction: row;
  padding: 30px 0;
  width: 95%;
}

.person-poster {
  height: 450px;
  width: 300px;
}

.profile {
  border-radius: 15px;
  height: 450px;
  width: 300px;
  background-color: #dbdbdb;
}

.person-info {
  padding-left: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.person-name {
  margin: 0 0 3px;
  font-size: 2rem;
}

.biography {
  text-align: left;
}

.facts {
  display: inline-flex;
  margin-bottom: 24px;
}

.personal-info {
  text-align: left;

  h2 {
    font-size: 1.3em;
    font-weight: 600;
    margin-bottom: 0;
  }
}

.right-column {
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
}

.left-column {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.person-cast {
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
  margin: 20px 0;
}

.social-link {
  margin-right: 15px;
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

.personal-fact {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  p {
    margin-bottom: 1px;
  }
}

.aka {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.credits {
  width: 100%;
}
</style>

<script lang="ts">
import { Credits, CrewCredits, CreditsGroupedByDate } from "@/types";
import axios from "axios";
import moment from "moment";
import { defineComponent, onMounted, Ref, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const loading = ref(false);
    const person = ref(null);
    const route = useRoute();
    const personId = route.params.personId;
    const gender: Ref<string> = ref("");
    const biography: Ref<string> = ref("");
    const birthday: Ref<string> = ref("");
    const birthPlace: Ref<string> = ref("");
    const externalLinks = ref(null);
    const actingHistory: Ref<CreditsGroupedByDate[] | never[]> = ref([]);
    const artCrewHistory: Ref<CreditsGroupedByDate[] | never[]> = ref([]);
    const productionCrewHistory: Ref<CreditsGroupedByDate[] | never[]> = ref(
      []
    );
    const soundCrewHistory: Ref<CreditsGroupedByDate[] | never[]> = ref([]);
    const writingCrewHistory: Ref<CreditsGroupedByDate[] | never[]> = ref([]);
    const directingCrewHistory: Ref<CreditsGroupedByDate[] | never[]> = ref([]);

    const rearrangeArray = (arr: Credits[]) => {
      return arr
        .sort((a: Credits, b: Credits) => {
          const aDate = a.release_date || a.first_air_date || "Z";
          const bDate = b.release_date || b.first_air_date || "Z";
          if (aDate < bDate) return 1;
          return -1;
        })
        .map((credits: Credits) => {
          return {
            ...credits,
            release_year:
              credits.release_date?.substring(0, 4) ||
              credits.first_air_date?.substring(0, 4) ||
              "-",
          };
        })
        .reduce((group, credit) => {
          const year = group.find(
            (a) => a.release_year === credit.release_year
          );
          if (!year) {
            group.push({
              release_year: credit.release_year,
              credits: [credit],
            });
          } else {
            year.credits.push(credit);
          }
          return group;
        }, [] as CreditsGroupedByDate[]);
    };

    onMounted(() => {
      loading.value = true;
      axios
        .get(
          `https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US`
        )
        .then((response) => {
          const { data } = response;

          document.title = `${data.name} -- Movie DB`;
          person.value = data;
          gender.value =
            data.gender === 0 ? "-" : data.gender === 1 ? "Female" : "Male";
          birthday.value = data.birthday
            ? `${data.birthday} (${moment().diff(
                data.birthday,
                "years",
                false
              )} years old)`
            : "-";
          birthPlace.value = data.place_of_birth ? data.place_of_birth : "-";
          biography.value =
            data.biography !== ""
              ? data.biography
              : `We don't have a biography for ${data.name}.`;
        });

      axios
        .get(
          `https://api.themoviedb.org/3/person/${personId}/external_ids?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US`
        )
        .then((response) => {
          const { data } = response;
          externalLinks.value = data;
        });

      axios
        .get(
          `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US`
        )
        .then((response) => {
          const { data } = response;
          actingHistory.value = rearrangeArray(data.cast);
          const crew = data.crew;
          productionCrewHistory.value = rearrangeArray(
            crew.filter((item: CrewCredits) => item.department === "Production")
          );
          soundCrewHistory.value = rearrangeArray(
            crew.filter((item: CrewCredits) => item.department === "Sound")
          );
          writingCrewHistory.value = rearrangeArray(
            crew.filter((item: CrewCredits) => item.department === "Writing")
          );
          directingCrewHistory.value = rearrangeArray(
            crew.filter((item: CrewCredits) => item.department === "Directing")
          );
          artCrewHistory.value = rearrangeArray(
            crew.filter((item: CrewCredits) => item.department === "Art")
          );
        });
    });

    return {
      actingHistory,
      biography,
      birthday,
      birthPlace,
      externalLinks,
      gender,
      loading,
      person,
      artCrewHistory,
      directingCrewHistory,
      productionCrewHistory,
      soundCrewHistory,
      writingCrewHistory,
    };
  },
});
</script>
