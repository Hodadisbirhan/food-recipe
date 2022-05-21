<script setup>
import { ref } from "@vue/reactivity";
const emits = defineEmits(["method"]);
const props = defineProps({
  rate_number: Number,
});
const temporary_rating = ref(props.rate_number);
let clicked = false;
const rated = ref(["w-6 h-6 ", "w-6 h-6 ", "w-6 h-6 ", "w-6 h-6 ", "w-6 h-6 "]);

const click_torate = (index) => {
  emits("method", index + 1);

  for (let i = 0; i <= index; i++) {
    rated.value[i] = "fill-yellow-700";
  }
  rated.value.fill("", index + 1, 5);
  temporary_rating.value = index + 1;
};

const selectedColor = ref();
</script>
<template>
  <div class="flex items-center flex-col gap-2">
    <span class="font-semibold text-yellow-700 text-3xl"> Rating </span>
    <div class="flex items-center flex-row gap-2">
      <div class="" v-for="(i, index) in rated" :key="index" title="Rating">
        <svg
          @click="click_torate(index)"
          class="w-6 h-6 focus:outline-none fill-white stroke-yellow-700"
          :class="temporary_rating > index ? 'fill-yellow-700' : ''"
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
  </div>
</template>
