import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

interface AlertProps{
    title:string
    desc:string
    icon:'error'| 'question'|'success'
}
const MySwal = withReactContent(Swal)
export const Alert =(data:AlertProps)=>{

      return  MySwal.fire({
            title:data.title,
            text:data.desc,
            icon:data.icon,
            showCloseButton:true
        })
}