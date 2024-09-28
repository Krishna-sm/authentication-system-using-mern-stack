import  { ButtonHTMLAttributes } from 'react'
import { CgSpinner } from 'react-icons/cg'


interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    isLoading?:boolean
    value:string
    
}

const SubmitButton = (props:SubmitButtonProps) => {
  return (
    <>
         <button disabled={props.isLoading} {...props}   className="btn btn-block create-account d-flex align-items-center justify-content-center gap-2">{props.value}
           {props.isLoading&& <CgSpinner className='animate-spin' /> }

         </button>
    </>
  )
}

export default SubmitButton