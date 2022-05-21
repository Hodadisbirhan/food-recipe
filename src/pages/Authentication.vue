<script setup>
import SignUp from "../components/Signup.vue";
import Login from "../components/Login.vue";
import { provide, ref } from "vue";

const show = ref(null);

const title = ref("WellCome Back");
const direction = ref("do you have already account?");
provide("func", loSign);

function loSign() {
  if (title.value === "WellCome Back") {
    title.value = "New User";
    direction.value = "create Account";
  } else {
    title.value = "WellCome Back";
    direction.value = "do you have already account?";
  }
  show.value = !show.value;
}
</script>
<template>
  <div
    class="min-h-screen relative flex bg-[url('/src/assets/show.jpeg')] bg-fixed bg-cover bg-no-repeat justify-center items-center w-screen"
  >
    <div
      class="flex flex-row w-[80%] md:w-[60%] rounded-[2rem] justify-center items-center h-[32rem]"
    >
      <div
        class="w-[36%] hidden rounded-l-[2rem] sm:flex h-full bg-green-600 flex-col gap-2 justify-center items-center"
      >
        <img
          src="/src/assets/front.jpeg"
          class="w-[10rem] rounded-full h-[10rem]"
          alt="front"
        />

        <h1 class="text-white text-2xl font-mono font-bold">{{ title }}</h1>
        <p class="text-white font-mono px-2">{{ direction }}</p>
        <button
          @click="loSign()"
          class="rounded-[1.3rem] w-[7rem] text-white border-2 h-10 border-white font-mono border-solid uppercase hover:text-gray-600 hover:bg-white"
        >
          {{ !show ? "Sign In" : "Signup" }}
        </button>
      </div>
      <SignUp v-show="!show" />
      <Login v-show="show" />
    </div>
  </div>
</template>
