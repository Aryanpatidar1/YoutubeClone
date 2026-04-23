import React from 'react'

const Button = ({ text }) => {
  return (
    <div className='inline-block px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 cursor-pointer mr-3 transition-colors duration-200 whitespace-nowrap' > 
      {text}
    </div >
  )
}

export default Button