<script  setup >
  import {computed, ref, watch} from 'vue'
  import Header from './components/Header.vue';
  import Button from './components/Button.vue'
  import {calcularTotalPagar} from './helpers'

  const cantidad = ref(10000);
  const meses = ref(6)
  const total = ref(0);
  const min = 0;
  const max = 20000;
  const step = 100;

  const formatearDinero = (valor)=>{
    const formatter = new Intl.NumberFormat('en-US',{
      style: 'currency',
      currency: 'USD'
    });

    return formatter.format(valor)
  };

  watch([cantidad,meses,],()=>{
    total.value = calcularTotalPagar(cantidad.value,meses.value);
  })

  const pagoMensual = computed(() => {
    return total.value/meses.value
  })

  const handeButtonIncrementar = () =>{
    const valor = cantidad.value + step
    
    if(valor > max ){
      alert('Cantidad no valida')
      return
    }

    cantidad.value =valor;
  }
  const handeButtonDecrementar = () =>{
    const valor = cantidad.value - step
    
    if(valor < min ){
      alert('Cantidad no valida')
      return
    }

    cantidad.value = valor;
  }

</script>

<template>
  <div class="my-20 max-w-lg mx-auto bg-white shadow p-10">
   <Header/>


   <div class="flex justify-between mt-10">
     <Button
       :operador="'-'"  
       @fn="handeButtonDecrementar"
     />
    <Button
      :operador="'+'"
      @fn="handeButtonIncrementar"
    />

    

   </div>
   <div class="my-5">
      <input 
        type="Range"
        class="w-full bg-gray-200 accent-lime-500 hover:accent-lime-600"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="cantidad"
        
        >
      </div>
      
      <p class="text-center my-10 text-5xl font-extrabold text-indigo-600">{{formatearDinero(cantidad)}}</p>
      
      <h2 class="text-2xl font-extrabold text-gray-500 text-center">Elige un <span class="text-indigo-600">Plazo</span> a pagar</h2>
      <select
       class="w-full mt-5 p-2 bg-white border border-gray-300 rounded-lg text-center text-xl
       font-bold text-gray-500"
       :value="meses"
       v-model.number="meses"
       >
        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>

      </select>

      <div v-if="total>0" class="my-5 space-y-3 bg-gray-50 p-5">
        <h2 class="text-2xl font-extrabold text-gray-500 text-center">
          Resumen <span class="text-indigo-600">de pagos</span>      
        </h2>
        <p class="text-xl text-gray-500 text-center font-bold">{{ meses }} Meses</p>
        <p class="text-xl text-gray-500 text-center font-bold">Total a pagar: {{ formatearDinero(total)}}</p>
        <p class="text-xl text-gray-500 text-center font-bold">Mensuales: {{ formatearDinero(pagoMensual) }}</p>
        
      </div>
      <p v-else  class="text-center mt-2 text-xl text-gray-500 font-bold">Añade una cantidad y un plazo para pagar</p>
  </div>
</template>

<style scoped>

</style>
