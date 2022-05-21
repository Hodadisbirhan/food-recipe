<script setup>
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import gql from "graphql-tag";
import Icon_with from "../components/Icon_with.vue";
import { useStore } from "vuex";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { onMounted, watchEffect } from "@vue/runtime-core";
import Rating from "../components/Rating.vue";
import { hasDirectives } from "@apollo/client/utilities";
import RateDisplay from "../components/RateDisplay.vue";
const toggler = ref(true);
const useState = useStore();
const recipeID = useRoute().query;
const router = useRouter();
const add_delete_Book = gql`
  mutation($uid: uuid, $recid: Int) {
    addorremovebookmark(args: { uid: $uid, recid: $recid }) {
      recipeid
      userid
    }
  }
`;
const like_unlike_query = gql`
  mutation($useID: uuid, $recip: Int) {
    likeorunlik(args: { uid: $useID, rid: $recip }) {
      userid
      isliked
    }
  }
`;
const Rating_query = gql`
  mutation($uid: uuid, $recid: Int, $rate: Int) {
    rateadding(args: { uid: $uid, rid: $recid, rate_number: $rate }) {
      rate
    }
  }
`;

const addComment_query = gql`
  mutation($useID: uuid, $recip: Int, $text: String) {
    addcomment(args: { uid: $useID, rid: $recip, comm: $text }) {
      comment
      userid
    }
  }
`;
const { mutate: Rate_Dispatch } = useMutation(Rating_query);
const { mutate: Like_Unlike } = useMutation(like_unlike_query);

const {
  mutate: addBooKMark,
  loading: BooKLoading,
  error: error_Mark,
  onDone: complate_B_mark,
} = useMutation(add_delete_Book);

const variables = ref({
  recipeid: recipeID.productID,
  userid: useState.state.id ? useState.state.id : null,
});
const { mutate: add_comments } = useMutation(addComment_query);

let like = ref(4);
let comment = ref(5);
let timer = ref("9 m");
const favorite = ref();
const bookmark = ref();
const ClickedFavorite = () => {
  if (
    useState.state.id != "" &&
    useState.state.id != null &&
    recipeID.productID != null &&
    recipeID.productID != ""
  ) {
    Like_Unlike({ useID: useState.state.id, recip: recipeID.productID }).then((data) => {
      updateMark({
        variables: {
          recipeid: recipeID.productID,
          userid: useState.state.id ? useState.state.id : null,
        },
      });
      if (data.data.likeorunlik && data.data.likeorunlik[0].isliked) {
        favorite.value = "fill-yellow-800";
      } else {
        favorite.value = "";
      }
    });
  } else {
    router.push("/authentication");
  }
};
onMounted(() => {
  updateMark({
    variables: {
      recipeid: recipeID.productID,
      userid: useState.state.id ? useState.state.id : null,
    },
  });
});

const bookMarkClick = () => {
  toggler.value = !toggler.value;
  if (
    useState.state.id != "" &&
    useState.state.id != null &&
    recipeID.productID != null &&
    recipeID.productID != ""
  ) {
    addBooKMark({ uid: useState.state.id, recid: recipeID.productID })
      .then((result) => {
        updateMark({
          variables: {
            recipeid: recipeID.productID,
            userid: useState.state.id ? useState.state.id : null,
          },
        });

        if (result.data.addorremovebookmark.length > 0) {
          bookmark.value = "fill-yellow-800";
        } else bookmark.value = "";
      })
      .catch(() => {
        alert("error happened");
      });
  } else {
    router.push("/authentication");
  }
};

const getProductInfo = gql`
  query getRecip($recipeid: Int, $userid: uuid) {
    getrecipebyid(args: { recipeid: $recipeid }) {
      id
      name
      duration
      rate
      numberoflike
      numberofrate
      numberofcomment
      thum_image
      description
      createdBy

      getDirection {
        steps
      }
      getIngeredent {
        items
      }
      is_she_he_markit(args: { uid: $userid })
      userLikeRateComment(args: { uid: $userid }) {
        comment
        isliked
        rate
      }

      getImage {
        images
      }
      getReview {
        comment
        rate
        getReviewer
      }
    }
  }
`;

const { result, loading, error, fetchMore: updateMark, networkStatus } = useQuery(
  getProductInfo,
  variables
);

const show = ref([]);
const showImage = ref();
const allImage = ref([]);
const description = ref("");

