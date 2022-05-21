<script setup>
import { ref } from "@vue/reactivity";
import { computed, watchEffect } from "@vue/runtime-core";
import { useForm, useField } from "vee-validate";
import { useStore } from "vuex";
import Input from "../components/Input.vue";
import InputFile from "../components/FileInput.vue";
import TextArea from "../components/TextArea.vue";
import Dropdawn from "../components/Dropdawn.vue";
import InNumber from "../components/InNumber.vue";
import axios from "../Axios/axiosconf";
const store = useStore();
import { gql } from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";

const loading = ref(false);

const mutant = gql`
  mutation(
    $cataid: Int!
    $collectionimage: String!
    $description: String!
    $duration: String!
    $ingred: String!
    $step: String!
    $thumbimage: String!
    $title: String!
    $userid: uuid
  ) {
    insertrecipe(
      args: {
        catid: $cataid
        collectionimage: $collectionimage
        description: $description
        duration: $duration
        ingred: $ingred
        step: $step
        thumbimage: $thumbimage
        title: $title
        userid: $userid
      }
    ) {
      name
    }
  }
`;

const { mutate } = useMutation(mutant);

const steps = ref([]);

const warning_for_ingredient = ref();
const schemeValidate = {
  nameValidate: (value) => {
    if (value && value.trim()) return true;
    else return "please Enter the Title";
  },
  descriptionValidate: (value) => {
    if (value && value.trim()) return true;
    else return "please Enter the description";
  },

  prep: (value) => {
    if (value && !isNaN(Number(value)) && Number(value) > 0) {
      return true;
    } else if (Number(value) < 0) return "must not negative";
    else return "Enter the number ";
  },

  ingredient: (value) => {
    warning_for_ingredient.value = "";

    if (ingradientInput.value && ingradientInput.value.length >= 1) return true;
    else return "at least one ingredient is required";
  },
  imageValidate: (value) => {
    if (images.value && images.value.length > 0) return true;
    else return "Image is required";
  },

  stepValidate: (value) => {
    stepwarning.value = "";
    if (steps.value.length >= 2) return true;
    else return " at least two step is required";
  },
};

const ingradientInput = ref([]);
const stepwarning = ref();

function addIngredient() {
  if (ingradient.value != "" && ingradient.value != undefined) {
    ingradientInput.value.push({
      value: ingradient.value,
      id: Date.now(),
    });
    ingradient.value = "";
  } else {
    warning_for_ingredient.value = "Please Enter the ingredient";
  }
}
function addStep() {
  if (step_input.value != "" && step_input.value != "" && step_input.value != undefined) {
    steps.value.push({ value: step_input.value, id: Date.now() });
    step_input.value = "";
  } else {
    stepwarning.value = "Please Enter the step";
  }
}
const images = ref([]);
const thumbImage = ref("/src/assets/ground.jpeg");
const imagename = ref();

const showImage = ref(false);

function review(event) {
  if (event.target.files) {
    const files = [...event.target.files];
    image_warning.value = "";
    images.value = [];
    imagename.value = [];

    files.forEach((file) => {
      imagename.value.push(file.name);
      readAndPreview(file);
    });
    showImage.value = true;
  }

  function readAndPreview(file, index) {
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      images.value.push(this.result);
      thumbImage.value = images.value[0];
    });

    reader.readAsDataURL(file);
  }
}

let key = 2;

const bool = true;

const image_warning = ref();

const { handleSubmit, resetForm } = useForm({ validationSchema: schemeValidate });

const { value: title, errorMessage: errorTitle } = useField("nameValidate");
const { value: description, errorMessage: errorDescription } = useField(
  "descriptionValidate"
);

const { value: ingradient, errorMessage: errorIngredient } = useField("ingredient");
const { value: step_input, errorMessage: errorStep } = useField("stepValidate");
const { value: imagevalue, errorMessage: errMage } = useField("imageValidate");
const { value: prep, errorMessage: errorPrep } = useField("prep");

const catagory = ref("3");

