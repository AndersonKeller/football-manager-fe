<script setup lang="ts">
import useLangStore from "../../../plugins/language";
import { teamStore } from "../../../stores/team.store";

const team = teamStore().getTeam;
const lang = useLangStore();
</script>
<template v-if="team">
  <div>
    <p>{{ lang.translate("FORMACAO") }}: {{ team?.formation.name }}</p>
  </div>
  <h2>{{ lang.translate("JOGADORES") }}</h2>
</template>
<style scoped></style>
