<script setup>
import "./index.css";
import app from "../src/Axios/axiosconf";
import { useStore } from "vuex";

import { useRouter } from "vue-router";

import { onActivated, onUnmounted, watchEffect } from "@vue/runtime-core";

import { useQuery, useQueryLoading } from "@vue/apollo-composable";
const router = useRouter();
const store = useStore();

const refresh = async () => {
  try {
    const data = await app.get("/user/refresh");

    if (!data.data.name) {
      store.dispatch("setName", "");
      store.dispatch("setToken", data.data.accessToken);

      store.dispatch("setId", "");
      store.dispatch("setEmail", "");
    } else {
      store.dispatch("setName", data.data.name);
      store.dispatch("setToken", data.data.accessToken);

      store.dispatch("setId", data.data.id);
      store.dispatch("setEmail", data.data.email);
    }
  } catch (error) {}
};
let Interval;
const refresh1 = async () => {
  await refresh();
};
watchEffect(() => {
  Interval = setInterval(refresh1, 700000);
});
</script>

<template>
  <router-view />
</template>