let prep_Time = ref("min");
const removeIngerdeint = (inde) => {
  ingradientInput.value = ingradientInput.value.filter((value) => {
    return value.id != inde;
  });
};

function removestep(index) {
  steps.value = steps.value.filter((value) => {
    return value.id != index;
  });
}
function editStep(index) {
  let value = steps.value.find((e) => {
    return e.id == index;
  });
  step_input.value = value.value;

  steps.value = steps.value.filter((value) => {
    return value.id != index;
  });
}

function editIngredient(index) {
  let value = ingradientInput.value.find((e) => {
    return e.id == index;
  });
  ingradient.value = value.value;

  ingradientInput.value = ingradientInput.value.filter((value) => {
    return value.id != index;
  });
}

const imageLink = ref("");
const temporaryImage = ref();

const upload = async () => {
  try {
    if (images.value.length >= 1) {
      const featureIndex = images.value.indexOf(thumbImage.value);
      for (let x = 0; x < images.value.length; x++) {
        const uploading = await axios.post("/user/uploadImage", {
          filename: imagename.value[x],
          base64img: images.value[x].split(",")[1],
        });
        if (x == 0) imageLink.value = uploading.data.url;
        else imageLink.value = imageLink.value + "," + uploading.data.url;

        if (featureIndex == x) {
          temporaryImage.value = uploading.data.url;
        }
      }
    }
  } catch (e) {}
};

function choose_feature(value) {
  thumbImage.value = value;
}

const submit = handleSubmit(
  async (values) => {
    loading.value = true;
    await upload();

    let upload_ingredeint_text = "";
    ingradientInput.value.forEach((element, index) => {
      if (index === 0) upload_ingredeint_text = `${element.value}`;
      else upload_ingredeint_text = `${upload_ingredeint_text} , ${element.value}`;
    });

    let upload_step_text = "";
    steps.value.forEach((element, index) => {
      if (index === 0) upload_step_text = `${element.value}`;
      else upload_step_text = `${upload_step_text},${element.value}`;
    });
    mutate({
      cataid: Number(catagory.value),
      collectionimage: imageLink.value,
      description: values.descriptionValidate,
      duration: values.prep + " " + prep_Time.value,
      ingred: upload_ingredeint_text,
      step: upload_step_text,
      thumbimage: temporaryImage.value,
      title: values.nameValidate,
      userid: store.state.id,
    });
    images.value = [];
    ingradientInput.value = [];
    steps.value = [];
    resetForm();
    loading.value = false;
  },
  (error) => {
    if (ingradientInput.value.length < 2) {
      warning_for_ingredient.value = "at Least two ingredient is required";
    }
    if (steps.value.length < 1) {
      stepwarning.value = "at leat one Step is required";
    }
    if (images.value.length < 1) {
      image_warning.value = "Image is required";
    }
  }
);
</script>

