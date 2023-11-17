import React from 'react'

function Spinner() {
  return (
    

<div role="status" className="max-w-sm animate-pulse">
    <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-800 w-full mb-4"></div>
    <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-800 max-w-[360px] mb-2.5"></div>
    <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-800 mb-2.5"></div>
    <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-800 max-w-[330px] mb-2.5"></div>
    <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-800 max-w-[300px] mb-2.5"></div>
    <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-800 max-w-[360px]"></div>
    <span className="sr-only">Loading...</span>
</div>

  )
}

export default Spinner