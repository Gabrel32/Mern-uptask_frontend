import {useState,useEffect} from "react"
import {useParams,Link} from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"



function ConfirmarCuenta() {
  const {id} = useParams()

  const [alerta, setAlerta] = useState({})

  useEffect(()=>{
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`
        const {data} = await clienteAxios(url)
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
    confirmarCuenta()
  },[])

  const {msg,error} = alerta

  return (
    <> 
    <h1 className="text-sky-600 font-black text-6xl capitalize">confirma tu cuenta y comienza a crear tus <span className="text-slate-800">proyectos</span></h1>
    <div className="mt-20 md:mt-10 shadow-lg px-5 py-10">
      {msg && <Alerta alerta={alerta}/>}
      {error ? <Link 
        className="block text-center my-5 text-slate-600 capitalize text-xl" 
        to={"/registrar"
        }>registrate</Link>
      
      
        :<Link
          className="block text-center my-5 text-sky-600 capitalize text-xl"
          to={"/"}
          >felicidades ya tienes una cuenta inicia sesion</Link>}
    </div>
    </>
  )
}

export default ConfirmarCuenta