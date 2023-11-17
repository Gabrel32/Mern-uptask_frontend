import FormularioColaborador from "../components/FormularioColaborador"
import { useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import { useParams } from "react-router-dom"
import SpinnerColaborares from "../components/SpinnerColaboradores"
import Alerta from "../components/Alerta"

function NuevoColaborador() {
  const {obtenerProyecto, proyecto, cargando, colaborador, agregarColaboradores, alerta } = useProyectos()
  const {id} = useParams()


  useEffect(()=>{
      obtenerProyecto(id)
  },[])

  if (!proyecto?._id) {
    <Alerta alerta={alerta}/>
  }
  return (
    <>
    <h1 className='text-4xl font-black capitalize'>Añadir Colaborador: {cargando ? "cargando" :proyecto.nombre}</h1>

    <div className=' flex justify-center mt-10'>
        <FormularioColaborador/>
    </div>
    {cargando ? <SpinnerColaborares/> : colaborador?._id &&(
      <div className=" flex justify-center mt-10">
        <div className=" bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow ">
          <h2 className=" text-center mb-10 text-2xl font-bold">Resultado:</h2>
          <div className=" flex flex-col md:flex-row justify-between items-center gap-2">
            <p><span className=" ">{colaborador.nombre}</span></p>
            <p>{colaborador.email}</p>
        <button onClick={()=>agregarColaboradores(colaborador.email)} type="button" className=" uppercase text-sm mt-5 w-2/3 bg-sky-600 hover:bg-sky-800 rounded-md shadow text-white font-bold p-2">Agregar al Proyecto</button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default NuevoColaborador