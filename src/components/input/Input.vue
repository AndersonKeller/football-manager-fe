<script setup lang="ts">
import { useField } from "vee-validate";
import useLangStore from "../../plugins/language";
import "./input.css";
interface InputProps {
  label: string;
  type: "text" | "number" | "textarea";
  errorMsg?: string;
  required?: boolean;
  name: string;
  disabled?: boolean;
  placeholder: string;
  readonly?: boolean;
  maxLength?: string;
  uppercase?: boolean;
}
const { name } = defineProps<InputProps>();
const lang = useLangStore();
const { value } = useField(name);
</script>
<template>
  <fieldset>
    <label :for="label">
      {{ label }}
      <span v-if="required" class="input_required">*</span>
    </label>
    <!-- <textarea
    :placeholder="placeholder"
    v-model="value"
    :name="label"
    :id="label"
    v-if="type === 'textarea'"
  ></textarea> -->
    <input
      v-if="type === 'number'"
      :id="label"
      :type="type"
      :readonly="readonly"
      :disabled="disabled"
      v-model.number="value"
      :placeholder="placeholder"
    />
    <input
      v-else
      :id="label"
      :type="type"
      :readonly="readonly"
      :disabled="disabled"
      :maxlength="maxLength"
      v-model="value"
      :style="uppercase ? { textTransform: 'uppercase' } : ''"
      :placeholder="placeholder"
    />
    <span class="error_span">{{ errorMsg && lang.translate(errorMsg) }}</span>
  </fieldset>
</template>
<style scoped></style>
