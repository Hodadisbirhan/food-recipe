import {createStore}  from "vuex";

const store = createStore({
state:{
name:"",
email:"",
id:"",
accessToken:"",

},
mutations:{
setUserName(state,value){

state.name = value;

},
setId(state,value){

    state.id = value;
    
    }
    ,setAccessToken(state,value){

        state.accessToken = value;
        
        },
    setEmail(state,value){

        state.email = value;
        
        }


},
getters:{
    getName({name}){

    return name;

    },

    getEmail({email}){

        return email;
    
        },
        getID({id}){

            return id;
        
            },
getAccessToken(context){

    return context.accessToken;
}


},
actions:{

    setName({commit},name){

        commit("setUserName",name);


    },
    setEmail({commit},email){

        commit("setEmail",email);


    },
    setId({commit},id){

        commit("setId",id);


    },
    setToken({commit},token){
        commit("setAccessToken",token);


    }

}


})

export default store;
