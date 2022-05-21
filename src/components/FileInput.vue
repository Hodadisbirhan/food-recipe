<script setup>
const props = defineProps({
  isMultiple: Boolean,
  review: Function,
});
</script>
<template>
  <input
    type="file"
    accept="image/x-png,image/gif,image/jpeg"
    :multiple="props.isMultiple"
    @change="props.review"
    class="file:text-xl file:border-2 file:border-solid file:hover:bg-fuchsia-100 file:border-fuchsia-100 text-white bg-slate-600 shadow-md file:bg-white file:rounded-lg placeholder:text-2xl rounded-lg w-full file:w-[50%] file:h-14"
  />
</template>
