import { useNavigate } from "react-router-dom"

export default function Meet(){
    const navigate = useNavigate()
    return <div onClick={()=> navigate('/')} style={{fontSize:"26px"}}>Meet</div>
}