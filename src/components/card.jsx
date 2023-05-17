import React from 'react'

const Card = ({children}) => {
  return (
    <div className='py-10 px-20 background bg-cyan-300 text-2xl' >
        {children}
    </div>
  )
}

export default Card