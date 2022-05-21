<script setup>
import { computed } from "@vue/runtime-core";

const props = defineProps({
  name: String,
  type: String,
  modelValue: String,
  placeholder: String,
  unique: String,
});

const emit = defineEmits(["update:modelValue"]);

const compute = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
<template>
  <div class="flex flex-col flex-[3] w-full px-4">
    <label :for="name" class="capitalize text-lg text-slate-600 italic font-serif">{{
      props.name
    }}</label>
    <input
      :key="props.unique"
      :type="props.type"
      :id="props.unique"
      :name="props.name"
      :placeholder="props.placeholder"
      v-model="compute"
      autocomplete="off"
      class="h-12 border-green-600 bg-zinc-50 invalid:border-red-900 opacity-100 placeholder:italic w-full px-4 font-mono rounded-md shadow-md border-[1px] border-solid"
    />
  </div>
</template>
