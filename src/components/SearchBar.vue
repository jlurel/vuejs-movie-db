<template>
  <div class="filter-panel paper">
    <div class="filter-name" @click="expandSortPanel = !expandSortPanel">
      <h2>Sort</h2>
      <i v-if="expandSortPanel" class="fa-solid fa-chevron-down"></i>
      <i v-else class="fa-solid fa-chevron-right"></i>
    </div>
    <div v-if="expandSortPanel" class="filter-box">
      <h3>Sort Results By</h3>
      <div class="filter">
        <select name="sort" id="sort" @change="sort($event.target.value)">
          <option
            v-for="sortFilter in sortFilters"
            v-bind:key="sortFilter.id"
            :value="sortFilter.value"
          >
            {{ sortFilter.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
  <div class="search-button" @click="search()">Search</div>
</template>

<style lang="scss" scoped>
.filter-panel {
  h2,
  h3 {
    margin: 0;
    text-align: left;
  }

  h2 {
    font-size: 1.1rem;
    font-weight: 800;
  }

  h3 {
    font-size: 1rem;
    font-weight: 300;
  }
}

.paper {
  background-color: var(--secondary-bg-color);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  padding: 1rem 0.5rem 0;
  box-shadow: 1px 2px 2px var(--box-shadow-color);
}

.filter-name {
  display: inline-flex;
  width: 100%;
  justify-content: space-between;

  h2 {
    margin-bottom: 10px;
  }
}

.filter-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 0 1rem;
  border-top: 1px solid #445458;

  h3 {
    margin: 15px 0;
  }
}

.filter {
  position: relative;
}

.filter select {
  background-color: #0563af;
  color: white;
  padding: 12px;
  width: 250px;
  border: none;
  font-size: 0.9rem;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
}

.filter select::-ms-expand {
  display: none;
}

.filter::before {
  content: "\f13a";
  font-family: FontAwesome;
  position: absolute;
  top: 0;
  right: 0;
  width: 20%;
  height: 100%;
  text-align: center;
  font-size: 20px;
  line-height: 45px;
  color: rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

.search-button {
  color: #fff;
  background-color: #445458;
  padding: 0.5rem 0;
  margin: 15px 0;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      expandSortPanel: false,
      expandFilterPanel: false,
    };
  },
  props: ["sortFilters"],
  emits: ["search", "sort"],
  methods: {
    search() {
      this.$emit("search");
    },
    sort(filter: string) {
      this.$emit("sort", filter);
    },
  },
});
</script>
