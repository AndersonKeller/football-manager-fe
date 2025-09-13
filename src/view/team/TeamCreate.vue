<script setup lang="ts">
import { useForm } from "vee-validate";
import Form from "../../components/form/Form.vue";
import Layout from "../../layout/Layout.vue";
import useLangStore from "../../plugins/language";
import { toTypedSchema } from "@vee-validate/zod";
import { createTeamSchema, type iCreateTeam } from "../../schemas/team.schemas";
import Input from "../../components/input/Input.vue";
import { teamController } from "../../controllers/team.controller";
import type { iReturnAllNationality } from "../../schemas/nationality.schemas";
import { ref, watch } from "vue";
import Select from "../../components/input/Select.vue";
import { nationalityStore } from "../../stores/nationality.store";
import { utilController } from "../../controllers/util.controller";
import { useRouter } from "vue-router";
import { teamStore } from "../../stores/team.store";

const lang = useLangStore();
const nationalities = ref([] as iReturnAllNationality);
const router = useRouter();
const createTeam = async (teamData: iCreateTeam) => {
  console.log(teamData, "teamdata");
  const res = await teamController.createTeam(teamData);
  console.log(res, "res team");
  if (res) {
    utilController.snackbar.success(lang.translate("EQUIPE_SUCESSO"));
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }
};
const form = useForm({
  validationSchema: toTypedSchema(createTeamSchema),
});
const getNationalities = async () => {
  nationalities.value = await teamController.getAllNationality();

  nationalityStore().setNationalities(nationalities.value);
};

if (!nationalityStore().getNationalities.length) {
  getNationalities();
}
watch(
  () => form.values.nationality,
  () => {
    form.setFieldValue("nationality.id", form.values.nationality?.id);
  }
);
watch(
  () => teamStore().getTeam,
  () => {
    if (teamStore().getTeam) {
      router.push("/");
    }
  }
);
</script>
<template>
  <Layout>
    <Form
      class="form_create_team"
      :submit="form.handleSubmit(createTeam)"
      :title="lang.translate('CRIAR_EQUIPE')"
    >
      <div class="part">
        <Input
          type="text"
          name="name"
          :required="true"
          :label="lang.translate('NOME')"
          :placeholder="lang.translate('INSIRA_NOME')"
          :error-msg="form.errors.value.name ?? ''"
        />
        <Input
          type="text"
          name="short"
          :uppercase="true"
          :required="true"
          max-length="3"
          :label="lang.translate('SIGLA')"
          :placeholder="lang.translate('INSIRA_SIGLA')"
          :error-msg="form.errors.value.short ?? ''"
        />
      </div>
      <div class="part">
        <Input
          type="text"
          name="stadium.name"
          :required="true"
          :label="lang.translate('NOME_ESTADIO')"
          :placeholder="lang.translate('INSIRA_NOME_ESTADIO')"
          :error-msg="form.errors.value['stadium.name'] ?? ''"
        />
        <Select
          :options="nationalityStore().getNationalities"
          desc="name"
          name="nationality"
          label="País"
          :required="true"
          v-if="nationalityStore().getNationalities.length"
          :error-msg="form.errors.value.nationality ?? ''"
        />
      </div>

      <button
        type="submit"
        :disabled="!form.meta.value.valid || form.isSubmitting.value"
      >
        {{ lang.translate("CRIAR") }}
      </button>
    </Form>
  </Layout>
</template>
<style scoped>
.form_create_team {
  background-color: var(--color-gray-900);
  box-shadow: 0 2px 24px var(--color-gray-800);
  max-width: 800px;
  margin-top: 32px;
}
.form_create_team button {
  align-self: flex-end;
}

.part {
  display: flex;
  gap: 24px;

  width: 100%;
}
@media (max-width: 561px) {
  .part {
    flex-wrap: wrap;
  }
}
</style>
