<script setup>
const props = defineProps({
  name: String,
  amount: String,
});
</script>
<template>
  <li class="flex gap-1 rounded-md py-3 px-2  bg-white">
    <p class="text-base break-all ">{{ props.name }}</p>
  </li>
</template>
