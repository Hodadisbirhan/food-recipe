<template>
  <div class="relative pb-9 bg-slate-100">
    <div
      class="relative flex items-center mt-14 bg-bottom h-[14rem] bg-[url('/src/assets/catering-2778755_1920.jpg')] bg-cover bg-no-repeat"
    >
      <div class="flex opacity-95 w-full mt-[2rem] justify-center px-[1rem]">
        <input
          @keyup="search_recipe(searchby, search)"
          type="search"
          v-model="search"
          placeholder="Search..."
          class="pl-4 md:pl-6 font-serif w-2/3 md:w-2/4 sm:w-1/3 h-10 shadow-2xl text-sm placeholder:text-sm rounded-l-xl outline-none placeholder:italic"
        />
        <select
          v-model="searchby"
          class="bg-green-500 w-1/3 pl-2 sm:w-[10rem] text-ellipsis outline-none rounded-r-xl"
        >
          <option disabled value="">Search By</option>
          <option v-for="item in option" :value="item" :key="item">{{ item }}</option>
        </select>
      </div>
    </div>

    <div
      class="sticky bg-[rgb(245,245,245)] top-14 z-20 mb-3 flex flex-col items-center gap-8 h-[8rem]"
    >
      <h1
        class="relative w-fit break-all font-serif text-center before:content-[''] before:absolute before:left-[20%] before:right-[20%] before:h-[0.3rem] before:-bottom-4 before:bg-green-700 text-3xl"
      >
        Catagories
      </h1>
      <aside
        ref="scrollBar"
        class="group justify-start flex-grow group w-full h-[4rem] px-8 overflow-x-auto gap-8 flex flex-row"
      >
        <button
          @click="
            () => {
              scrollBar.scrollLeft += 200;
            }
          "
          class="absolute group-hover:visible invisible text-xl bg-transparent ring-1 ring-green-500 left-2 shadow-lg z-30 top-[53%] p-1 rounded-full"
        >
          <BackArrow class="w-6 h-6 text-green-500" />
        </button>
        <button
          @click="
            () => {
              scrollBar.scrollLeft -= 200;
            }
          "
          class="absolute group-hover:visible invisible text-xl bg-transparent ring-1 ring-green-500 right-2 shadow-lg rounded-full z-30 p-1 top-[53%]"
        >
          <ForwardArrow class="w-6 h-6 text-green-500" />
        </button>
      

        <button
          v-for="item in catagory"
          @click="change_catagory(item.id)"
          :key="item.id"
          :class="{
            selected_category: selectedCategoryId == item.id,
            category: selectedCategoryId != item.id,
          }"
        >
          {{ item.title }}
        </button>
      </aside>
    </div>

    <div v-if="loading" class="flex w-full h-full justify-center items-center">
      <img class="w-20 h-20" src="../assets/loading.svg" alt="" />
    </div>

    <div
      v-if="result && result.search_recipe.length < 1"
      class="flex relative w-full h-full justify-center items-center"
    >
      <span class="text-3xl">NO PRODUCT FOUND</span>
    </div>

    <main
      v-if="result"
      class="grid gap-y-8 px-[2%] sm:px-[8%] gap-x-8 bg-[whitesmoke] xl:grid-cols-4 place-items-center 2xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
    >
      <Card
        v-for="item in result.search_recipe"
        :key="item.id"
        :unique="item.id"
        :name="item.name"
        :description="item.description"
        :src="item.thum_image"
        :createdby="item.createdBy"
        :like="item.numberoflike"
        :rate="item.numberofrate"
        :ratedby="item.rate"
        :comment="item.numberofcomment"
        :duration="item.duration"
      />
    </main>
  </div>
</template>
<script setup>
import onloading from "../components/onLoading.vue";
import { ref } from "@vue/reactivity";
import { onMounted, onUpdated, watchEffect } from "@vue/runtime-core";
import Card from "../components/cards.vue";
import app from "../Axios/axiosconf";
import { useStore } from "vuex";
const store = useStore();
import gql from "graphql-tag";

import { useQuery, useQueryLoading } from "@vue/apollo-composable";
const catagory_id = ref(0);
const scrollBar = ref(null);
const query_recipe = gql`
  query($title: String, $search: String, $cataid: Int) {
    search_recipe(args: { search: $search, title: $title, cata: $cataid }) {
      name
      id
      description
      createdBy
      numberoflike
      numberofrate
      numberofcomment
      thum_image
      rate
      duration
    }
  }
`;

const variables = ref({ cataid: 0 });
watchEffect(() => {});
const option = ref(["duration", "title", "Ingradient"]);

const { result, loading, error, fetchMore: fetch_More } = useQuery(
  query_recipe,
  variables
);
onMounted(() => {
  fetch_More({ variables: { cataid: 0 } });
});
function search_recipe(title, search) {
  variables.value = { title, cataid: catagory_id.value, search };
}

function change_catagory(id) {
  selectedCategoryId.value = id;
  catagory_id.value = id;
  variables.value = { cataid: id };
}

const searchby = ref("");
const search = ref("");
const selectedCategoryId = ref(0);
const catagory = ref([
  { title: "All", id: 0 },
  { title: "Launch", id: 249 },
  { title: "BreakFast", id: 250 },
  { title: "Dinner", id: 251 },
  { title: "Desert", id: 252 },
  { title: "Appitizer", id: 253 },
  { title: "SideDish", id: 254 },
  { title: "Quick and easy", id: 255 },
  { title: "Holiday", id: 256 },
  { title: "Soup", id: 257 },
  { title: "vegeterain", id: 258 },
  { title: "Salad", id: 259 },
]);





</script>

<style>
.selected_category {
  @apply font-mono  bg-green-500 hover:text-white whitespace-nowrap text-black  text-center border-solid border-2 border-green-500 h-fit align-middle inline-block rounded-xl px-3 text-lg cursor-pointer transition-all ease-in-out duration-200;
}

.category {
  @apply text-lg bg-white text-black focus:bg-green-500 whitespace-nowrap text-center border-solid border-2 border-green-500 h-fit align-middle inline-block rounded-xl px-3 cursor-pointer;
}
</style>

<route lang="yaml">
meta:
  layout: header
</route>
