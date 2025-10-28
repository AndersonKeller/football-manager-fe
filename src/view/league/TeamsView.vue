<script setup lang="ts">
import { useRoute } from "vue-router";
import Layout from "../../layout/Layout.vue";
import { onMounted, ref } from "vue";
import { leagueController } from "../../controllers/league.controller";
import type { iReturnLeagueTeams } from "../../schemas/league.schemas";
const { params } = useRoute();
const leagueTeams = ref({} as iReturnLeagueTeams);
onMounted(async () => {
  leagueTeams.value = await leagueController.getLeagueTeams(
    Number(params.league)
  );
});
</script>
<template>
  <Layout>
    <main>
      <p>Times</p>
      <ul>
        <li v-for="team in leagueTeams.teams">
          <p>{{ team.name }}</p>
        </li>
      </ul>
    </main>
  </Layout>
</template>
<style scoped></style>
