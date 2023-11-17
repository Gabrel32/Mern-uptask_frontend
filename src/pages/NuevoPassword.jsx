import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

function NuevoPassword() {

  const [password, setPassword] = useState("")
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [passwordModificado, setPasswordModificado ] = useState(false)

  const params = useParams()
  const {token} = params
  useEffect(()=>{
    const comprobarToken = async ()=>{
      try {
        const {data} = await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg:error.response.data.msg,
          error:true
        })
      }
    }
    comprobarToken()
  },[])

  async function handleSubmit(e){
    e.preventDefault()
    
    if (password.length < 6) {
      setAlerta({
        msg:"la contraseña debe de ser minimo de 6 caracteres",
        error:true
      })
      return
    }

    try {
      const {data} = await clienteAxios.post(`/usuarios/olvide-password/${token}`,{password})
      setAlerta({
        msg:data.msg,
        error:false
      })
      setPasswordModificado(true)
      setPassword("")

    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error:true
      })
    }

  }

  const {msg}= alerta
  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize'>reestablece tu contraseña y no pierdas acceso a tus <span className=' text-gray-800'>proyectos</span></h1>

    {msg && <Alerta alerta={alerta}/>}

    {tokenValido && (
      <>
      <form onSubmit={handleSubmit} action="" className='my-10 bg-white shadow rounded-lg p-10'>
        
        <div className=' my-5'>
            <label htmlFor="contraseña" className=' uppercase text-gray-700 block text-xl font-bold'>contraseña</label>
            <input onChange={e=>setPassword(e.target.value)} value={password} id='contraseña' type="password" placeholder='escribe tu nueva contraseña' className='w-full mt-3 p-3 border outline-none rounded-xl bg-gray-50'/>
        </div>

        <input type="submit" value="Guardar" className={"bg-sky-700 w-full py-3 font-bold uppercase text-white rounded hover:cursor-pointer hover:bg-sky-900 transition-colors"}  />
    </form>

    
      </>
    )}
    {passwordModificado && (
    <nav className='flex justify-center'>
        <Link
        className="block text-center my-5 text-slate-500 capitalize text-lg"
        to={"/"}
        >inicia sesion</Link>
    </nav>

    )}
    </>
  )
}

export default NuevoPassword