


import { watchEffect } from 'vue';

 import appp from "../src/Axios/axiosconf";

import App from "./App.vue";
import "./index.css";
import router from "./routes/";
import store from "./state/stateStore"
import gql from "graphql-tag";

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://foodrecipeapp.hasura.app/v1/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = store.state.accessToken;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}`: "",
    }
  };
});

 
       const refresh = async () => {
            const data = await appp.get("/user/refresh")
            if(data.data){
             
                store.dispatch("setToken",data.data.accessToken)
                store.dispatch("setName",data.data.name);
                store.dispatch("setEmail",data.data.email);
                store.dispatch("setId",data.data.id);
                const client = new ApolloClient({
                    link: authLink.concat(httpLink),
                    cache: new InMemoryCache(),
                  });
                const app = createApp({
                    setup() {
                      provide(DefaultApolloClient, client);
                    },
                
                    render: () => h(App),
                  });
                  app.use(router);
                  app.use(store);
                  app.mount("#app");
            }
    
        }
        const refresh1 = async () => {
          
            await refresh();
           
       };
       refresh1()
      
