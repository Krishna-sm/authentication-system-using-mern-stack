import { Link, useNavigate } from "react-router-dom"
import SubmitButton from "../components/SubmitButton"
import * as yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Alert } from "../components/SwalFire"
import { AxiosClient } from "../utils/AxiosClient"
import { useState } from "react"
 
const Login = () => {
    type LoginType={
      email:string 
      password:string
    }
const navigate = useNavigate()
const [isLoading,setIsLoading] = useState(false)

    const initials:LoginType={
      email:'',
      password:''
    }
    const validationSchema = yup.object({
      email:yup.string().email("Email must be valid").required("Email is required"),
      password:yup.string().required("Password is required")
    })

    const onSubmitHandler = async(e:LoginType,{resetForm}:any)=>{
      setIsLoading(true)
        try { 
          const response = await AxiosClient.post('/login',e);
          const data =await response.data;

        
        Alert({
          desc:data.msg,
          icon:'success',title:'Success'
        })

        localStorage.setItem("auth-token",data.token);

        resetForm()
        navigate("/")
         
        } catch (error:any) {
          Alert({
            desc: error.response.data.error ||error.message,
            icon:'error',title:'Error'
          })
        }finally{
          setIsLoading(false)
        }
          
    }

  return (
    <>
        <div className="registration-form">
  <Formik  onSubmit={onSubmitHandler} validationSchema={validationSchema} initialValues={initials} >
    <Form >
    <div className="form-icon">
      <span><i className="icon icon-user" /></span>
    </div>
    <div className="form-group">
      <Field name="email" type="email" className="form-control item" id="username" placeholder="Email Address" />
        <ErrorMessage name="email" className="text-sm text-danger"  component={'p'}/>
    </div>
    <div className="form-group">
      <Field name="password" type="password" className="form-control item" id="password" placeholder="Password" />
      <ErrorMessage name="password" className="text-sm text-danger" component={'p'} />

    </div>
   
    <div className="form-group">
     <SubmitButton isLoading={isLoading} type="submit" value="Login"  />
    </div>
    <div className="mb-3 form-group d-flex justify-content-end">
      <Link to={'/register'}>Create Account ?</Link>
    </div>
    </Form>
  </Formik>
  <div className="social-media">
    <h5>Sign up with social media</h5>
    <div className="social-icons">
      <a href="#"><i className="icon-social-facebook" title="Facebook" /></a>
      <a href="#"><i className="icon-social-google" title="Google" /></a>
      <a href="#"><i className="icon-social-twitter" title="Twitter" /></a>
    </div>
  </div>
</div>

    </>
  )
}

export default Login