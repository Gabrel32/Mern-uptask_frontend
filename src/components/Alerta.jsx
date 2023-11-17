import React from 'react'

function Alerta({alerta}) {
  return (
    <div className={`${alerta.error ? " from-red-400 to-red-700" : "from-blue-400 to-sky-800"} bg-gradient-to-br text-center p-3 font-bold rounded-md uppercase text-white text-sm my-10`}>
        {alerta.msg}
    </div>
  )
}

export default Alerta