<template>
  <div class="content-wrapper">
    <div class="content">
      <div class="jumbotron">
        <h2 class="jumbotron-title">Welcome.</h2>
        <h3 class="jumbotron-slogan">
          Millions of movies, TV shows and people to discover. Explore now.
        </h3>
      </div>
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
  </div>
</template>

<style lang="scss" scoped>
.jumbotron {
  background-image: linear-gradient(
      to right,
      rgba(3, 37, 65, 0.8) 0%,
      rgba(3, 37, 65, 0) 100%
    ),
    url("https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/hreiLoPysWG79TsyQgMzFKaOTF5.jpg");
  height: calc(100vh / 2.5);
  max-height: 360px;
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
  text-align: left;
  padding: 2rem 1rem;
}

.jumbotron-title {
  font-size: 2.5rem;
}

.jumbotron-slogan {
  font-size: 2rem;
}
</style>

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
