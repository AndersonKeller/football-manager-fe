<script setup lang="ts">
import { ref, watch } from "vue";
import { utilController } from "../../controllers/util.controller";
import useLangStore from "../../plugins/language";
import { teamStore } from "../../stores/team.store";
import Field from "../canvas/Field.vue";
const lang = useLangStore();
const team = ref(teamStore().getTeam);
watch(
  () => teamStore().getTeam,
  () => (team.value = teamStore().getTeam)
);
</script>
<template>
  <section v-if="team">
    <h2>{{ lang.translate("EQUIPE") }}</h2>
    <div>
      <h3>{{ lang.translate("NOME") }}:</h3>
      <p>{{ team.name }} - {{ team.short }}</p>
    </div>
    <div>
      <h3>{{ lang.translate("FUNDADO_EM") }}:</h3>
      <p>{{ utilController.fomatDate(team.createdAt!) }}</p>
    </div>
    <div>
      <h3>{{ lang.translate("PAIS") }}:</h3>
      <p>{{ team.nationality.name }}</p>
    </div>
    <div>
      <h3>{{ lang.translate("LIGA") }}:</h3>
      <p>
        {{
          lang.translate(team.league.name.split(" ")[0].toUpperCase()) +
          " " +
          team.league.name.split(" ")[1]
        }}
        <router-link :to="`${team.league.id}/schedule`">{{
          lang.translate("VER_TABELA")
        }}</router-link>
      </p>
    </div>
    <Field />
  </section>
</template>
<style scoped></style>
