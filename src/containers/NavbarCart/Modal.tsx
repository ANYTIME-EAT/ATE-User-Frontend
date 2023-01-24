import React, {FC} from 'react'

export interface ModelProps {
  isVisible: boolean;
  closeModal(val: boolean): void;
  children:any
}

const Modal: FC<ModelProps> = ({isVisible, closeModal,children}) => {
    if(!isVisible) return null;

    const handleClose=(e:any)=>{
      // console.log(object)
        if(e.target.id==="wrapper")
          closeModal(true)
    }
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ' >
      {/* onClick={() => closeModal(false)} */}
        <div className='w-[500px] flex flex-col absolute inset-y-16 right-0' id="wrapper" onClick={handleClose}>
            <button className='text-white text-xl place-self-end' onClick={() => closeModal(false)}>x</button>
        <div>{children}</div>
        </div>
    </div>
  )
}

export default Modal
