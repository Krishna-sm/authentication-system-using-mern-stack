import React, { useEffect, useState } from 'react'
import LoaderComponent from '../components/LoaderComponent'
import { useLocation, useNavigate } from 'react-router-dom'

const ProtectedLayout = ({children}:{children:React.ReactNode}) => {

    const [isLoading,setIsLoading] = useState(true)
   

    const location = useLocation()
    const navigate = useNavigate()
    useEffect(()=>{
        const token =localStorage.getItem("auth-token") || ''
          if(token){
            setIsLoading(false)
          }else{
            navigate("/login")
          }
    },[location])
    if(isLoading){
      return <LoaderComponent/>
    }

  return (
    <>
            {children}
    </>
  )
}

export default ProtectedLayout