<template>
  <div class="w-full">
    <header
      class="flex drop-shadow-lg bg-slate-100 fixed top-0 w-full h-14 justify-between items-center pl-[5%] pr-[10%] z-50"
    >
      <div class="text-2xl font-extrabold text-gray-700">Food Recipe</div>
      <nav class="flex justify-end">
        <ul
          ref="navigator"
          class="list-none h-screen divide-y divide-blue-200 md:divide-y-0 items-center md:h-full pt-16 md:pt-0 z-30 bg-slate-100 text-black flex-col gap-2 overflow-hidden fixed top-0 right-0 left-[120%] md:static duration-300 md:duration-[0ms] md:gap-5 md:flex-row flex"
        >
          <li
            @click="removeNavigator"
            v-for="item in pathes"
            class="cursor-pointer w-fit md:w-fit text-center relative before:content-[''] before:absolute before:right-1/2 before:left-1/2 before:bottom-0 text-yellow-600 before:h-[2px] before:bg-gray-700 before:duration-500 focus:before:right-0 focus:before:left-0 hover:before:right-0 hover:before:left-0"
            :key="item"
          >
            <router-link :to="item.path" class="text-gray-700 font-semibold text-lg">
              {{ item.name }}
            </router-link>
          </li>

          <li
            v-if="!loginOut"
            class="cursor-pointer w-fit md:w-fit text-center relative before:content-[''] before:absolute before:right-1/2 before:left-1/2 before:bottom-0 text-yellow-600 before:h-[2px] before:bg-gray-700 before:duration-500 focus:before:right-0 focus:before:left-0 hover:before:right-0 hover:before:left-0"
          >
            <router-link to="authentication" class="text-gray-700 font-semibold text-lg">
              LogIn
            </router-link>
          </li>

          <li
            v-if="loginOut"
            class="cursor-pointer w-fit md:w-fit text-center relative before:content-[''] before:absolute before:right-1/2 before:left-1/2 before:bottom-0 text-yellow-600 before:h-[2px] before:bg-gray-700 before:duration-500 focus:before:right-0 focus:before:left-0 hover:before:right-0 hover:before:left-0"
          ></li>
        </ul>

        <span
          v-if="loginOut"
          @click="show_drop"
          class="border-[1px] cursor-pointer bg-slate-400 text-center align-middle mr-8 md:ml-5 md:mr-0 text-2xl text-white w-8 h-8 font-mono rounded-full"
          >{{ loginOut && loginOut.toUpperCase().charAt(0) }}</span
        >

        <div
          v-if="loginOut"
          v-show="show_profile"
          ref="profile_value"
          class="w-44 fixed top-16 justify-around items-center right-1 h-36 drop-shadow-2xl shadow-2xl z-50 bg-white flex flex-col rounded-md"
        >
          <span class="text-lg text-center text-gray-600 border-2 w-8 h-8 rounded-full">{{
            loginOut && loginOut.toUpperCase().charAt(0)
          }}</span>
          <div class="flex flex-col items-center">
            <span class="text-base text-gray-600">{{ useState.state.name }}</span>
            <span class="text-sm text-gray-600">{{ useState.state.email }}</span>
          </div>
          <button
            @click="logout_event"
            class="shadow-lg drop-shadow-lg px-3 text-white rounded-md bg-green-700 font-semibold text-lg"
          >
            LogOut
          </button>
        </div>
      </nav>

      <div
        v-if="bool"
        @click="burger"
        class="w-8 absolute right-[5%] top-5 z-50 flex gap-1 flex-col md:hidden"
      >
        <div ref="bre_one" class="w-6 h-[0.2rem] duration-300 bg-green-900"></div>
        <div ref="bre_two" class="w-6 h-[0.2rem] bg-green-900"></div>
        <div ref="bre_three" class="w-6 h-[0.18rem] duration-300 bg-green-900"></div>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed, onMounted, onUnmounted, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";
import app from "../Axios/axiosconf";
const bre_one = ref(null);
const bre_two = ref(null);
const bre_three = ref(null);
const navigator = ref(null);
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
const burger = () => {
  if (bre_one.value.classList.contains("rotate-45")) {
    bre_one.value.classList.remove("rotate-45");
    bre_two.value.classList.add("duration-300");
    bre_two.value.classList.remove("invisible");
    bre_three.value.classList.remove("-rotate-45");
    navigator.value.classList.remove("left-0");
    navigator.value.classList.add("left-[120%]");
    bre_three.value.classList.remove("translate-y-[-6px]");
    bre_one.value.classList.remove("translate-y-[8px]");
  } else {
    bre_one.value.classList.add("rotate-45");
    bre_two.value.classList.remove("duration-300");
    bre_one.value.classList.add("translate-y-[8px]");
    bre_two.value.classList.add("invisible");
    bre_three.value.classList.add("translate-y-[-6px]");

    bre_three.value.classList.add("-rotate-45");

    navigator.value.classList.remove("left-[120%]");
    navigator.value.classList.add("left-0");
  }
};
const profile_value = ref(null);
const show_profile = ref(false);

onMounted(() => {
  document.addEventListener("click", (e) => {
    if (loginOut) {
      const events = e.target;
      if (events == profile_value) {
        if (show_profile) {
          show_profile.value = false;
        }
      }
    }
  });
});

const show_drop = () => {
  show_profile.value = !show_profile.value;
};

const useState = useStore();

const bool = ref(true);

const resize = () => {
  if (window.innerWidth > 767) {
    bool.value = false;
    if (navigator.value.classList.contains("left-0")) {
      navigator.value.classList.remove("left-0");
      navigator.value.classList.add("left-[120%]");
    }
  } else {
    bool.value = true;
  }
};
const login = ref(useState.state.name);

const pathes = [
  { path: "/", name: "Home" },
  { path: "recipe", name: "createRecipe" },
  { path: "bookMarks", name: "BookMark" },
  {
    path: "YourRecipe",
    name: "myRecipe",
  },
];
watchEffect(() => {
  login.value = useState.getters.getName;
});
const loginOut = computed({
  get() {
    return login.value;
  },
});

window.addEventListener("resize", resize);
onUnmounted(() => {
  window.removeEventListener("resize", resize);
});

const logout_event = async () => {
  show_profile.value = !show_profile.value;
  try {
    const data = await app.get("/user/logout");
    if (data.data.clear == "successfully") {
      store.dispatch("setToken", data.data.accessToken);
      store.dispatch("setId", "");
      store.dispatch("setEmail", "");
      store.dispatch("setName", "");
      router.push("/");
    }
  } catch (e) {}
};

const removeNavigator = () => {
  if (window.innerWidth <= 767) {
    if (bre_one.value && bre_one.value.classList.contains("rotate-45")) {
      bre_one.value.classList.toggle("rotate-45");
      bre_two.value.classList.toggle("duration-300");
      bre_two.value.classList.toggle("invisible");
      bre_three.value.classList.toggle("-rotate-45");
      navigator.value.classList.toggle("left-0");
      navigator.value.classList.toggle("left-[120%]");
      bre_three.value.classList.toggle("translate-y-[-6px]");
      bre_one.value.classList.toggle("translate-y-[8px]");
    }
  }
};
</script>
