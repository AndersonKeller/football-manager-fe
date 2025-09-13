<script setup lang="ts">
import { useRouter } from "vue-router";
import { storageController } from "../../controllers/storage.controller";
import { userController } from "../../controllers/user.controller";
import useLangStore from "../../plugins/language";
import { teamStore } from "../../stores/team.store";

const session = storageController.getLocal("session");

const router = useRouter();
const getTeam = async () => {
  if (session) {
    const team = await userController.getUserTeam();
    console.log(team);
    teamStore().setTeam(team);
    teamStore().setStadium(team.stadium);
    if (!team) {
      router.push("/team-create");
    }
  } else {
    router.push("/login");
  }
};
getTeam();
const lang = useLangStore();
</script>
<template>
  <header>
    <nav>
      <p>{{ session.username }}</p>
      <router-link v-if="!session" to="/login">{{
        lang.translate("LOGIN")
      }}</router-link>
      <router-link v-else to="/account">{{
        lang.translate("MINHA_CONTA")
      }}</router-link>
    </nav>
  </header>
</template>
<style scoped>
header {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* border-bottom: 1px solid var(--color-primary); */
  background-color: var(--color-primary-50);
}
nav {
  display: flex;
  gap: 12px;
}
</style>
