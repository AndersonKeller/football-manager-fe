<script setup lang="ts">
import { onMounted, ref } from "vue";
import useLangStore from "../../plugins/language";
import { teamStore } from "../../stores/team.store";
import TeamInfo from "./TeamInfo.vue";
import StadiumInfo from "./StadiumInfo.vue";
import PlayersInfo from "./players/PlayersInfo.vue";

const lang = useLangStore();
interface iMenu {
  name: string;
  active: boolean;
  value: "team" | "stadium" | "player" | "financial";
}
const menu = ref({} as iMenu);
const menus = ref([
  {
    name: lang.translate("EQUIPE"),
    active: true,
    value: "team",
  },
  {
    name: lang.translate("ESTADIO"),
    active: false,
    value: "stadium",
  },
  {
    name: lang.translate("JOGADORES"),
    active: false,
    value: "player",
  },
  {
    name: lang.translate("FINANCEIRO"),
    active: false,
    value: "financial",
  },
] as iMenu[]);
const active = (item: iMenu) => {
  menus.value.forEach((menuitem) => {
    menuitem.active = false;
  });
  menu.value = item;
  item.active = true;
};
onMounted(() => {
  menu.value = menus.value.find((item) => item.active) || menus.value[0];
});
</script>
<template>
  <section>
    <ul>
      <button
        :class="[item.active ? 'active' : '']"
        @click="active(item)"
        v-for="item in menus"
      >
        {{ item.name }}
      </button>
    </ul>
    <div class="card">
      <TeamInfo v-if="menu.value === 'team'" />
      <StadiumInfo v-if="menu.value === 'stadium'" />
      <PlayersInfo v-if="menu.value === 'player'" />
    </div>
  </section>
</template>
<style scoped>
ul {
  display: flex;
  /* background: var(--color-gray-300); */
  border-radius: 12px 12px 0 0;
  overflow: hidden;
}
ul button {
  padding: 12px 24px;
  background-color: var(--color-gray-700);
  border-radius: 0;
  border-radius: 12px 12px 0 0;
}
.card {
  padding: 24px;
  background-color: var(--color-gray-950);
  border-radius: 0 12px 12px 12px;
  box-shadow: 0 0 24px var(--card);
}
.active {
  background-color: var(--color-gray-900);
  border: 2px inset;
  border-bottom-width: 0;
  border-radius: 12px 12px 0 0;
}
</style>
