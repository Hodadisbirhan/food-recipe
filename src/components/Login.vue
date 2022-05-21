<script setup>
import Input from "./Input.vue";
import { useForm, useField } from "vee-validate";
import { inject, onUpdated, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router = useRouter();
import app from "../Axios/axiosconf";
const store = useStore();

const toggle = ref("null");
const change = inject("func");

const scheme = {
  email: (value) => {
    if (value && value.trim()) {
      if (value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) return true;
      else return "enter valid Email";
    }

    return "this is required";
  },
  password: (value) => {
    errorDisplay.value = "";
    if (value && value.trim()) {
      return true;
    } else return "It is required";
  },
};

const errorDisplay = ref("");

const { handleSubmit } = useForm({
  validationSchema: scheme,
});

const { value: email, errorMessage: emailError } = useField("email");

const { value: password, errorMessage: passError } = useField("password");
const loading = ref(false);
const submit = handleSubmit(async () => {
  try {
    loading.value = true;
    const data = await app.post("/user/login", {
      email: email.value,
      password: password.value,
    });

    if (data.status === 201) {
      errorDisplay.value = data.data.erro;
    } else if (data.status === 200) {
      store.dispatch("setName", data.data.name);
      store.dispatch("setToken", data.data.accessToken);
      store.dispatch("setId", data.data.id);
      store.dispatch("setEmail", data.data.email);
      router.push("/");
    }
  } catch (e) {
    errorDisplay.value = e.message;
  } finally {
    loading.value = false;
  }
});
</script>
<template>
  <form
    @submit.prevent="submit"
    ref="toggle"
    key="login"
    class="w-[63%] bg-white rounded-[2rem] sm:rounded-none sm:rounded-r-[2rem] h-full flex flex-col gap-4 flex-1 justify-center items-center"
  >
    <span class="w-full text-center text-base text-red-900">{{ errorDisplay }}</span>
    <h1 class="font-bold text-3xl text-green-800">Sign in</h1>

    <div class="flex flex-col w-full justify-start items-center">
      <Input
        type="email"
        name="email"
        v-model="email"
        unique="LoginEmail"
        placeholder="hodadis@gmail.com"
      />
      <span class="italic text-sm text-red">{{
        emailError && emailError.toString()
      }}</span>
    </div>
    <div class="flex flex-col w-full justify-start items-center">
      <Input
        type="password"
        name="password"
        v-model="password"
        unique="LoginPassword"
        placeholder="password"
      />
      <span class="italic text-sm text-red">{{ passError && passError.toString() }}</span>
    </div>
    <button
      type="submit"
      class="shadow-md border-2 bg-green-600 font-mono w-[7rem] px-2 py-1 rounded-[1.3rem] text-white"
    >
      <svg
        v-if="loading"
        role="status"
        class="inline w-4 h-4 mr-2 animate-spin"
        viewBox="0 0 100 101"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="#1C64F2"
        />
      </svg>
      SignIn
    </button>
    <div class="relative sm:hidden flex flex-col">
      <span class="text-gray-600">Create Account?</span>
      <button
        type="button"
        @click="change"
        class="text-[1rem] italic text-blue-600 underline"
      >
        SignUp
      </button>
    </div>
  </form>
</template>
