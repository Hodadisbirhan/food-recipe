<script setup>
import { computed } from "@vue/runtime-core";
const props = defineProps({
  placeholder: String,
  label: String,
  modelValue: String,
  name1: String,
});
const emit = defineEmits(["update:modelValue"]);
const text_area_changed = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
<template>
  <div class="w-full">
    <label :for="name1">{{ label }}</label>
    <textarea
      class="w-full border-green-600 focus:shadow-2xl px-3 placeholder:italic h-32 border-2 rounded-xl"
      :name="name1"
      :id="name1"
      :placeholder="placeholder"
      v-model="text_area_changed"
    ></textarea>
  </div>
</template>
