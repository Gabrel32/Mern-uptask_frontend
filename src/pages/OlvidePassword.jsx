import { useState } from "react"
import clienteAxios from "../config/clienteAxios"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"

function OlvidePassword() {
  const [email, setEmail] = useState("")
  const [alerta, setAlerta] = useState({})

  async function handleSubmit(e){
    e.preventDefault()

    if (email === "" || email.length < 6) {
      setAlerta({
        msg:"el email es obligatorio",
        error:true
      })
    }

    try{ 
      const {data} = await clienteAxios.post(`/usuarios/olvide-password`,{email})
      setAlerta({
        msg:data.msg,
        error:false
      })
    
    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error:true
      })
    }
  }

  const {msg} = alerta
  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize'>recupera tu acceso y no pierdas tus <span className=' text-gray-800'>proyectos</span></h1>
    {msg && <Alerta alerta={alerta}/>}
    <form onSubmit={handleSubmit} action="" className='my-10 bg-white shadow rounded-lg p-10'>
        
        <div className=' my-5'>
            <label htmlFor="email" className=' uppercase text-gray-700 block text-xl font-bold'>correo</label>
            <input onChange={e=>setEmail(e.target.value)} value={email} id='email' type="text" placeholder='ingresa tu Email' className='w-full mt-3 p-3 border outline-none rounded-xl bg-gray-50'/>
        </div>
       
        <input type="submit" value="Enviar" className={"bg-sky-700 w-full py-3 font-bold uppercase text-white rounded hover:cursor-pointer hover:bg-sky-900 transition-colors"}  />
    </form>

    <nav className='lg:flex lg:justify-between'>
        <Link
        className="block text-center my-5 text-slate-500 capitalize text-sm"
        to={"/registrar"}
        >no tienes una cuenta? registrate</Link>
        <Link
        className="block text-center my-5 text-slate-500 capitalize text-sm"
        to={"/"}
        >ya tienes una cuenta? inicia sesion</Link>
    </nav>
    </>
  )
}

export default OlvidePassword