<template>
  <div class="content">
    <h1>Popular People</h1>
    <div class="person-list">
      <CardItem
        v-for="(item, index) in persons"
        v-bind:item="item"
        v-bind:index="index"
        v-bind:key="item.id"
        class="person-item"
        type="people"
      ></CardItem>
    </div>
    <VuePaginationTw
      :total-items="10000"
      :current-page="page"
      :per-page="20"
      @page-changed="loadMore((page = $event))"
      :go-button="false"
      styled="centered"
    />
  </div>
</template>

<style lang="scss">
@import "vue-pagination-tw/styles";

h1 {
  font-size: 2rem;
  font-weight: 700;
}

h2 {
  font-size: 1em;
  font-weight: 700;
}

.person-list {
  display: grid;
  grid-template-columns: repeat(var(--numberOfColumns), 1fr);
  margin: 0 40px;
}

.person-item {
  margin-bottom: 15px;
  max-width: 235px;
}
</style>

<script lang="ts">
import { Person } from "@/types";
import axios from "axios";
import { defineComponent, onMounted, Ref, ref } from "vue";

export default defineComponent({
  setup() {
    const loading = ref(false);
    const persons: Ref<Person[] | never[]> = ref([]);
    const page: Ref<number> = ref(1);

    onMounted(() => {
      loading.value = true;
      axios
        .get(
          `https://api.themoviedb.org/3/person/popular?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US&page=1`
        )
        .then((response) => {
          loading.value = false;
          const { data } = response;
          persons.value = data.results;
        });
    });

    const loadMore = (currentPage: number) => {
      loading.value = true;
      axios
        .get(
          `https://api.themoviedb.org/3/person/popular?api_key=${process.env.VUE_APP_MOVIE_DB_API_KEY}&language=en-US&page=${currentPage}`
        )
        .then((response) => {
          loading.value = false;
          const { data } = response;
          persons.value = data.results;
        });
    };

    return {
      loading,
      loadMore,
      page,
      persons,
    };
  },
});
</script>
