<script setup lang="ts">
import type { PropType } from "vue";
import type { iReturnAbility } from "../../../schemas/ability.schemas";

interface AbilitiesProps {
  ability: iReturnAbility;
  value: number;
}
const { abilities } = defineProps({
  abilities: {
    type: Object as PropType<AbilitiesProps[]>,
  },
});
console.log(abilities, "abilities prop?");
</script>
<template>
  <ul class="abilities_list">
    <li class="list" v-for="playerAbility in abilities">
      <div class="explain">
        <strong>MIN:{{ playerAbility.ability.min }}</strong>
        <p>
          {{ playerAbility.ability.name }}
          <strong>{{ playerAbility.value }}</strong>
        </p>
        <strong>MAX:{{ playerAbility.ability.max }}</strong>
      </div>
      <div class="bar_stats">
        <span class="hidden"></span>
        <span
          class="value"
          :style="{
            width: `${
              (playerAbility.value * 100) / playerAbility.ability.max
            }%`,
          }"
        ></span>
        <span
          class="invalid"
          :style="{
            width: `${
              100 - (playerAbility.value * 100) / playerAbility.ability.max
            }%`,
          }"
        ></span>
      </div>
    </li>
  </ul>
</template>
<style scoped>
ul li strong,
ul li p {
  font-size: 0.875rem;
}
.abilities_list {
  padding: 8px 24px;
  margin-top: -8px;
}
.explain {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.explain p {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.abilities_list .list {
  padding-bottom: 6px;
  border-bottom: 1px solid var(--color-gray-500);
  display: flex;
  flex-direction: column;
}
.bar_stats {
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
  height: 12px;
  background-color: var(--color-gray-300);
}
.bar_stats .total {
  width: 100%;
}
.bar_stats .hidden {
  background: linear-gradient(
    90deg,
    rgba(32, 122, 44, 1) 0%,
    rgba(186, 111, 76, 1) 35%,
    rgba(227, 49, 14, 1) 66%,
    rgba(184, 89, 0, 1) 100%
  );
  width: 100%;
  height: 8px;
}
.bar_stats .value {
  position: absolute;
  background: transparent;
  z-index: 3;
  left: 0;
  height: 8px;
}
.bar_stats .invalid {
  position: absolute;
  background: var(--color-gray-300);
  z-index: 3;
  right: 0;
  height: 8px;
}
</style>