<template>
  <div class="bg-slate-100">
    <div
      class="bg-[url('/src/assets/images.png')] flex items-end justify-center rounded-b-3xl h-60 bg-no-repeat bg-cover round"
    >
      <div class="flex md:w-[75%] w-full px-3 flex-col justify-center">
        <div class="rounded-t-md bg-white h-20 w-full">
          <h1 class="text-3xl text-green-900 font-bold text-center">Food Recipe</h1>
          <h2 class="text-2xl text-center text-[yellowgreen]">Create your food recipe</h2>
        </div>
      </div>
    </div>

    <div class="flex flex-col w-full pb-7 items-center">
      <form
        class="flex flex-col gap-4 bg-white opacity-80 shadow-2xl rounded-lg md:w-3/4 pb-9 mx-3"
        @submit.prevent="submit"
      >
        <div class="flex flex-col w-full border-2 shadow-inner">
          <div class="flex md:w-full gap-4 items-center flex-row">
            <div class="flex relative w-3/5 flex-col">
              <Input
                v-model="title"
                type="text"
                name="foodtitle"
                id="name"
                placeholder="enter the food name"
              />
              <span
                class="absolute -bottom-3 text-center sm:text-sm text-xs left-[10%] rounded-lg right-[10%] max-w-fit font-serif text-red-800 bg-white"
                >{{ errorTitle }}</span
              >
            </div>

            <div class="flex-col w-2/5 mr-2 flex">
              <label
                for="catagory"
                class="capitalize break-all text-lg text-slate-600 italic font-serif"
                >Catagory</label
              >
              <select
                id="catagory"
                v-model="catagory"
                class="w-full text-ellipsis font-mono outline-none border-green-800 px-2 border-[1px] text-xl h-14 rounded-xl"
              >
                <option value="3">Dinner</option>
                <option value="93">Lunch</option>
                <option value="4">BreakFast</option>
                <option value="94">Food</option>
              </select>
            </div>
          </div>

          <div class="flex flex-col">
            <div class="flex gap-2 px-4 flex-col relative w-full">
              <label
                for="description"
                class="capitalize text-lg text-slate-600 italic font-serif"
                >Description</label
              >
              <textarea
                placeholder="enter the description"
                id="description"
                v-model="description"
                class="rounded-xl placeholder:italic border-green-800 w-full text-lg font-normal px-4 h-44 border-2"
              ></textarea>
              <span
                class="absolute -bottom-3 text-center left-[10%] w-fit rounded-lg right-[10%] font-serif text-red-800 bg-white"
                >{{ errorDescription }}</span
              >
            </div>
            <div class="flex pt-4 px-4 items-center flex-col">
              <div class="w-full flex items-center flex-col gap-5">
                <div class="flex relative max-w-sm flex-col">
                  <label class="capitalize text-lg w-fit text-slate-600 italic font-serif"
                    >Images</label
                  >
                  <span
                    class="absolute -bottom-3 text-center left-[10%] w-fit rounded-lg right-[10%] font-serif text-red-900 bg-white"
                    >{{ image_warning }}</span
                  >

                  <InputFile :isMultiple="bool" v-model="imagevalue" :review="review" />
                </div>
                <div
                  class="flex items-center sm:w-5/6 w-full shadow-2xl flex-col"
                  v-show="showImage"
                >
                  <label class="capitalize text-lg text-slate-600 italic font-serif"
                    >Choose thumbial Image</label
                  >
                  <div
                    v-if="images.length > 0"
                    class="grid px-3 border-[1px] rounded-xl gap-4 w-full max-w-sm md:w-2/3 h-48 overflow-auto md:grid-cols-3 grid-cols-2"
                  >
                    <div
                      v-for="(item, index) in images"
                      :key="item + index"
                      class="h-24 w-24 relative"
                    >
                      <input
                        type="radio"
                        v-model="thumbImage"
                        name="eachImage"
                        :value="item"
                        @change="choose_feature(item)"
                        class="absolute top-2 bg-slate-200 left-2 w-5 h-5"
                      />
                      <img
                        :src="item"
                        class="object-cover rounded-full shadow-xl h-24 w-24"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full flex justify-center">
            <div class="flex gap-3 flex-col pt-6 mt-4 pb-12 shadow-white">
              <h1 class="text-center text-2xl text-black font-serif">Ingredients</h1>
              <p class="text-slate-900 font-normal px-3">
                Enter one ingredient per line. Include the quantity (i.e. cups,
                tablespoons) and any special preparation (i.e. sifted, softened, chopped)
              </p>
              <div class="flex gap-2 items-end flex-col">
                <div class="flex w-full relative items-center flex-row gap-0">
                  <Input
                    type="text"
                    v-model="ingradient"
                    placeholder="Enter a cup of better"
                    name="ingredient"
                  />
                  <span
                    class="absolute -bottom-3 text-center left-[10%] rounded-lg right-[10%] w-fit px-2 text-sm font-serif text-red-900 bg-white"
                    >{{ warning_for_ingredient }}</span
                  >
                </div>
                <div class="flex w-full justify-end pr-3">
                  <button
                    v-on:click="addIngredient"
                    type="button"
                    class="capitalize w-36 ring-0 hover:text-gray-200 hover:bg-green-600 rounded-md h-12 border-2 border-green-600"
                  >
                    + Ingredient
                  </button>
                </div>
              </div>
              <div class="flex flex-col gap-2 w-full">
                <div
                  class="flex flex-col px-2 py-4 mx-4 bg-slate-100 rounded-lg drop-shadow-xl"
                  v-for="item in ingradientInput"
                  :key="item.id"
                >
                  <p class="break-all font-sans">{{ item.value }}</p>
                  <div class="flex w-full items-center justify-end flex-row gap-5">
                    <button
                      @click="editIngredient(item.id)"
                      type="button"
                      class="ring-0 px-2 capitalize bg-green-600 hover:bg-green-900 text-gray-200 w-20 rounded-md h-7 border-2 border-green-600"
                    >
                      edit
                    </button>
                    <button
                      type="button"
                      class="ring-0 px-2 capitalize bg-gray-800 text-white w-20 hover:bg-green-600 rounded-md h-7 border-2"
                      @click="removeIngerdeint(item.id)"
                    >
                      delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex w-full items-center gap-2 flex-row">
            <div class="w-full relative">
              <in-number class="w-1/2" placeholder="time" name="prep" />
              <span
                class="absolute -bottom-4 text-center left-[10%] w-fit text-xs rounded-lg right-[10%] font-serif text-red-800 bg-white"
                >{{ errorPrep }}</span
              >
            </div>
            <div class="w-full flex flex-col gap-3">
              <dropdawn class="w-1/2" v-model="prep_Time" />
            </div>
          </div>
          <div class="px-4 pt-0 pb-10 mt-9 gap-2 flex flex-col">
            <h1 class="text-center text-2xl text-black font-serif">Direction</h1>
            <p class="text-gray-900 font-normal px-3 mb-9">
              write procedure that how to prepare your food including the amount of
              ingradient with each step and the time it take inorder to precede to the
              next step and also the Temprature
            </p>
            <div class="flex w-full relative">
              <text-area
                name1="step"
                v-model="step_input"
                label="direction"
                placeholder="Enter step one"
              />
              <span
                class="absolute -bottom-3 text-center left-[10%] w-fit px-2 rounded-lg right-[10%] font-serif text-red-800 bg-white"
                >{{ stepwarning }}</span
              >
            </div>

            <div class="flex w-full justify-center">
              <button
                type="button"
                @click="addStep"
                class="md:w-36 w-fit ring-0 px-5 capitalize hover:bg-green-600 rounded-md h-12 border-2 border-green-600"
              >
                + add Step
              </button>
            </div>

            <div
              class="flex flex-col px-2 py-4 mx-4 rounded-lg bg-slate-100 drop-shadow-xl"
              v-for="(item, index) in steps"
              :key="index"
            >
              <p class="break-all font-mono">
                <span class="text-lg px-3 text-green-800">Step:{{ index + 1 }}</span
                >{{ item.value }}
              </p>
              <div class="flex w-full items-center justify-end flex-row gap-5">
                <button
                  @click="editStep(item.id)"
                  type="button"
                  class="ring-0 px-2 capitalize text-white hover:bg-green-900 bg-green-600 rounded-md h-7"
                >
                  edit
                </button>
                <button
                  type="button"
                  class="ring-0 px-2 capitalize text-white hover:bg-green-900 bg-green-600 rounded-md h-7 border-2 border-green-600"
                  @click="removestep(item.id)"
                >
                  delete
                </button>
              </div>
            </div>

            <div v-if="loading" class="flex justify-center items-center">
              <img class="w-20 h-20" src="../assets/loading.svg" alt="" />
            </div>
            <div v-else class="flex justify-center gap-3">
              <button
                type="submit"
                class="w-fit px-6 md:w-36 ring-0 capitalize hover:bg-green-600 rounded-md h-12 border-2 border-green-600"
              >
                Submit
              </button>
              <button
                type="button"
                @click="resetForm()"
                class="w-fit px-6 ring-0 sm:w-36 capitalize hover:bg-green-600 rounded-md h-12 border-2 border-green-600"
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: header
</route>
