import useProyectos from "../hooks/useProyectos"

function Colaborador({colaborador}) {
    const {handelEliminarColaborador} = useProyectos()
  return (
    <div className=' border-b p-5 gap-2 flex pq:flex-row justify-end md:justify-between items-center flex-col'>
        <div>
            <p>{colaborador.nombre}</p>
            <p>{colaborador.email}</p>
        </div>
        <div>
            <button onClick={()=>handelEliminarColaborador(colaborador)} type="button" className=' bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg' >eliminar</button>
        </div>
    </div>
  )
}

export default Colaborador