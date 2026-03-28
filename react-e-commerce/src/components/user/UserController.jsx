import { useEffect, useState } from "react"
import api from "../api/api"

const UserController = ()=>{

    const [data,setData] = useState("");

    useEffect(()=>{

        const res = api.get("/api/user");


        res.then((res)=> setData(res.data) )
        .catch((error)=> console.log(error))
    })

    return(
        <div>
        
        <h3>{data?data:"request refused"}</h3>

        </div>
    )
}

export default UserController

