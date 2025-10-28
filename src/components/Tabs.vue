<script setup lang="ts">
import { onMounted, ref, type PropType } from "vue";
import { any } from "zod/v4";

enum valuesEnum {
  team = "team",
  league = "league",
}
interface iMenu {
  name: string;
  active: boolean;
  value: "team" | "league";
}
const props = defineProps({
  menus: { required: true, type: Object as PropType<iMenu[]> },
});
const emit = defineEmits(["menuActive"]);
const menu = ref({} as iMenu);
const active = (item: iMenu) => {
  props.menus.forEach((menuitem) => {
    menuitem.active = false;
  });
  menu.value = item;
  item.active = true;
  emit("menuActive", menu.value);
};
onMounted(() => {
  menu.value = props.menus.find((item) => item.active) || props.menus[0];
  console.log(menu.value, "menu value?:");
  emit("menuActive", menu.value);
});
</script>
<template>
  <ul>
    <button
      :class="[item.active ? 'active' : '']"
      @click="active(item)"
      v-for="item in menus"
    >
      {{ item.name }}
    </button>
  </ul>
</template>
<style scoped></style>
