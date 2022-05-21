<template>
  <div class="relative pb-9 bg-slate-200">
    <div
      class="relative flex items-center justify-center mt-14 bg-bottom h-[16rem] bg-[url('/src/assets/catering-2778755_1920.jpg')] bg-cover bg-no-repeat"
    >
      <h1 class="text-2xl text-center absolute bottom-0 opacity-90 w-full h-12 bg-white">
        Your Favorite BookMArk
      </h1>
    </div>
    <div class="pb-20 flex items-center justify-center">
      <h2 v-if="result" class="text-2xl font-mono text-center">
        You have {{ computedCards?.getuserbyid[0]?.numberofBookMark }} Saved
      </h2>
    </div>

    <main
      v-if="result"
      class="grid w-full gap-y-5 px-4 sm:px-[4%] gap-x-5 place-items-center 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-1"
    >
      <book-card
        @deleteMark="delete_book_mark"
        v-for="item in computedCards?.getuserbyid[0].getBookMark"
        :key="item"
        :name="item.name"
        :description="item.description"
        :src="item.thum_image"
        :unique="item.id"
        :numberRate="item.rate"
        :createdBy="item.createdBy"
        :numberofcomment="item.numberofcomment"
        :rate="item.numberofrate"
        :numberoflike="item.numberoflike"
        :duration="item.duration"
      />
    </main>
    <div v-if="loading" class="flex justify-center items-center">
      <img class="w-20 h-20" src="../assets/loading.svg" alt="" />
    </div>
  </div>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import gql from "graphql-tag";
import { computed, onMounted, onUpdated, watchEffect } from "@vue/runtime-core";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useStore } from "vuex";
const store = useStore();
const markedRecipe = gql`
  query($uid: uuid!) {
    getuserbyid(args: { uid: $uid }) {
      name
      numberofBookMark
      getBookMark {
        name
        thum_image
        description
        numberofrate
        rate
        numberoflike
        numberofcomment
        duration
        createdBy
        id
      }
    }
  }
`;
const mark_remove = gql`
  mutation removing($uid: uuid, $recid: Int) {
    remove_bookmark(args: { uid: $uid, recid: $recid }) {
      userid
    }
  }
`;
const { mutate: mutant_remove_mark } = useMutation(mark_remove);

const delete_book_mark = (id) => {
  if (store.state.id != "" && store.state.id != null && id != null && id != "") {
    mutant_remove_mark({ uid: store.state.id, recid: id }).then((respons) => {
      update_change({ variables: { uid: store.state.id } });
    });
  }
};

onMounted(() => {
  update_change({ variables: { uid: store.state.id } });
});

const variables = ref({ uid: store.state.id });
const { result, loading, fetchMore: update_change, error } = useQuery(
  markedRecipe,
  variables
);
const computedCards = computed({
  get() {
    return result.value;
  },
});
</script>

<route lang="yaml">
meta:
  layout: header
</route>
