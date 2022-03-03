<template>
  <div class="content-wrapper">
    <div class="content">
      <h1 class="page-title">{{ purpose }} Movies</h1>
      <div class="grid-container">
        <div class="search-bar">
          <SearchBar
            @sort="sort"
            @search="search"
            v-bind:sortFilters="sortFilters"
          />
        </div>
        <div>
          <div class="container">
            <div class="movie-list">
              <CardItem
                v-for="(item, index) in items"
                v-bind:item="item"
                v-bind:index="index"
                v-bind:key="item.id"
                type="movie"
                class="movie-item"
              ></CardItem>
            </div>
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

.movie-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
}

.movie-item {
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
import { Movie } from "@/types";
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
          value: "primary_release_date.desc",
        },
        {
          id: 6,
          label: "Release Ascending",
          value: "primary_release_date.asc",
        },
        {
          id: 7,
          label: "Title (A-Z)",
          value: "original_title.asc",
        },
        {
          id: 8,
          label: "Title (Z-A)",
          value: "original_title.desc",
        },
      ],
    };
  },
  computed: {
    purpose() {
      const route = useRoute();
      switch (route.params.section) {
        case "now-playing":
          return "Now Playing";

        case "upcoming":
          return "Upcoming";

        case "top-rated":
          return "Top Rated";

        default:
          return "Popular";
      }
    },
  },
  setup() {
    const loading: Ref<boolean> = ref(false);
    const items: Ref<Movie[] | never[]> = ref([]);
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
          page.value = 1;
          loading.value = true;
          axios
            .get(
              `https://api.themoviedb.org/3/movie/${purpose}?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US&page=${page.value}`
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
      document.title = `Movies -- Movie DB`;
      loading.value = true;
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${purpose}?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US&page=${page.value}`
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
            `https://api.themoviedb.org/3/movie/${purpose}?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US&page=${page.value}`
          )
          .then((response) => {
            loading.value = false;
            const { data } = response;
            items.value.push.apply(items.value, data.results);
          });
      } else {
        axios
          .get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US&page=${page.value}&sort_by=${sortBy}`
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
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US&page=${page.value}&sort_by=${sortBy}`
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
