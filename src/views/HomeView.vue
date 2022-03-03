<template>
  <div>
    <CardList
      purpose="What's Popular"
      :options="[
        { title: 'On TV', value: 'tv' },
        { title: 'In Theatres', value: 'movie' },
      ]"
    />
    <!-- <CardList
      purpose="Free To Watch"
      :options="[
        { title: 'Movie', value: 'movie' },
        { title: 'TV', value: 'tv' },
      ]"
    /> -->
    <CardList
      purpose="Trending"
      :options="[
        { title: 'Today', value: 'day' },
        { title: 'This Week', value: 'week' },
      ]"
    />
  </div>
</template>

<script lang="ts">
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    onMounted(() => {
      document.title = `Home -- Movie DB`;
    });
  },
};
</script>
