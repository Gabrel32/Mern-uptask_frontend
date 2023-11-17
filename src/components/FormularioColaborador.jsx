import React, { useState } from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'


function FormularioColaborador() {

  const {alerta , mostrarAlerta, submitColaborador} = useProyectos()
  const [email,setEmail] = useState("")

  const handleSubmit = async e =>{
    e.preventDefault()
    
    if (email === "") {
      mostrarAlerta({
        msg:"todos los campos son obligatorios",
        error: true
      })
      return
    }

     await submitColaborador(email)
  }


  const {msg} = alerta 
  return (
    <form onSubmit={handleSubmit} className=' bg-white py-10 px-5 w-full md:w-2/3 rounded-lg shadow'>
        {msg && <Alerta alerta={alerta}/>}
      <div className=' mb-5'>
          <label htmlFor="email" className=' text-gray-700 uppercase font-bold text-sm'>email del colaborador</label>
          <input className='border-2 w-full p-2  mt-2 placeholder-gray-400 text-center md:text-left rounded-md' onChange={e=>setEmail(e.target.value)} value={email} type="email" id="email" placeholder='ingresa el email del colaborador' />
      </div>
      <input type="submit" value={"buscar colaborador"} className=' bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md' />
    </form>
  )
}

export default FormularioColaborador