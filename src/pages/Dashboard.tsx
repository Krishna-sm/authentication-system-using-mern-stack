import { Link, useLocation, useNavigate } from "react-router-dom"
import ProtectedLayout from "../layouts/ProtectedLayout"
import { useEffect, useState } from "react"
import LoaderComponent from "../components/LoaderComponent"
import { Alert } from "../components/SwalFire"
import { AxiosClient } from "../utils/AxiosClient"

 

const Dashboard = () => {


  const location = useLocation()
  const navigate = useNavigate()
  const [user,setUser] = useState({
    email:'',
name:''
  })
  const [isLoading,setIsLoading] = useState(true)
   
const fetchUser = async(token:string)=>{
      try {
          const response = await AxiosClient.get("/profile",
            {
              headers:{
                'Authorization':'Bearer '+ token
              }
            }
          )
          const data = await response.data;

          // console.log(data);
          setUser({
            email:data.user.email,
            name:data.user.name
          })
          

          setIsLoading(false)

      } catch (error:any) {
        Alert({
          desc:error.message || error.response.data.message || "something went wrong",
          title:'error',
          icon:'error'
        })
        navigate("/login")
      }finally{
      }
}
  useEffect(()=>{
      const token =localStorage.getItem("auth-token") || ''
      // if(user.email){
      //   setIsLoading(false)
      // }
         if(token){
          fetchUser(token) 
          
          // setIsLoading(false)
        }else{
          navigate("/login")
        }
  },[location])
  if(isLoading){
    return <LoaderComponent/>
  }


  const DeleteAcccount = async()=>{
    try {
      const response = await AxiosClient.delete("/delete-account",
        {
          headers:{
            'Authorization':'Bearer '+ localStorage.getItem("auth-token")
          }
        }
      )  
      const data = await response.data;
      localStorage.removeItem("auth-token")
      setUser({
        email:'',name:''
      })
      Alert({
        desc:data.msg,
        icon:'success',title:'Success'
      })
       

      setIsLoading(false)

  } catch (error:any) {
    Alert({
      desc:error.message || error.response.data.message || "something went wrong",
      title:'error',
      icon:'error'
    })
    navigate("/login")
  }finally{
  }
  }

  const LogoutHandler = async()=>{
    try {
          localStorage.removeItem("auth-token")
          setUser({
            email:'',name:''
          })
          Alert({
            title:'success',
            desc:'Logout Success',
            icon:'success'
          })

          navigate("/login")

    } catch (error:any) {
      Alert({
        desc:error.message || error.response.data.message || "something went wrong",
        title:'error',
        icon:'error'
      })
    }
  }

  return (
    <ProtectedLayout>
              <div className="registration-form">
                <div className="div">
                  <h1>Welcome, {user && user.name}</h1>
                  <h4>Email, {user && user.email}</h4>
                  {/* <button  className="btn btn-dark">Refresh</button> */}
                  <button onClick={LogoutHandler} className="btn btn-danger mr-3 my-4">Logout</button>
                  <Link to={'/profile'}>Update Profile</Link>
      <br />
                  <button onClick={DeleteAcccount} className="btn btn-danger mx-auto mr-3 my-4">Delete Account</button>

                </div>
              </div>
    </ProtectedLayout>
  )
}

export default Dashboard