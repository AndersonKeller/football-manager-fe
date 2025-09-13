<script setup lang="ts">
interface FormProps {
  submit: () => void;
  title?: string;
  title_color?: string;
  subtitle?: string;
  isPart?: boolean;
}
defineProps<FormProps>();
</script>
<template>
  <form @submit.prevent="submit">
    <div class="form_title" v-if="title">
      <h2 v-if="title" :class="title_color ?? ''">{{ title }}</h2>
      <p class="sub_text" v-if="subtitle">{{ subtitle }}</p>
    </div>
    <div class="form_inputs" :class="isPart ? 'row' : ''">
      <slot></slot>
    </div>
  </form>
</template>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 24px;
  width: 100%;
  gap: 32px;
  backdrop-filter: blur(14px);
  margin: 0 auto;
}
form div {
  width: 100%;
}
form .sub_text {
  padding-top: 20px;
  line-height: 24px;
  text-align: center;
  text-wrap: balance;
}
.form_part {
  max-width: 100%;
}
.form_title {
  text-align: left;
}
.form_inputs {
  gap: 8px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
}

.row {
  flex-direction: row;
  justify-content: space-between;
}
form h2 {
  font-size: 1.75rem;
  text-align: left;
  font-weight: 600;
}
.black {
  color: var(--color-black);
  text-align: left;
}
@media (max-width: 800px) {
  form h2 {
    text-align: left;
    color: var(--color-black);
    font-size: 1.5rem;
    font-weight: bold;
  }
}
</style>
