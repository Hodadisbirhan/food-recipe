<script setup>
import { ref } from "@vue/reactivity";

const props = defineProps({
  rate: Number,
  comment: String,
  reviewer: String,
});
</script>
<template>
  <article class="flex flex-col gap-2">
    <div class="flex gap-3 items-center flex-row">
      <span class="w-7 text-center rounded-full border-[1px] border-green-500 h-7">{{
        reviewer.toUpperCase().charAt(0)
      }}</span>

      <span class="text-xl text-black">{{ reviewer }}</span>
    </div>

    <div class="flex flex-row gap-2">
      <div class="" v-for="(i, index) in 5" :key="index" title="Rating">
        <svg
          class="w-6 h-6 focus:outline-none fill-white stroke-yellow-700"
          :class="rate > index ? 'fill-yellow-700' : ''"
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

    <p class="break-all text-zinc-800">
      {{ comment }}
    </p>
  </article>
</template>
