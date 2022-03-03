<template>
  <div class="credits-list">
    <div v-if="credits && credits.length !== 0" class="acting-credits">
      <h3 class="credits-list-title">{{ title }}</h3>
      <table class="credit-table">
        <tbody>
          <tr
            v-for="(item, index) in credits"
            :key="index"
            class="credit-table-row"
          >
            <td
              v-if="item.release_date === '' || item.first_air_date === ''"
              class="credit-year"
            >
              -
            </td>
            <td v-else class="credit-year">
              {{ item.release_year }}
            </td>
            <td>
              <ul class="credit-list">
                <li v-for="(credit, index) in item.credits" :key="index">
                  <router-link
                    v-if="credit.media_type === 'tv'"
                    :to="'/tv-show/' + credit.id"
                  >
                    <span class="credit-title">{{
                      credit.name || credit.title
                    }}</span>
                  </router-link>
                  <router-link v-else :to="'/movie/' + credit.id">
                    <span class="credit-title">{{
                      credit.name || credit.title
                    }}</span>
                  </router-link>
                  <span class="credit-character" v-if="credit.character">
                    as {{ credit.character }}</span
                  >
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.credits-list-title {
  text-align: left;
}

.credit-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--border-color);
  box-shadow: 0 12px 18px rgba(0, 0, 0, 0.1);
  td {
    text-align: left;
  }
}

.credit-table-row {
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-start;
}

.credit-year {
  display: flex;
  margin: 1rem 0 0;
  padding: 0 2rem;
  width: 3rem;
}

.credit-titles {
  width: 80%;
}

.credit-title {
  font-weight: bold;
}

.credit-list {
  margin: 1rem 0;
  list-style-type: circle;
  li {
    padding: 0 0 0.5rem;
  }
}

a {
  color: var(--font-color);
  text-decoration: none;
}
</style>

<script lang="ts">
import { CreditsGroupedByDate } from "@/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    credits: Array as PropType<CreditsGroupedByDate[]>,
    title: String,
  },
});
</script>
