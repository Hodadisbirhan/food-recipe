<script setup>
import { provide, ref, watchEffect } from "@vue/runtime-core";
import Rat_component from "../components/Rat_component.vue";
const props = defineProps({
  averageNumberOFRate: Number,
  numberofpeople: Number,
});

watchEffect(() => {});
</script>

<template>
  <div class="flex flex-col drop-shadow-xl gap-1">
    <span class="text-2xl font-bold text-yellow-700">Rated</span>
    <div class="flex flex-row gap-1">
      <div class="" v-for="(i, index) in 5" :key="index" title="Rating">
        <svg
          class="w-6 h-6 focus:outline-none fill-white stroke-yellow-700"
          :class="parseInt(averageNumberOFRate, 10) > index ? 'fill-yellow-700' : ''"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="StarIcon"
          tabindex="-1"
          title="Star"
        >
          <path
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          ></path>
        </svg>
      </div>
    </div>
    <span class="text-base font-mono">TOTAL:{{ numberofpeople }}</span>
  </div>
</template>
