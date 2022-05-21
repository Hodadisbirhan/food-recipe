<template>
 <div class="w-full h-full justify-center items-center flex relative" >
   <span class="text-center w-full text-black text-3xl font-bold">404 PAGE NOT FOUND</span>
   <button class="w-36 h-8  bg-slate-900 text-white rounded-md text-center drop-shadow-xl" @click="home">Back To HOme</button>


 </div>
</template>
<script>
import {useRouter} from "vue-router";
const router = useRouter();

const home=()=>{


router.replace('/');

}


</script>


