<template>
  <article
    class="group rounded-md mt-6 w-full drop-shadow-xl sm:w-full max-w-sm relative hover:scale-105 duration-1000 shadow-lg"
  >
    <span
      @click="show"
      class="text-neutral-50 z-50 absolute drop-shadow-lg overflow-hidden cursor-pointer bg-green-600 group-hover:left-[20%] group-hover:right-[20%] h-[2rem] text-center rounded-lg invisible group-hover:visible duration-300 bottom-[0%] left-[50%] right-[50%]"
      >View Detail</span
    >
    <button
      @click="call_for_book_delete(unique)"
      class="absolute z-50 -top-2 w-7 h-7 bg-transparent -left-2 text-white"
    >
      <svg
        class="text-red-500 focus:outline-none focus:border-none w-7 h-7"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="RemoveCircleIcon"
        tabindex="-1"
        title="RemoveCircle"
        fill="currentColor"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"
        ></path>
      </svg>
    </button>
    <div class="flex relative rounded-t h-24 flex-row w-full bg-white justify-center">
      <img
        :src="props.src"
        class="rounded-full absolute -top-8 left-[50%] -translate-x-[50%] h-24 w-24 object-center object-cover max-w-sm"
        alt="Food"
      />
    </div>

    <div
      class="flex flex-col rounded-b bg-white w-full pb-2 items-center h-32 gap-2 justify-center"
    >
      <div class="flex flex-col justify-center items-center w-full">
        <span
          class="text-base text-center font-semibold w-full px-2 truncate text-black"
          >{{ props.name }}</span
        >
        <p class="break-all px-2 text-center truncate w-full text-sm font-serif">
          {{
            props.description.length >= 80
              ? props.description.substring(0, 78) + "..."
              : props.description
          }}
        </p>
      </div>
      <div class="flex flex-row justify-evenly items-center w-full">
        <!-- <div class="flex flex-row">
          <span class="text-sm">{{ rate }}</span>
          <img v-for="i in 4" :key="i" src="/src/assets/start.png" class="w-4 h-4" />
        </div> -->

        <div class="flex gap-2 items-center flex-row">
          <ratecomponent :numberOfRate="numberRate" />
          <span class="text-sm text-slate-400">{{ rate }}</span>
        </div>

        <div class="flex justify-center gap-1">
          <svg
            class="w-6 h-5 fill-slate-400"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="ThumbUpAltIcon"
          >
            <path
              d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15z"
            ></path>
          </svg>
          <span class="text-sm">{{ numberoflike }}</span>
        </div>
      </div>
      <div class="flex flex-row justify-evenly w-full">
        <div class="relative flex text-sm gap-[2px]">
          <svg
            class="w-5 h-5 fill-slate-400"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="ChatBubbleRoundedIcon"
            tabindex="-1"
            title="ChatBubbleRounded"
          >
            <path
              d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
            ></path>
          </svg>
          <span class="text-sm">{{ numberofcomment }}</span>
        </div>
        <div class="flex gap-2 text-sm">
          <svg
            class="w-5 h-5 fill-slate-300"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="AccessTimeIcon"
            tabindex="-1"
            title="AccessTime"
          >
            <path
              d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
            ></path>
            <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
          </svg>
          <span class="text-sm text-slate-600">{{duration}}</span>
        </div>
      </div>
      <div class="flex w-full justify-end pr-4 gap-1 text-sm">
        <span class="">By</span> <span class="text-black font-bold">{{ createdBy }}</span>
      </div>
    </div>
  </article>
</template>
<script setup>
const props = defineProps({
  src: String,
  description: String,
  name: String,
  duration: String,
  unique: Number,
  numberoflike: Number,
  numberofcomment: Number,
  numberRate: Number,
  createdBy: String,
  rate: Number,
});

import { onUnmounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import ratecomponent from "../components/Rat_component.vue";
const use = useRouter();
function show() {
  use.push({ name: "detail", query: { productID: props.unique } });
}

const emits = defineEmits(["deleteMark"]);
const call_for_book_delete = (id) => {
  emits("deleteMark", id);
};
</script>
