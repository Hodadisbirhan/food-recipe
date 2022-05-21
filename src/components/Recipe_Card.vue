<template>
  <article
    class="group bg-white h-48 max-w-xs gap-4 flex flex-row relative hover:scale-105 duration-1000 shadow-lg rounded-t-xl"
  >
    <span
      @click="show(unique)"
      class="text-neutral-50 absolute z-10 drop-shadow-lg overflow-hidden cursor-pointer bg-green-600 group-hover:left-[20%] group-hover:right-[20%] h-[2rem] text-center rounded-lg invisible group-hover:visible duration-500 top-[0%] left-[50%] right-[50%]"
      >View Detail</span
    >

    <div class="w-[40%] h-48"><img :src="props.src" class="w-full h-48 flex-1 object-center  object-cover" alt="Food" /></div>

    <div class="flex flex-col h-48 w-2/3 flex-1 bg-white pb-2 gap-3 items-start">
      <div class="flex w-full flex-col gap-2">
        <span
          class="text-xl w-full px-2 max-w-xs break-all text-ellipsis font-semibold text-black"
          >{{
            props.name.length > 10 ? props.name.substring(0, 8) + "..." : props.name
          }}</span
        >
        <p
          class="px-2 break-all w-2/3 max-w-xs text-ellipsis text-sm font-mono text-slate-500"
        >
          {{
            props.description.length >= 40
              ? props.description.substring(0, 40) + "..."
              : props.description
          }}
        </p>
      </div>

      <div
        class="flex flex-row relative h-full bottom-1 right:[10%] justify-center w-full"
      >
        <button
          @click="remove_your_recipe(props.unique)"
          class="h-6 w-20 right-[10%] absolute bottom-1 rounded-md drop-shadow-md bg-yellow-700 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  </article>
</template>
<script setup>
import ratecomponent from "../components/Rat_component.vue";
const props = defineProps({
  src: String,
  description: String,
  name: String,
  duration: String,
  unique: Number,
});
import { useRouter } from "vue-router";
const use = useRouter();
function show(id) {
  use.push({ name: "detail", query: { productID: id } });
}

const emits = defineEmits(["delete_recipe"]);

const remove_your_recipe = (id) => {
  emits("delete_recipe", id);
};
</script>
