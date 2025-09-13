<script setup lang="ts">
import { useForm } from "vee-validate";
import Form from "../components/form/Form.vue";
import useLangStore from "../plugins/language";
import { toTypedSchema } from "@vee-validate/zod";
import { createLoginSchema, type iCreateLogin } from "../schemas/user.schemas";
import Input from "../components/input/Input.vue";
import InputPass from "../components/input/InputPass.vue";
import { userController } from "../controllers/user.controller";
import { useRouter } from "vue-router";
import { utilController } from "../controllers/util.controller";
import { storageController } from "../controllers/storage.controller";
const router = useRouter();
const login = async (loginData: iCreateLogin) => {
  console.log(loginData, "logindata");
  const res = await userController.login(loginData);
  if (res) {
    utilController.snackbar.success(lang.translate("LOGIN_SUCESSO"));
    storageController.setLocal("session", JSON.stringify(res.user));
    storageController.setLocal("token", res.token);
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }
};
const form = useForm({
  validationSchema: toTypedSchema(createLoginSchema),
});

const lang = useLangStore();
</script>
<template>
  <main>
    <Form
      class="login_form"
      :submit="form.handleSubmit(login)"
      :title="lang.translate('LOGIN')"
    >
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
      <router-link to="/register">
        {{ lang.translate("SEM_CONTA") }}
      </router-link>
      <button
        :disabled="!form.meta.value.valid || form.isSubmitting.value"
        type="submit"
      >
        Login
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
