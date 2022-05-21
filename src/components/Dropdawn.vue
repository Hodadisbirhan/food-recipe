<template>
  <div>
    <label for="catagory" class="capitalize text-lg text-slate-600 italic font-serif"
      >Time</label
    >
    <select
      id="catagory"
      v-model="state_select"
      class="md:w-full w-full text-ellipsis font-mono text-slate-600 border-2 outline-none text-xl h-14 rounded-xl"
    >
      <option value="min">minute</option>
      <option value="hr">hour</option>
      <option value="sec">second</option>
    </select>
  </div>
</template>
<script setup>
import { computed } from "@vue/runtime-core";
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: String,
});
const state_select = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
