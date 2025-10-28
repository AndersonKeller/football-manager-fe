<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import useLangStore from "../../../plugins/language";
import { teamStore } from "../../../stores/team.store";
import { teamController } from "../../../controllers/team.controller";

import Abilities from "./Abilities.vue";

const team = teamStore().getTeam;
const lang = useLangStore();

const teamPlayers = ref(teamStore().getTeamPlayers);
const openAbilities = (playerTeam: any) => {
  console.log(playerTeam, "player");
  playerTeam.player.selected = !playerTeam.player.selected;
};
watch(
  () => teamStore().getTeamPlayers,
  () => (teamPlayers.value = teamStore().getTeamPlayers)
);
onMounted(async () => {
  if (!teamStore().getTeamPlayers.players) {
    const res = await teamController.getTeamPlayers(team!.id);
    console.log(res, "res?");
    teamStore().setTeamPlayers(res);
  }
  teamPlayers.value = teamStore().getTeamPlayers;
  teamPlayers.value.players.map((player) => (player.player.selected = false));
});
</script>
<template v-if="team">
  <div>
    <p>{{ lang.translate("FORMACAO") }}: {{ team?.formation.name }}</p>
  </div>
  <h2>{{ lang.translate("JOGADORES") }}</h2>
  <ul>
    <template v-for="teamPlayer in teamPlayers.players">
      <li
        :class="[teamPlayer.starter ? 'starter' : 'not_starter']"
        @click="openAbilities(teamPlayer)"
      >
        <p>
          <strong>{{ teamPlayer.player.position[0].position.short }}</strong> -
          {{ teamPlayer.player.name }}
        </p>
      </li>

      <Abilities
        v-if="teamPlayer.player.selected"
        :abilities="teamPlayer.player.abilities"
      />
    </template>
  </ul>
</template>
<style scoped>
ul {
  display: flex;
  gap: 8px;
  flex-direction: column;
}
ul li {
  padding: 4px 12px;
  border-radius: 4px;
}
.starter {
  background-color: green;
}
.not_starter {
  background-color: var(--color-gray-700);
}
</style>