watchEffect(() => {
  if (result && result.value) {
    const detail = result.value;
    show.value = [
      {
        number: result.value.getrecipebyid.numberoflike,
      },
      {
        number: result.value.getrecipebyid.rate,
      },
      {
        number: result.value.getrecipebyid.numberofcomment,
      },
      {
        number: result.value.getrecipebyid.duration,
      },
    ];
    comment.value = show.value[2].number;
    timer.value = show.value[3].number;
    like.value = show.value[0].number;

    showImage.value = result.value.getrecipebyid.thum_image;
    allImage.value =
      result.value.getrecipebyid.getImage.length > 0
        ? result.value.getrecipebyid.getImage[0].images
        : [];

    description.value = result.value.getrecipebyid.description;

    bookmark.value = result.value.getrecipebyid.is_she_he_markit ? "fill-yellow-800" : "";
    favorite.value = result.value.getrecipebyid.userLikeRateComment[0].isliked
      ? "fill-yellow-800"
      : "";
  }
});
const hasText = ref(null);
const put_comment = () => {
  if (hasText && hasText.value) {
    if (
      useState.state.id != "" &&
      useState.state.id != null &&
      recipeID.productID != null &&
      recipeID.productID != ""
    ) {
      add_comments({
        useID: useState.state.id,
        recip: recipeID.productID,
        text: hasText.value,
      })
        .then((data) => {
          hasText.value = "";
          updateMark({
            variables: {
              recipeid: recipeID.productID,
              userid: useState.state.id ? useState.state.id : null,
            },
          });
        })
        .catch((e) => {});
    } else {
      router.push("/authentication");
    }
  }
};

const id = ref("1");
const changeImage = (src) => {
  showImage.value = src;
};

