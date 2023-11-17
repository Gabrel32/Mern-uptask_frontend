import { useState,useEffect } from "react"
import Alerta from "./Alerta"
import useProyectos from "../hooks/useProyectos"
import { useParams, } from "react-router-dom"

function FormularioProyecto() {

    const params = useParams()

    const {alerta, mostrarAlerta,submitProyecto,proyecto} = useProyectos()

    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [fechaEntrega, setFechaEntrega] = useState("")
    const [cliente, setCliente] = useState("")


    useEffect(()=>{
        if (params.id) {
            setId(params.id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split("T")[0])
            setCliente(proyecto.cliente)
        }
    },[params])
    async function handleSubmit(e){
        e.preventDefault()

        if ([nombre,descripcion,fechaEntrega,cliente].includes("")) {
            mostrarAlerta({
                msg:"todos los campos son obligatorios",
                error:true
            })
            return
        }

        await submitProyecto({id,nombre,descripcion,fechaEntrega,cliente})
        
        setId(null)
        setNombre("")
        setDescripcion("")
        setFechaEntrega("")
        setCliente("")


    }

    const {msg} = alerta

  return (
    <>
    <form onSubmit={handleSubmit} className=' bg-white py-10 px-5 md:w-1/2 rounded-md shadow '>
    {msg && <Alerta alerta={alerta}/>}
        <div className=" mb-5">
            <label 
            htmlFor="nombre"
            className=' text-gray-700 uppercase font-bold text-sm'
            >Nombre del Proyecto</label>
            <input 
            type="text" 
            id="nombre" 
            className=' border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='Nombre del Proyecto'
            value={nombre}
            onChange={e=>setNombre(e.target.value)}
            />
        </div>
        <div className=" mb-5">
            <label 
            htmlFor="descripcion"
            className=' text-gray-700 uppercase font-bold text-sm'
            >Descripcion del Proyecto</label>
            <textarea 
            type="text" 
            id="descripcion" 
            className=' border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='descripcion del Proyecto'
            value={descripcion}
            onChange={e=>setDescripcion(e.target.value)}
            />
        </div>
        <div className=" mb-5">
            <label 
            htmlFor="fechaEntrega"
            className=' text-gray-700 uppercase font-bold text-sm'
            >Fecha de Entrega del Proyecto</label>
            <input 
            type="date" 
            id="fechaEntrega" 
            className=' border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='fecha del Proyecto'
            value={fechaEntrega}
            onChange={e=>setFechaEntrega(e.target.value)}
            />
        </div>
        <div className=" mb-5">
            <label 
            htmlFor="cliente"
            className=' text-gray-700 uppercase font-bold text-sm'
            >Cliente del Proyecto</label>
            <input 
            type="text"
            id="cliente" 
            className=' border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='Cliente del Proyecto'
            value={cliente}
            onChange={e=>setCliente(e.target.value)}
            />
        </div>

        <input type="submit" value={`${params.id ? "guardar cambios " : "crear proyecto"}`} className=" bg-sky-600 w-full p-3 uppercase text-white font-bold rounded cursor-pointer hover:bg-sky-700 transition-colors" />
    
    </form>
    </>
  )
}

export default FormularioProyecto