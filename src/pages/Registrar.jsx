import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"

function Registrar() {
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [alerta, setAlerta] = useState({})

    async function handleSubmit(e){
        e.preventDefault()

        if ([nombre,email,password,password2].includes("")) {
            return setAlerta({
                msg:"todos los campos on obligatorios",
                error:true
            })
        }

        if (password !== password2) {
            return setAlerta({
                msg:"las contraseñas no coinciden",
                error:true
            })
        }

        if (password.length < 6) {
            return setAlerta({
                msg:"la contraseña debe tener como minimo 6 digitos",
                error:true
            })

        }
        setAlerta({})
        setNombre("")
        setEmail("")
        setPassword("")
        setPassword2("")
        
        try {
            const {data} = await clienteAxios.post(`/usuarios`,{nombre,email,password})

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
    <h1 className='text-sky-600 font-black text-6xl capitalize'>registrate y comienza a crear tus <span className=' text-gray-800'>proyectos</span></h1>
    {msg && <Alerta alerta={alerta}/>}
    <form onSubmit={handleSubmit} action="" className='my-10 bg-white shadow rounded-lg p-10'>
    

        <div className=' my-5'>
            <label htmlFor="nombre" className=' uppercase text-gray-700 block text-xl font-bold'>nombre</label>
            <input value={nombre} onChange={e=>setNombre(e.target.value)} id='nombre' type="text" placeholder='ingresa tu nombre' className='w-full mt-3 p-3 border outline-none rounded-xl bg-gray-50'/>
        </div>
        <div className=' my-5'>
            <label htmlFor="email" className=' uppercase text-gray-700 block text-xl font-bold'>correo</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} id='email' type="text" placeholder='ingresa tu Email' className='w-full mt-3 p-3 border outline-none rounded-xl bg-gray-50'/>
        </div>
        <div className=' my-5'>
            <label htmlFor="contraseña" className=' uppercase text-gray-700 block text-xl font-bold'>contraseña</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} id='contraseña' type="password" placeholder='escribe una contraseña' className='w-full mt-3 p-3 border outline-none rounded-xl bg-gray-50'/>
        </div>
        <div className=' my-5'>
            <label htmlFor="repetirContraseña" className=' uppercase text-gray-700 block text-xl font-bold'>repetir contraseña</label>
            <input value={password2} onChange={e=>setPassword2(e.target.value)} id='repetirContraseña' type="password" placeholder='repetir contraseña' className='w-full mt-3 p-3 border outline-none rounded-xl bg-gray-50'/>
        </div>

        <input type="submit" value="Crear usuario" className={"bg-sky-700 w-full py-3 font-bold uppercase text-white rounded hover:cursor-pointer hover:bg-sky-900 transition-colors"}  />
    </form>

    <nav className='lg:flex lg:justify-between'>
        <Link
        className="block text-center my-5 text-slate-500 capitalize text-sm"
        to={"/"}
        >ya tienes una cuenta? inicia sesion</Link>
        <Link
        className="block text-center my-5 text-slate-500 capitalize text-sm"
        to={"/olvide-password"}
        >Olvide mi contraseña</Link>
    </nav>
    </>
  )
}

export default Registrar