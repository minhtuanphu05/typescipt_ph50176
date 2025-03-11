import axios from "axios"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

type ProductInput = {
    email:string,
    password:string
}
function Login() {

    const {
        register,
        handleSubmit,
        formState :{errors}
    }= useForm<ProductInput>()
    const navigate = useNavigate()
   
    const onSubmit : SubmitHandler<ProductInput> = async (data:ProductInput)=>{
        try {
            const res = await axios.get(`http://localhost:3000/users`)
            const user = res.data.find((u:any)=>u.email===data.email)
            if (!user) {
                alert("tk ko ton tai !")
                return
            }
            if (user.password !== data.password) {
                alert("sai mk !")
                return
            }
            const fakeToken = ` ${user.email} `;
            localStorage.setItem("token",fakeToken)
            localStorage.setItem("user",JSON.stringify(user))
            alert("dang nhap thanh cong")
            navigate("/fff")
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="">email</label>
                    <input type="text" id="email" placeholder=" email" {...register("email",{required:"ko dc de trong (*)",pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
,message:"sai dinh dang email"}})} />
                    {errors.email && <p>{errors.email.message}</p> }
                </div>
                <div>
                    <label htmlFor="">password</label>
                    <input type="password" id="password" placeholder=" password" {...register("password",{required:"ko dc de trong (*)",minLength:{value:8,message:"mk it nhat 8 ky tu"}})} />
                    {errors.password && <p>{errors.password.message}</p> }
                </div>
               
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login