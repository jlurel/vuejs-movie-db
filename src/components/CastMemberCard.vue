<template>
  <div class="card">
    <div class="card-img">
      <router-link :to="'/person/' + castMember.id">
        <img
          v-if="castMember.profile_path"
          v-bind:src="profilePicture"
          v-bind:alt="name"
          class="profile"
          loading="lazy"
        />
        <img
          v-else
          src="@/assets/no-user-img.svg"
          v-bind:alt="name"
          class="profile"
          loading="lazy"
        />
      </router-link>
    </div>
    <div class="card-content">
      <router-link :to="'/person/' + castMember.id">
        <h2>{{ name }}</h2>
      </router-link>
      <p>{{ character }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-left: 10px;
  background-color: var(--secondary-bg-color);
  border-radius: 15px;
  box-shadow: 0 2px 8px var(--box-shadow-color);
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  height: 100%;
}

.profile {
  width: 138px;
  height: 175px;
}
</style>

<script lang="ts">
import { CastMember } from "@/types";
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  props: {
    member: Object as PropType<CastMember>,
  },
  setup(props) {
    const castMember = props.member as CastMember;
    const character = ref(castMember.character);
    const name = ref(castMember.name);
    const profilePicture = ref(
      `https://image.tmdb.org/t/p/w138_and_h175_face${castMember.profile_path}`
    );

    return {
      castMember,
      character,
      name,
      profilePicture,
    };
  },
});
</script>
