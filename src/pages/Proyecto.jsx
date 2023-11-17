import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import { useEffect, useState } from "react"
import Spinner from "../components/Spinner"
import { Link } from "react-router-dom"
import ModalFormularioTarea from "../components/ModalFormularioTarea"
import ModalEliminarTarea from "../components/ModalElimiarTarea"
import Tarea from "../components/Tarea"
import Alerta from "../components/Alerta"
import Colaborador from "../components/Colaborador"
import ModalEliminarColaborador from "../components/ModalEliminarColaborador"
import useAdmin from "../hooks/useAdmin"
import io from "socket.io-client"
let socket;


function Proyecto() {
  const {obtenerProyecto,proyecto,cargando,handleModalTarea, alerta, submitTareasProyecto,eliminarTareaProyecto,actualizarTareaProyecto,cambiarEstadoProyecto} = useProyectos()

  const Admin = useAdmin()

  const [modal, setModal] = useState(false)

  const {id} = useParams()
  
  useEffect(()=>{
    obtenerProyecto(id)
  },[])

  useEffect(()=>{
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit("abrir proyecto", id)
  },[])

  useEffect(()=>{
    socket.on("tarea agregada",tareaNueva=>{
      if (tareaNueva.proyecto === proyecto._id) {
        submitTareasProyecto(tareaNueva)
      }
    })
    socket.on("tarea eliminada", tareaEliminada=>{
      if (tareaEliminada.proyecto === proyecto._id) {
        eliminarTareaProyecto(tareaEliminada)
      }
    })
    socket.on("tarea actualizada", tareaActualizada=>{
      if (tareaActualizada.proyecto._id === proyecto._id) {
        actualizarTareaProyecto(tareaActualizada)
      }
    })
    socket.on("tarea completada",tareaCompletada=>{
      if (tareaCompletada.proyecto._id === proyecto._id) {
        cambiarEstadoProyecto(tareaCompletada)
      }
    })
  })


  const {msg} = alerta

  return (
  <>
    {cargando ? <Spinner/> :(<>
    <div className="flex justify-between items-center">
        <h1 className=" font-black text-4xl">{proyecto.nombre}</h1>
        {Admin && <div className=" flex gap-2 text-gray-400 hover:text-gray-700">
        <Link 
        className=" flex uppercase font-bold flex-row-reverse items-center"
        to={`/proyectos/editar/${id}`}>Editar
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
        </Link>
        </div>}

    </div>
    {Admin && <button onClick={()=>handleModalTarea()} type="button" className=" flex gap-2 justify-center items-center mt-10 text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
      nueva tarea
    </button>}
      <p className="font-bold text-xl mt-10">Tareas del Proyecto</p>
      <div className="flex justify-center">
        <div className=" w-full md:w-1/2" >
        </div>
      </div>
      <div className=" bg-white shadow mt-10 rounded-lg">
        {proyecto.tareas?.length ?(
          proyecto.tareas?.map(e=><Tarea key={e._id} tarea={e}/>)

        ):<p className=" text-center my-5 p-10 ">No hay Tareas en este Proyecto</p>}
      </div>

      {Admin && <div className=" flex items-center justify-between mt-10">
        <p className=" font-bold text-xl">Colaboradores</p>
        <Link className=" text-gray-500 uppercase font-bold hover:text-gray-700" to={`/proyectos/nuevo-colaborador/${proyecto._id}`}>
        Añadir</Link>
      </div>}

      {Admin && <div className=" bg-white shadow mt-10 rounded-lg">
        {proyecto.colaboradores?.length ?(
          proyecto.colaboradores?.map(e=><Colaborador key={e._id} colaborador={e}/>)

        ):<p className=" text-center my-5 p-10 ">No hay Colaboradores en este Proyecto</p>}
      </div>}
    
    <ModalFormularioTarea />
    <ModalEliminarTarea/>
    <ModalEliminarColaborador/>
    </>
    )}
  </>
  )
}

export default Proyecto