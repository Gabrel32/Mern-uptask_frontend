import { Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Busqueda from "./Busqueda"
import { useLocation } from "react-router-dom"
import ModalCerrarSesion from "./ModalCerrarSesion"

function Headers() {
  const location = useLocation()
  const {handelBuscador,handleCerrarSesion} = useProyectos()

  
  return (
    <header className='px-4 py-5 bg-white border-b'>
        <div className='md:flex md:justify-between'>
            <h2 className=' text-4xl text-sky-600 font-black text-center mb-5 md:mb-0'>UpTask</h2>
            <div className="flex items-center gap-4 flex-col md:flex-row">
            { location.pathname === "/proyectos" && <button type="button" className=" flex gap-1 font-bold uppercase p-2 bg-sky-700 rounded-lg text-white" onClick={handelBuscador}>
              buscar proyecto
              <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>}
            <div className=" flex items-center flex-row gap-2">
            <Link to={"/proyectos"} className=" font-bold uppercase">Proyectos</Link>
            <button className="text-white text-sm bg-sky-600 px-3 py-2 rounded-md capitalize font-bold" type="button" onClick={handleCerrarSesion}>Cerrar Sesion</button>
            </div>
          </div>
        </div>
        <Busqueda/>
        <ModalCerrarSesion/>
    </header>
  )
}

export default Headers