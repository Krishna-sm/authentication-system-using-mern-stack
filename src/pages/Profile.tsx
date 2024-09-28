 
import SubmitButton from "../components/SubmitButton"
import * as yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Alert } from "../components/SwalFire"
import { FiArrowLeft } from "react-icons/fi"
import ProtectedLayout from "../layouts/ProtectedLayout"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { AxiosClient } from "../utils/AxiosClient"
 
const Profile = () => {
    type ProfileType={
      name:string
      email:string  
    }
    const [isLoading,setIsLoading] = useState(false)

    const initials:ProfileType={
      name:'',
      email:'' 
    }
    const validationSchema = yup.object({
      name:yup.string().required("Name is required"),
      email:yup.string().email("Email must be valid").required("Email is required") 
    })
    const navigate = useNavigate()

    const onSubmitHandler = async(e:ProfileType,{resetForm}:any)=>{
      setIsLoading(true)
      try { 
        const response = await AxiosClient.put('/update-profile',e,{
          headers:{
            'Authorization':'Bearer '+ localStorage.getItem("auth-token")
          }
        });
        const data =await response.data;

      
      Alert({
        desc:data.msg,
        icon:'success',title:'Success'
      })
          resetForm()
        } catch (error:any) {
          Alert({
            desc:error.message,
            icon:'error',title:'Error'
          })
        }
          
    }

  return (
    <ProtectedLayout>
        <div className="registration-form">
  <Formik  onSubmit={onSubmitHandler} validationSchema={validationSchema} initialValues={initials} >
    <Form >
          <button onClick={()=>navigate(-1)} className="btn rounded-3 py-2 btn-dark" ><FiArrowLeft/> Back</button>
    <div className="form-icon">
      <span><i className="icon icon-user" /></span>
    </div>
    <div className="form-group">
      <Field name="name" type="text" className="form-control item" id="Name" placeholder="User Name" />
        <ErrorMessage name="name" className="text-sm text-danger"  component={'p'}/>
    </div>
    <div className="form-group">
      <Field name="email" type="email" className="form-control item" id="username" placeholder="Email Address" />
        <ErrorMessage name="email" className="text-sm text-danger"  component={'p'}/>
    </div>
 
   
    <div className="form-group">
     <SubmitButton isLoading={isLoading} type="submit" value="Update Profile"  />
    </div>
   
    </Form>
  </Formik>
 
</div>

    </ProtectedLayout>
  )
}

export default Profile