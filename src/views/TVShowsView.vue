<template>
  <div class="content-wrapper">
    <div class="content">
      <h1 class="page-title">{{ purpose }}</h1>
      <div class="grid-container">
        <div class="search-bar">
          <SearchBar
            @sort="sort"
            @search="search"
            v-bind:sortFilters="sortFilters"
          />
        </div>
        <div>
          <div class="tv-show-list">
            <CardItem
              v-for="(item, index) in items"
              v-bind:item="item"
              v-bind:index="index"
              v-bind:key="item.id"
              type="tv"
              class="tv-show-item"
            ></CardItem>
          </div>
          <div class="pagination">
            <div class="load-more" @click="loadMore()">Load More</div>
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

.page-title {
  text-align: left;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 10px;
}

.container {
  margin: 0 auto;
}

.tv-show-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
}

.tv-show-item {
  margin: 0 10px 15px;
  max-width: 150px;
}

.pagination {
  margin: 2rem 0;
}

.load-more {
  color: #fff;
  background-color: #10a2ce;
  padding: 1rem 0;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
}
</style>

<script lang="ts">
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { onMounted, Ref, watch } from "vue";
import { TVShow } from "@/types";
import axios from "axios";

export default {
  data() {
    return {
      sortFilters: [
        { id: 1, label: "Popularity Descending", value: "popularity.desc" },
        { id: 2, label: "Popularity Ascending", value: "popularity.asc" },
        { id: 3, label: "Rating Descending", value: "vote_average.desc" },
        { id: 4, label: "Rating Ascending", value: "vote_average.asc" },
        {
          id: 5,
          label: "Release Descending",
          value: "first_air_date.desc",
        },
        {
          id: 6,
          label: "Release Ascending",
          value: "first_air_date.asc",
        },
      ],
    };
  },
  computed: {
    purpose() {
      const route = useRoute();
      switch (route.params.section) {
        case "airing-today":
          return "TV SHows Airing Today";

        case "on-the-air":
          return "Currently Airing TV SHows";

        case "top-rated":
          return "Top Rated TV SHows ";

        default:
          return "Popular TV SHows ";
      }
    },
  },
  setup() {
    const loading: Ref<boolean> = ref(false);
    const items: Ref<TVShow[] | never[]> = ref([]);
    const page: Ref<number> = ref(1);
    const route = useRoute();
    let purpose =
      route.params.section?.toString().replace(/-/g, "_") || "popular";
    let sortBy = "popularity.desc";
    let searchQuery = false;

    watch(
      () => route.params,
      (toParams) => {
        if (toParams.section) {
          purpose = toParams.section.toString().replace(/-/g, "_");
          loading.value = true;
          axios
            .get(
              `https://api.themoviedb.org/3/tv/${purpose}?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US&page=${page.value}`
            )
            .then((response) => {
              loading.value = false;
              const { data } = response;
              items.value = data.results;
            });
        }
      }
    );

    onMounted(() => {
      loading.value = true;
      document.title = `TV Shows -- Movie DB`;
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${purpose}?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US&page=${page.value}`
        )
        .then((response) => {
          loading.value = false;
          const { data } = response;
          items.value = data.results;
        });
    });

    function loadMore() {
      page.value = page.value + 1;
      loading.value = true;
      if (!searchQuery) {
        axios
          .get(
            `https://api.themoviedb.org/3/tv/${purpose}?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US&page=${page.value}`
          )
          .then((response) => {
            loading.value = false;
            const { data } = response;
            items.value.push.apply(items.value, data.results);
          });
      } else {
        axios
          .get(
            `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US&page=${page.value}&sort_by=${sortBy}`
          )
          .then((response) => {
            loading.value = false;
            const { data } = response;
            items.value.push.apply(items.value, data.results);
          });
      }
    }

    function sort(filter: string) {
      sortBy = filter;
    }

    function search() {
      searchQuery = true;
      loading.value = true;
      page.value = 1;
      axios
        .get(
          `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US&page=${page.value}&sort_by=${sortBy}`
        )
        .then((response) => {
          loading.value = false;
          const { data } = response;
          items.value = data.results;
        });
    }

    return {
      items,
      loading,
      loadMore,
      search,
      sort,
    };
  },
};
</script>
