<template>
 <div class="w-full h-full justify-center items-center flex relative" >
   <img src="../assets/pagenotfound.png" class=" absolute top-1 bottom-1 right-0 left-0" alt="notfound"/>
   <button class="w-16 h-8 bg-slate-900 text-center drop-shadow-xl" @click="home">Back To HOme</button>


 </div>
</template>
<script>
import {useRouter} from "vue-router";
const router = useRouter();

const home=()=>{


router.replace('/');

}


</script>


