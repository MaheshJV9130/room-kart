import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div>
      <Image src="/loader.gif" alt="loader" width={500} height={500} className='mx-auto mix-blend-multiply'/>
    </div>
  )
}

export default Loader
