<script setup lang="ts">
import { teamStore } from "../../stores/team.store";
import useLangStore from "../../plugins/language";
import { utilController } from "../../controllers/util.controller";
const lang = useLangStore();
const stadium = teamStore().getStadium;
</script>
<template>
  <section v-if="stadium">
    <h2>{{ lang.translate("ESTADIO") }}</h2>
    <div>
      <h3>{{ lang.translate("NOME") }}:</h3>
      <p>{{ stadium.name }}</p>
    </div>
    <div>
      <h3>{{ lang.translate("CAPACIDADE") }}:</h3>
      <p>{{ utilController.formatNumber(stadium.capacity) }}</p>
    </div>
    <div>
      <h3>{{ lang.translate("INGRESSOS") }}:</h3>
      <p>{{ utilController.asMoney(stadium.ticket) }}</p>
    </div>
  </section>
</template>
<style scoped></style>
