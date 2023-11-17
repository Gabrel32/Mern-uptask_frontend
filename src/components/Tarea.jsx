import React from 'react'
import { formatearFecha } from '../helpers'
import useProyectos from '../hooks/useProyectos'
import useAdmin from '../hooks/useAdmin'

function Tarea({tarea}) {
    const Admin = useAdmin()
    const { handleModalEditarTarea,handleModalEliminarTarea, completarTarea }= useProyectos()

  return (
    <div className=' border-b p-5 flex justify-between items-center flex-col md:flex-row'>
        <div className=' flex flex-col gap-1 text-left w-2/3 capitalize' >
            <p className='text-xl'>{tarea.nombre}</p>
            <p className='text-sm text-gray-500 uppercase'>{tarea.descripcion}</p>
            <p className=' text-sml'>{formatearFecha(tarea.fechaEntrega)}</p>
            <p className=' text-gray-600'>Prioridad: {tarea.prioridad}</p>
            {tarea.estado && <p className='text-sm font-light bg-green-700 p-1 text-white rounded-lg text-center w-2/3'>Completada por: {tarea.completado?.nombre}</p>}
        </div>
        <div className='mt-10 flex gap-3 '>
            {Admin && <button onClick={()=>handleModalEditarTarea(tarea)} className='bg-indigo-600 px-2 py-3 text-white uppercase font-bold text-sm rounded-lg'>editar</button>}
            {Admin && <button onClick={()=>handleModalEliminarTarea(tarea)} className='bg-red-600 px-2 py-3 text-white uppercase font-bold text-sm rounded-lg'>eliminar</button>}            
            
            <button onClick={()=>completarTarea(tarea._id)} className={`${tarea.estado?"bg-green-600":"bg-gray-600"} px-2 py-3 text-white uppercase font-bold text-sm rounded-lg`}>{tarea.estado ?"completa":"incompleta"}</button>
            

        </div>
    </div>
  )
}

export default Tarea