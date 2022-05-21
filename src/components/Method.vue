<script setup>
const props = defineProps({
  description: String,
  list: String,
});
</script>

<template>
  <li
    class="flex items-center bg-white py-3 px-2  rounded-md flex-row gap-4"
  >
    <span
      class="min-w-[1.5rem] h-6 flex items-center justify-center text-center text-white shadow-xl bg-green-800 rounded-full"
    >
      #{{ Number(props.list) + 1 }}
    </span>
    <p class="text-base font-normal break-all ">{{ props.description }}</p>
  </li>
</template>
