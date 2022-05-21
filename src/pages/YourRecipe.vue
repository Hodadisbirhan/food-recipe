<script setup>
import { useStore } from "vuex";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { computed, onMounted, ref, watchEffect } from "@vue/runtime-core";

const recipe_query = gql`
  query($uid: uuid) {
    getuserbyid(args: { uid: $uid }) {
      getYourRecipe {
        name
        duration
        description
        id
        thum_image
      }
    }
  }
`;
const remove_mutation = gql`
  mutation($uid: uuid, $recid: Int) {
    remove_recipes(args: { uid: $uid, recid: $recid }) {
      name
    }
  }
`;
const store = useStore();

const variables = ref({ uid: store.state.id });
const { result, fetchMore: update_recipe_delate, onLoading, onError } = useQuery(
  recipe_query,
  variables
);

const { mutate: remove_recipe_by_owener } = useMutation(remove_mutation);
const computednumber = computed({
  get() {
    return result.value;
  },
});

onMounted(() => {
  update_recipe_delate({ uid: store.state.id });
});

const remove_recipe = (id) => {
  if (id && store.state.id) {
    remove_recipe_by_owener({ uid: store.state.id, recid: id }).then((response) => {
      update_recipe_delate({ uid: store.state.id });
    });
  }
};
</script>
<template>
  <div class="relative pb-9 bg-teal-50">
    <div
      class="relative rounded-b-3xl flex items-center mt-14 bg-bottom h-[10rem] bg-[url('/src/assets/catering-2778755_1920.jpg')] bg-cover bg-no-repeat"
    >
      <div class="flex opacity-95 w-full mt-[2rem] justify-center px-[1rem]"></div>
    </div>

    <div
      class="sticky bg-[rgb(245,245,245)] top-14 z-20 mb-3 flex flex-col items-center gap-8 h-[8rem]"
    >
      <h1
        class="relative w-fit break-all font-serif text-center before:content-[''] before:absolute before:left-[20%] before:right-[20%] before:h-[0.3rem] before:-bottom-4 before:bg-green-700 text-3xl"
      >
        HeLLO {{ store.state.name }}
      </h1>
      <h2 class="relative w-fit break-all font-serif text-slate-600 text-center text-3xl">
        YOUR RECIPE
      </h2>
    </div>

    <main
      v-if="result && result.getuserbyid"
      class="grid bg-slate-100 gap-5 px-[4%] sm:px-[8%] xl:grid-cols-4 place-items-center 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1"
    >
      <Recipe_Card
        @delete_recipe="remove_recipe"
        v-for="item in computednumber.getuserbyid[0].getYourRecipe"
        :key="item.id"
        :unique="item.id"
        :name="item.name"
        :description="item.description"
        :src="item.thum_image"
        :duration="item.duration"
      />
    </main>
  </div>
</template>
<route lang="yaml">
meta:
  layout: header
</route>
