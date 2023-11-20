import Button from './components/Button';
import Header from './components/Header'
import { useState, useEffect } from 'react'
import { formatearDinero,calcularTotalPagar } from "./helpers/index";

function App() {
  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(6)
  const [total, setTotal] = useState(0)
  const [pago, setPago] = useState(0)

  useEffect( () =>{
    const resultadoPagar = calcularTotalPagar(cantidad,meses);
    setTotal(resultadoPagar)
  }, [meses, cantidad]);


  useEffect( () =>{
    //Calular pago
    setPago(total/meses)
  }, [total]);

  const min = 0;
  const max = 20000;
  const step = 100;

  function handleChange(e) {
    setCantidad(parseInt(e.target.value))
  }

  function handleClickDecremento() {
    const valor = cantidad - step;
    if(valor > max){
      alert('Cantidad no valida')
      return
    }
    setCantidad(valor)
  }

  function handleClickIncremento() {
    const valor = cantidad + step;
    if(valor > max){
      alert('Cantidad no valida')
      return
    }
    setCantidad(valor)
  }

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header/>
      <div className='flex justify-between  my-8'>
        <Button operador='-' fn={handleClickDecremento}/>
        <Button operador='+' fn={handleClickIncremento}/>
      </div>


      <input 
        type='range'
        className='w-full h-6 mt-3 bg-gray-200 accent-lime-500 hover:accent-lime-600'
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        value={cantidad}
      />

      <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>{formatearDinero(cantidad)}</p>

      <h2 className='text-2xl font-extrabold text-gray-500 text-center'>Elige un <span className=' text-indigo-600'>Plazo </span> a pagar</h2>
      <select 
        className='mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500'
        onChange={e => setMeses(+e.target.value)}
        value={meses}>
        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>


      </select>

      <div className="my-5 space-x-3 bg-gray-50 p-5">
        <h2 className='text-2xl font-extrabold text-gray-500 text-center'>Resumen <span className='text-indigo-600'> resumen</span> de pagos</h2>

        <p className='text-xl text-gray-500 text-center font-bold'>{meses} Meses</p>
        <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(total)} Total a pagar</p>
        <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(pago)} Pagos Mensuales</p>
      </div>
    </div>
    
  )
}

export default App
