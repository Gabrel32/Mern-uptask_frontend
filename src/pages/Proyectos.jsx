import useAuth from "../hooks/useAuth"
import useProyectos from "../hooks/useProyectos"
import PreviewProyecto from "../components/PreviewProyecto";
import Alerta from "../components/Alerta";
import io from "socket.io-client"
import { useEffect } from "react";

let socket;

function Proyectos() {

  useEffect(()=>{
    socket = io(import.meta.env.VITE_BACKEND_URL)
  })  
  const {proyectos,obtenerProyectos, alerta} = useProyectos()

  const {msg} = alerta

  obtenerProyectos()

  return (
    <>
        <h1 className='text-4xl font-black'>Proyectos</h1>
        {msg && <Alerta alerta={alerta}/>}
        <div className=" bg-white shadow mt-10 rounded-lg ">
            {proyectos.length ?(
              proyectos.map(e=>(<PreviewProyecto key={e._id} proyecto={e}/>))
            ) : <p className=" p-5 text-center text-gray-600 uppercase"> no tienes proyectos aun comienza creando!</p>}
        </div>
    </>
  )
}

export default Proyectos