<script setup>
const props = defineProps({
  name: String,
  amount: String,
});
</script>
<template>
  <li class="flex gap-1 rounded-md py-3 px-2 drop-shadow bg-white">
    <p class="text-xl break-all text-slate-800">{{ props.name }}</p>
  </li>
</template>
