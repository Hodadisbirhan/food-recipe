<script setup>
import { computed, onMounted } from "@vue/runtime-core";
import { useField } from "vee-validate";

const props = defineProps({
  name: String,
  type: String,
  placeholder: String,

  unique: String,
});

const { value: name, errorMessage } = useField(props.name);
</script>
<template>
  <div class="flex flex-col flex-[3] w-full px-4">
    <label :for="name" class="capitalize text-lg text-slate-600 italic font-serif">{{
      props.name
    }}</label>
    <input
      v-model="name"
      :key="props.unique"
      type="number"
      :id="props.unique"
      :name="props.name"
      :placeholder="props.placeholder"
      autocomplete="off"
      class="h-12 border-green-600 bg-zinc-50 invalid:border-red-900 opacity-100 placeholder:italic w-full px-4 font-mono rounded-md shadow-md border-[1px] border-solid"
    />
  </div>
</template>
