<script  setup >
  import Header from './components/Header.vue';


  function handleChange(e){
    console.log(e.target.value);
    
  }
</script>

<template>
  <div class="my-20 max-w-lg mx-auto bg-white shadow p-10">
   <Header/>

   <div class="my-5">
      <input 
        type="Range"
        class="w-full bg-gray-200 accent-lime-500 hover:accent-lime-600"
        @input="handleChange"
        min=""
        max="">
        
   </div>

  </div>
</template>

<style scoped>

</style>
