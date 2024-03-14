import { Close } from '@mui/icons-material'
import React from 'react'

const Image = ({ImageUrl ,showImage , setShowImage}) => {
  return (
    <>
    <div className='image absolute center'>
    <Image src={ImageUrl} alt="profile" className="w-14 rounded-full" />
    <button className='absolute top-0 right-0' onClick={() => setShowImage(false)}> <Close/></button>
    </div>
    </>
  )
}

export default Image