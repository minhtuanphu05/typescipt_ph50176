import axios from "axios"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

type ProductInput = {
    email:string,
    password:string,
    password2:string
}
function Register() {

    const {
        register,
        handleSubmit,
        formState :{errors},
        watch
    }= useForm<ProductInput>()
    const navigate = useNavigate()
   
    const onSubmit : SubmitHandler<ProductInput> = async (data)=>{
        try {
            const res = await axios.post(`http://localhost:3000/users`,data)
            if (res.status===201 || res.status===200) {
                alert("dang ky thanh cong")
                navigate("/fff")
            }
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div>
            <h1>Register</h1>
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
                <div>
                    <label htmlFor="">password</label>
                    <input type="password" id="password2" placeholder=" xac nhan password" {...register("password2",{required:"ko dc de trong (*)",validate:(value)=>value===watch("password")||"mk ko trung khop"})} />
                    {errors.password2 && <p>{errors.password2.message}</p> }
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register