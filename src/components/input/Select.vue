<script setup lang="ts">
import { useField } from "vee-validate";
import "./input.css";
interface SelectProps {
  label: string;
  name: string;
  required?: boolean;
  desc: string;
  options: any[];
  errorMsg?: string;
}
const { name } = defineProps<SelectProps>();
const { value } = useField(name);
console.log(value, "value?");
</script>
<template>
  <fieldset>
    <label :for="name">
      {{ label }}<span v-if="required" class="input_required">*</span>
    </label>
    <select v-model="value" :name="name" :id="name">
      <option v-for="item in options" :value="item">
        {{ item[desc] ?? item }}
      </option>
    </select>
    <span class="error_span">{{ errorMsg && errorMsg }}</span>
  </fieldset>
</template>
