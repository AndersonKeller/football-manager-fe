<script setup lang="ts">
import { useField } from "vee-validate";
import useLangStore from "../../plugins/language";
import { ref } from "vue";
import "./input.css";
interface InputProps {
  label: string;
  errorMsg?: string;
  required?: boolean;
  name: string;
  disabled?: boolean;
  placeholder: string;
  readonly?: boolean;
}
const { name } = defineProps<InputProps>();
const lang = useLangStore();
const { value } = useField(name);
const icon = ref("hide");
const showPass = ref(false);
const handlePassIcon = () => {
  icon.value === "show" ? (icon.value = "hide") : (icon.value = "show");
  showPass.value = !showPass.value;
};
</script>
<template>
  <fieldset>
    <label :for="label">
      {{ label }}
      <span v-if="required" class="input_required">*</span>
    </label>
    <img
      class="icon_password"
      @click="handlePassIcon"
      :src="`/icons/${icon}.svg`"
      alt=""
    />
    <input
      :id="label"
      :type="showPass ? 'text' : 'password'"
      :readonly="readonly"
      :disabled="disabled"
      v-model="value"
      :placeholder="placeholder"
    />
  </fieldset>
  <span class="error_span">{{ errorMsg && lang.translate(errorMsg) }}</span>
</template>
<style scoped>
.input_pass_container {
  line-height: 20px;
  max-width: 100%;
  min-width: 0px;
  width: 100%;
  outline: none;
  border-radius: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 50px;
  height: 50px;
  min-height: 50px;
  border: 1px solid transparent;
  position: relative;
}
.icon_password {
  height: 24px;
  width: 24px;

  cursor: pointer;
  position: absolute;
  bottom: 12px;
  right: 12px;
  z-index: 1;
}
.p_left {
  padding-left: 42px;
}
.icon_input {
  width: 20px;
  height: 20px;
  /* filter: invert(0.6); */
  position: absolute;
  bottom: 24px;
  left: 12px;
}

@media (max-width: 800px) {
  .icon_input {
    /* color: var(--color-gray-400); */
    filter: invert(0.6);
  }
}
</style>
