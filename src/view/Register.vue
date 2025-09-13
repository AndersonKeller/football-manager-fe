<script setup lang="ts">
import { useForm } from "vee-validate";
import Form from "../components/form/Form.vue";
import useLangStore from "../plugins/language";
import { toTypedSchema } from "@vee-validate/zod";
import { createUserSchema, type iCreateUser } from "../schemas/user.schemas";
import Input from "../components/input/Input.vue";
import InputPass from "../components/input/InputPass.vue";
import { userController } from "../controllers/user.controller";
import { utilController } from "../controllers/util.controller";
import { useRouter } from "vue-router";
const router = useRouter();
const register = async (userData: iCreateUser) => {
  console.log(userData, "userData");
  const res = await userController.createUser(userData);
  if (res) {
    utilController.snackbar.success(lang.translate("CADASTRO_SUCESSO"));
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  }
};
const form = useForm({
  validationSchema: toTypedSchema(createUserSchema),
});
console.log(form.isSubmitting, "sub?");
const lang = useLangStore();
</script>
<template>
  <main>
    <Form
      class="login_form"
      :submit="form.handleSubmit(register)"
      :title="lang.translate('CADASTRO')"
    >
      <Input
        type="text"
        name="username"
        :required="true"
        :label="lang.translate('USERNAME')"
        :placeholder="lang.translate('INSIRA_USERNAME')"
        :error-msg="form.errors.value.username ?? ''"
      />
      <Input
        type="text"
        name="email"
        :required="true"
        :label="lang.translate('EMAIL')"
        :placeholder="lang.translate('INSIRA_EMAIL')"
        :error-msg="form.errors.value.email ?? ''"
      />

      <InputPass
        name="password"
        :required="true"
        :label="lang.translate('SENHA')"
        :placeholder="lang.translate('INSIRA_SENHA')"
        :error-msg="form.errors.value.password ?? ''"
      />
      <router-link to="/login">
        {{ lang.translate("POSSUI_CONTA") }}
      </router-link>
      <button
        :disabled="!form.meta.value.valid || form.isSubmitting.value"
        type="submit"
      >
        {{ lang.translate("CADASTRAR") }}
      </button>
    </Form>
  </main>
</template>
<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 95%;
  margin: 0 auto;
}
.login_form {
  box-shadow: 0 2px 24px var(--color-primary);
  max-width: 422px;
}
button {
  margin-top: 16px;
  width: 100%;
}
</style>