const rating_method = (rates) => {
  if (
    useState.state.id != "" &&
    useState.state.id != null &&
    recipeID.productID != null &&
    recipeID.productID != ""
  ) {
    Rate_Dispatch({
      uid: useState.state.id,
      recid: recipeID.productID,
      rate: rates,
    }).then((e) => {
      updateMark({
        variables: {
          recipeid: recipeID.productID,
          userid: useState.state.id ? useState.state.id : null,
        },
      });
    });
  } else {
    router.push("/authentication");
  }
};
</script>
<template>
  <div class="px-4 pt-16">
    <div v-if="loading" class="flex justify-center w-full h-full items-center">
      <img class="w-20 h-20" src="../assets/loading.svg" alt="" />
    </div>

    <div class="w-full flex flex-col bg-white px-4 pb-4" v-if="result">
      <div>
        <div class="flex relative pb-5 gap-1 md:flex-row flex-col sm:items-start">
          <div class="flex relative w-full pb-5 gap-2 pt-9 flex-col sm:items-start">
            <img
              class="object-cover  w-full md:mr-1  md:w-[90%] rounded-xl h-[19rem]"
              :src="showImage"
              alt="photos"
            />
            <div
              v-if="allImage.length > 0"
              class="flex gap-4 rounded-lg shadow-2xl shadow-white max-w-sm h-16 overflow-y-auto"
            >
              <img
                class="object-cover rounded-full w-16 h-16"
                v-for="image in allImage"
                :key="image"
                @click="changeImage(image)"
                :src="image"
                alt="photos"
              />
            </div>
          </div>
          <div class="flex pt-10 flex-col gap-2">
            <div class="flex flex-col gap-2 pl-4 md:pl-1 flex-wrap">
              <h1 class="font-bold break-all text-3xl text-green-700">
                {{ result.getrecipebyid?.name }}
              </h1>
              <Icon_with :like="like" :comment="comment" :timer="timer" />
            </div>
            <RateDisplay
              :averageNumberOFRate="result.getrecipebyid.rate"
              :numberofpeople="result.getrecipebyid.numberofrate"
            />
            <div class="flex flex-row gap-x-2 gap-y-2">
              <div
                v-if="result.getrecipebyid.createdBy"
                class="w-8 h-8 rounded-full text-center text-2xl text-green-600 bg-slate-600"
              >
                {{ result.getrecipebyid?.createdBy?.toUpperCase().charAt(0) }}
              </div>
              <span class="text-black font-medium inline-block"
                >By {{ result?.getrecipebyid?.createdBy }}</span
              >
            </div>

            <p class="indent-6 text-base break-all">
              {{ description }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col-reverse justify-center w-full md:flex-row pt-5 gap-3 md:gap-1"
      >
        <div
          v-if="
            result.getrecipebyid.getDirection.length > 0 &&
            result.getrecipebyid.getDirection[0].steps.length > 0
          "
          class="rounded-lg border-solid drop-shadow md:w-[60%] h-fit"
        >
          <h1
            class="font-serif  relative rounded-t-lg  text-3xl text-[#7d9e3c] before:content-['']"
          >
        STEPS
          </h1>
          <ul class="list-none flex-grow flex flex-col gap-2">
            <method
              v-for="(item, index) in result.getrecipebyid.getDirection[0].steps"
              :key="item + index"
              :list="index + ''"
              :description="item"
            />
          </ul>
        </div>
        <div
          v-if="result.getrecipebyid.getIngeredent.length > 0"
          class="rounded-lg drop-shadow md:w-[35%]  h-fit border-solid mx-1"
        >
          <h1
            class="font-serif rounded-t-lg  relative  text-3xl text-[#7d9e3c]"
          >
            Ingredient
          </h1>
          <ul class="list-none flex flex-col gap-3">
            <ingredient
              v-for="(step, index) in result.getrecipebyid.getIngeredent[0].items"
              :key="step + index"
              :name="step"
            />
          </ul>
        </div>
      </div>

      <div class="flex pt-7 justify-evenly rounded-t-md gap-4 flex-col">
        <Rating
          @method="rating_method"
          :rate_number="result.getrecipebyid?.userLikeRateComment[0]?.rate"
        >
          ></Rating
        >

        <div class="flex flex-row pb-10 rounded-b-md justify-around">
          <div
            class="shadow-md drop-shadow-xl px-1 rounded-md flex gap-2 items-center shadow-gray-400"
          >
            <svg
              :class="bookmark"
              class="w-auto h-10 py-1 focus:outline-none fill-white stroke-green-900 stroke-2"
              focusable="false"
              @click="bookMarkClick"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="BookmarkIcon"
              tabindex="-1"
              title="Bookmark"
            >
              <path
                d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"
              ></path>
            </svg>

            <span class="text-lg font-semibold">BookMark</span>
          </div>
          <div
            class="drop-shadow-xl shadow-gray-400 shadow-md flex gap-2 w-24 rounded-md py-1 border-none"
          >
            <svg
              :class="favorite"
              class="text-white focus:outline-none stroke-yellow-700 w-10 h-8"
              @click="ClickedFavorite"
              fill="currentColor"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="FavoriteIcon"
              tabindex="-1"
              title="Favorite"
            >
              <path
                d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              ></path>
            </svg>

            <span class="text-lg font-semibold">Like</span>
          </div>
        </div>
      </div>
      <div class="items-center px-[5%] pt-7 flex gap-x-2">
        <label for="comment" class="text-green-600">comment</label>
        <textarea
          v-model="hasText"
          id="comment"
          class="resize-none md:max-w-sm placeholder:italic pl-2 flex-grow outline-1 border-solid shadow-xl border-green-800 border-[1px] rounded-md"
          rows="3"
          cols="30"
          name="comment"
          placeholder="put your comment"
        ></textarea>
        <button
          @click="put_comment"
          :class="{
            'bg-opacity-80 rounded-md': hasText,
            'ring-2': hasText,
            'active:bg-green-500': hasText,
            'disabled:cursor-text': !hasText,
          }"
          class="shadow-lg bg-white w-[7rem] h-[3rem] duration-100"
        >
          post
        </button>
      </div>

      <div
        v-if="result.getrecipebyid.getReview.length > 0"
        class="flex flex-col mx-1 mb-3 mt-2 border-2 border-solid gap-3 rounded-lg"
      >
        <h1
          class="font-serif bg-slate-100 relative rounded-t-lg text-center divide-red-50 text-3xl text-[#7d9e3c] before:content-['']"
        >
          Top Reviews
        </h1>
        <div class="md:grid md:grid-cols-2 rounded-lg shadow-xl px-3 flex flex-col gap-7">
          <Review
            v-for="(review, index) in result.getrecipebyid.getReview"
            :key="review + index"
            :rate="review.rate"
            :comment="review.comment"
            :reviewer="review.getReviewer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: header
</route>
