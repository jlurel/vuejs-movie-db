<template>
  <header>
    <div class="header-content">
      <nav class="navigation">
        <router-link to="/" class="site-logo"> Movies DB </router-link>
        <ul class="menu-navigation">
          <li
            class="dropdown-menu"
            @mouseover="movieMenu = true"
            @mouseleave="movieMenu = false"
          >
            <router-link
              :to="{
                path: '/movies',
                name: 'popular-movies',
                params: { section: 'popular' },
              }"
              >Movies</router-link
            >
            <ul v-if="movieMenu" class="dropdown-menu-list">
              <li class="dropdown-menu-item">
                <router-link
                  :to="{
                    path: '/movies',
                    name: 'popular-movies',
                    params: { section: 'popular' },
                  }"
                  class="dropdown-menu-link"
                  >Popular</router-link
                >
              </li>
              <li class="dropdown-menu-item">
                <router-link
                  :to="{
                    path: '/movies/now-playing',
                  }"
                  class="dropdown-menu-link"
                  >Now Playing</router-link
                >
              </li>
              <li class="dropdown-menu-item">
                <router-link
                  :to="{
                    path: '/movies/upcoming',
                  }"
                  class="dropdown-menu-link"
                >
                  Upcoming
                </router-link>
              </li>
              <li class="dropdown-menu-item">
                <router-link
                  :to="{
                    path: '/movies/top_rated',
                  }"
                  class="dropdown-menu-link"
                >
                  Top Rated
                </router-link>
              </li>
            </ul>
          </li>
          <li
            class="dropdown-menu"
            @mouseover="tvMenu = true"
            @mouseleave="tvMenu = false"
          >
            <router-link
              :to="{
                path: '/tv-shows',
                name: 'popular-shows',
                params: { section: 'popular' },
              }"
            >
              <span> TV Shows </span>
            </router-link>
            <ul v-if="tvMenu" class="dropdown-menu-list">
              <li class="dropdown-menu-item">
                <router-link
                  :to="{
                    path: '/tv-shows',
                    name: 'popular-shows',
                    params: { section: 'popular' },
                  }"
                  class="dropdown-menu-link"
                  >Popular</router-link
                >
              </li>
              <li class="dropdown-menu-item">
                <router-link
                  :to="{
                    path: '/tv-shows/airing-today',
                  }"
                  class="dropdown-menu-link"
                  >Airing Today</router-link
                >
              </li>
              <li class="dropdown-menu-item">
                <router-link
                  :to="{
                    path: '/tv-shows/on-the-air',
                  }"
                  class="dropdown-menu-link"
                  >On TV</router-link
                >
              </li>
              <li class="dropdown-menu-item">
                <router-link
                  :to="{
                    path: '/tv-shows/top-rated',
                  }"
                  class="dropdown-menu-link"
                  >Top Rating</router-link
                >
              </li>
            </ul>
          </li>
          <li class="dropdown-menu">
            <router-link to="/people">People</router-link>
          </li>
        </ul>
      </nav>
      <span v-if="darkTheme" class="theme-switcher" @click="toggleTheme()">
        <i class="fas fa-sun" />
      </span>
      <span v-if="!darkTheme" class="theme-switcher" @click="toggleTheme()">
        <i class="fas fa-moon"></i>
      </span>
    </div>
  </header>
  <router-view />
</template>

<style lang="scss">
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";

html {
  --numberOfColumns: 2;
}

@media screen and (min-width: 768px) {
  html {
    --numberOfColumns: 3;
  }
}

@media screen and (min-width: 1000px) {
  html {
    --numberOfColumns: 5;
  }
}

.theme-light {
  --primary-bg-color: #fff;
  --secondary-bg-color: #eceaea;
  --primary-color: #42b983;
  --font-color: #000000;
  --border-color: #7e7e7e96;
  --box-shadow-color: #808080;
  --theme-switcher-color: #393a81;
  --primary-gradient-color: #885a15;
  --secondary-gradient-color: #8d0028;
  --from-left-gradient-color: #ffffff00;
  --to-right-gradient-color: #fff;
}

.theme-dark {
  --primary-bg-color: #2c3e50;
  --secondary-bg-color: #202e3b;
  --primary-color: #42b983;
  --font-color: white;
  --border-color: #202e3b;
  --box-shadow-color: #333333;
  --theme-switcher-color: #f3f70e;
  --primary-gradient-color: #f3ec78;
  --secondary-gradient-color: #af4261;
  --from-left-gradient-color: #2c3e5000;
  --to-right-gradient-color: #2c3e50;
}

body {
  color: var(--font-color);
  background-color: var(--primary-bg-color);
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--font-color);
  background-color: var(--primary-bg-color);
}

h1 {
  font-size: 2em;
  font-weight: bold;
}

h2 {
  font-size: 1em;
  font-weight: 700;
}

header {
  display: flex;
  justify-content: center;
  background-color: var(--secondary-bg-color);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 2rem;
  width: 80%;

  a {
    text-decoration: none;
  }
}

.navigation {
  display: flex;
  align-items: center;
}

.site-logo {
  font-size: 2rem;
  background-color: red;
  background-image: linear-gradient(
    45deg,
    var(--primary-gradient-color) 0%,
    var(--secondary-gradient-color) 100%
  );
  background-size: 100%;
  background-repeat: repeat;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  &:visited {
    background-color: red;
    background-image: linear-gradient(
      45deg,
      var(--primary-gradient-color) 0%,
      var(--secondary-gradient-color) 100%
    );
    background-size: 100%;
    background-repeat: repeat;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
  }
}

.menu-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  margin: 0;
}

.dropdown-menu {
  position: relative;
  padding: 1rem 0.5rem;

  a {
    margin: 0 2em;
    font-weight: bold;
    color: var(--font-color);

    &:visited {
      color: var(--font-color);
    }

    &.router-link-exact-active {
      color: var(--primary-color);
    }
  }
}

.dropdown-menu-list {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40px;
  left: 0px;
  padding: 0;
  z-index: 2;
  overflow: auto;
  width: 180px;
  background-color: var(--primary-bg-color);
  list-style: none;
  border: 1px var(--font-color) solid;
  border-radius: 10px;
}

.dropdown-menu-item {
  display: block;
  padding: 3px;

  &:hover {
    background-color: var(--secondary-bg-color);
  }
}

.dropdown-menu-link {
  display: inline-flex;
}

.theme-switcher {
  cursor: pointer;
  color: var(--theme-switcher-color);
}
</style>

<script lang="ts">
import { ref } from "vue";

export default {
  data() {
    return {
      movieMenu: false,
      tvMenu: false,
      peopleMenu: false,
    };
  },
  setup() {
    const darkTheme = ref(true);
    // function to set a given theme/color-scheme
    function setTheme(themeName: string) {
      localStorage.setItem("theme", themeName);
      document.documentElement.className = themeName;
    }

    // function to toggle between light and dark theme
    function toggleTheme() {
      if (localStorage.getItem("theme") === "theme-dark") {
        setTheme("theme-light");
        darkTheme.value = false;
      } else {
        setTheme("theme-dark");
        darkTheme.value = true;
      }
    }

    // Immediately invoked function to set the theme on initial load
    (function () {
      if (localStorage.getItem("theme") === "theme-dark") {
        setTheme("theme-dark");
        darkTheme.value = true;
      } else {
        setTheme("theme-light");
        darkTheme.value = false;
      }
    })();

    return { darkTheme, toggleTheme };
  },
};
</script>
