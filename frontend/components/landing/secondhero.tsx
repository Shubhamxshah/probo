import React from 'react'
import PhoneVideo from './phone'
import SelectTab from './selecttab'


const SecondHero = () => {
  return (
      <div className='bg-black/90 h-3/5 flex'>
        <SelectTab />
        <div className='pr-96 pt-6 pb-6'>
        <div className='pr-20'>
          <PhoneVideo />
        </div>
      </div>
      </div>
  )
}

export default SecondHero
