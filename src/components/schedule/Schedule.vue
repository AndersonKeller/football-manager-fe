<script setup lang="ts">
import { watch, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { utilController } from "../../controllers/util.controller";
import useLangStore from "../../plugins/language";
import type {
  iCreateRound,
  iReturnAllRounds,
} from "../../schemas/game.schemas";
import { teamStore } from "../../stores/team.store";
import { leagueController } from "../../controllers/league.controller";
import Iconify from "../Iconify.vue";
import Tabs from "../Tabs.vue";

const lang = useLangStore();

const { params } = useRoute();

const team = ref(teamStore().getTeam);
const teamsSchedule = ref([] as iCreateRound[]);
const schedule = ref([] as iReturnAllRounds);
const roundActive = ref(1);
const totalRounds = ref(0);
interface iMenu {
  name: string;
  active: boolean;
  value: "team" | "league";
}
const menus: iMenu[] = [
  { name: lang.translate("MEUS_JOGOS"), active: true, value: "team" },
  { name: lang.translate("TODOS_JOGOS"), active: false, value: "league" },
];
const menu = ref({} as iMenu);
watch(
  () => teamStore().getTeam,
  async () => {
    team.value = teamStore().getTeam;
    teamsSchedule.value = await leagueController.getLeagueTeamSchedule(
      Number(params.league),
      team.value?.id!
    );
  }
);
onMounted(async () => {
  schedule.value = await leagueController.getLeagueSchedule(
    Number(params.league)
  );
  console.log(schedule.value, "schedule", menu.value);
  totalRounds.value = schedule.value[schedule.value.length - 1].round;
});
const prev = () => {
  roundActive.value--;
};
const next = () => {
  roundActive.value++;
};
const change = (val: iMenu) => {
  menu.value = val;
  console.log("change", val, menu.value, teamsSchedule.value);
};
</script>
<template>
  <!-- <ul>
    <button
      :class="[item.active ? 'active' : '']"
      @click="active(item)"
      v-for="item in menus"
    >
      {{ item.name }}
    </button>
  </ul> -->
  <Tabs :menus="menus" @menuActive="change" />
  <ul v-if="menu.value === 'team'">
    <li v-for="item in teamsSchedule">
      <h3>{{ utilController.fomatDate(item.date!) }}</h3>
      <p class="shorts">
        {{ item.game.home.short }} <strong>X</strong>
        {{ item.game.away.short }}
      </p>
      <div class="names">
        <span>{{ item.game.home.name }}</span>
        <span>{{ item.game.away.name }}</span>
      </div>
      <p class="local">{{ item.game.home.stadium.name }}</p>
    </li>
  </ul>
  <template v-if="menu.value === 'league'">
    <template v-for="item in schedule">
      <section class="rounds" v-if="item.round === roundActive">
        <div class="header">
          <button @click="prev" :disabled="roundActive === 1">
            <Iconify icon="teenyicons:left-solid" />
          </button>
          <div>
            <h3>{{ lang.translate("RODADA") }} {{ item.round }}</h3>
            <h3>{{ utilController.fomatDate(item.date) }}</h3>
          </div>
          <button @click="next" :disabled="roundActive === totalRounds">
            <Iconify icon="teenyicons:right-solid" />
          </button>
        </div>
        <ul>
          <li v-for="game in item.games">
            <p>
              {{ game.home.short }} <strong>X</strong> {{ game.away.short }}
            </p>
          </li>
        </ul>
      </section>
    </template>
  </template>
</template>
<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  align-items: stretch;
  justify-content: center;
}
.rounds {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  padding-top: 12px;
}
.rounds .header {
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: space-between;
}
.rounds .header button {
  background-color: transparent;
  padding: 0;
}
.rounds .header button:hover {
  transform: scale(1.25);
  border: none;
}
.rounds .header button:disabled {
  filter: brightness(0.5);
}
.rounds .header svg {
  cursor: pointer;
}
.rounds ul {
  flex-direction: column;
  gap: 16px;
}
ul button {
  padding: 12px 24px;
  background-color: var(--color-gray-700);
  border-radius: 0;
  border-radius: 12px 12px 0 0;
}
.active {
  background-color: var(--color-gray-900);
  border: 2px inset;
  border-bottom-width: 0;
  border-radius: 12px 12px 0 0;
}

.local {
  margin-top: 12px;
}
.shorts {
  display: flex;
  gap: 8px;
}
.names {
  display: flex;
  gap: 12px;
  width: 100%;
}
.names span {
  font-size: 0.75rem;
  text-align: center;
  width: 50%;
}
ul li {
  padding: 24px 12px;
  box-shadow: 0 0 6px #777575;
  border-radius: 12px;
  min-width: 232px;
  max-width: 232px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
