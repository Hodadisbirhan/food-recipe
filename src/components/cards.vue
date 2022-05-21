<template>
  <article
    class="group w-[90%] max-w-sm sm:w-full relative hover:scale-105 duration-1000 shadow-lg rounded-t-xl"
  >
    <span
      @click="show(unique)"
      class="text-neutral-50 absolute drop-shadow-lg overflow-hidden cursor-pointer bg-green-600 group-hover:left-[20%] group-hover:right-[20%] h-[2rem] text-center rounded-lg invisible group-hover:visible duration-500 top-[0%] left-[50%] right-[50%]"
      >View Detail</span
    >

    <img
      :src="props.src"
      class="rounded-t-xl h-[8rem] object-center object-cover w-full max-w-sm"
      alt="Food"
    />

    <div class="flex flex-col relative w-full bg-white h-36 pb-2 gap-2 items-start">
      <div class="flex w-full flex-col">
        <span class="text-xl px-2 break-all font-semibold">{{
          props.name.length > 10 ? props.name.substring(0, 10) + "..." : props.name
        }}</span>
        <p class="px-2 text-base truncate w-full text-ellipsis text-slate-400 font-sans">
          {{
            props.description.length >= 30
              ? props.description.substring(0, 30) + "..."
              : props.description
          }}
        </p>
      </div>
      <div class="flex flex-row justify-around w-full">
        <div class="flex gap-2 items-center flex-row">
          <ratecomponent :numberOfRate="ratedby" />
          <span class="text-sm text-slate-400">{{ rate }}</span>
        </div>

        <div class="flex gap-1">
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
          <span class="text-sm text-slate-400"> {{ like }} </span>
        </div>
      </div>
      <div class="flex flex-row justify-around w-full">
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
          <span class="text-sm text-slate-400">{{ comment }}</span>
        </div>
        <div class="flex text-sm text-slate-400">
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
          {{ duration }}
        </div>
      </div>
      <div class="flex w-full justify-end absolute bottom-1 pr-4 gap-1 text-sm">
        <span class="">By</span><span class="font-semibold"> {{ createdby }}</span>
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
  createdby: String,
  duration: String,
  unique: Number,
  like: Number,
  ratedby: Number,
  rate: Number,
  comment: Number,
});
import { useRouter } from "vue-router";
const use = useRouter();
function show(id) {
  use.push({ name: "detail", query: { productID: id } });
}
</script>
