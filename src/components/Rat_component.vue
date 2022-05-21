<script setup>
import { inject } from "@vue/runtime-core";
const props = defineProps({ numberOfRate: Number });
</script>

<template>
  <div class="flex flex-row gap-1">
    <div class="" v-for="(i, index) in 5" :key="index" title="Rating">
      <svg
        class="w-4 h-4 focus:outline-none fill-white stroke-yellow-700"
        :class="parseInt(numberOfRate, 10) > index ? 'fill-yellow-700' : ''"
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
</template>
