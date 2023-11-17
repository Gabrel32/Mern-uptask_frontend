import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Headers from "../components/Headers"
import SideBar from "../components/SideBar"
import Spinner from "../components/Spinner"

function RutaProtegida() {
    const {auth,cargando} = useAuth()

  return (
    <>
    {auth._id ?(
        <div className=" bg-gray-100">
            <Headers/>
            <div className=" md:flex md:min-h-screen">
                {cargando ? <Spinner/>: (
                    <>
                <SideBar/>
                <main className=" flex-1 p-10">
                    <Outlet/>
                </main>
                    </>
                )}
            </div>
        </div>
    ) : <Navigate to={"/"}/>}
    </>
  )
}

export default RutaProtegida