<template>
  <ve-progress
    :progress="rating"
    :size="50"
    :color="gradient"
    empty-color="#324c7e"
    lineMode="in 2"
  >
    <template #legend>
      <span class="legend">%</span>
    </template>
  </ve-progress>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
    rating: Number,
  },
});
</script>
