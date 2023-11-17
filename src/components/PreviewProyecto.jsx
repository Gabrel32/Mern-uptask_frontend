import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function PreviewProyecto({proyecto}) {
    const {auth} = useAuth()
    
    const {nombre, _id, cliente, creador} = proyecto




  return (
    <div className=' border-b p-5 flex justify-evenly capitalize'>
        <p className='flex-1'>
            {nombre} 
            <span className=' text-sm text-gray-500 uppercase' >
                {" "} 
                {cliente}
            </span>
        </p>
        <div className='flex flex-col md:flex-row justify-evenly items-center gap-1'>
            <div className=' mx-3 flex items-center gap-3 justify-between'>
                {auth._id !== creador ?<p className='p-1 text-xs rounded-lg text-white bg-sky-600 font-bold uppercase'>colaborador</p > :<p className='p-1 text-xs rounded-lg text-white bg-green-600 font-bold uppercase'>creador</p>}
            </div>
            <Link className=' text-gray-600 hover:text-gray-800 uppercase text-sm font-bold' to={`${_id}`}>
                ver proyectos
            </Link>
        </div>
    </div>
  )
}

export default PreviewProyecto