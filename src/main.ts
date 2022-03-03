import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VuePaginationTw from "vue-pagination-tw";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { VeProgress } from "vue-ellipse-progress";
import CardItem from "@/components/CardItem.vue";
import CardList from "@/components/CardList.vue";
import CastMemberCard from "@/components/CastMemberCard.vue";
import CreditsTable from "@/components/CreditsTable.vue";
import RatingCircle from "@/components/RatingCircle.vue";
import SearchBar from "@/components/SearchBar.vue";

const app = createApp(App);
app.use(router);
app.component("CardItem", CardItem);
app.component("CardList", CardList);
app.component("CastMemberCard", CastMemberCard);
app.component("CreditsTable", CreditsTable);
app.component("RatingCircle", RatingCircle);
app.component("SearchBar", SearchBar);
app.component("VuePaginationTw", VuePaginationTw);
app.component("VeProgress", VeProgress);
app.mount("#app");
