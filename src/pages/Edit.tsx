import axios from "axios"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

type ProductInput = {
    name:string,
    image:string,
    price:number
}
function Edit() {
    const {id} = useParams()
    const {
        register,
        handleSubmit,
        formState :{errors},
        reset
    }= useForm<ProductInput>()
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(`http://localhost:3000/products/${id}`)
        .then(({data})=>reset(data))
        .catch(()=>alert("ko tim thay sp !"))
    },[id,reset])
    const onEdit  = async (data:ProductInput)=>{
        try {
            const res = await axios.put(`http://localhost:3000/products/${id}`,data)
            if (res.status===200) {
                alert("Edit thanh cong")
                navigate("/fff")
            }
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div>
            <h1>Edit Products</h1>
            <form action="" onSubmit={handleSubmit(onEdit)}>
                <div>
                    <label htmlFor="">name</label>
                    <input type="text" id="name" placeholder=" name product" {...register("name",{required:"ko dc de trong (*)"})} />
                    {errors.name && <p>{errors.name.message}</p> }
                </div>
                <div>
                    <label htmlFor="">image</label>
                    <input type="text" id="image" placeholder=" image product" {...register("image",{required:"ko dc de trong (*)"})} />
                    {errors.image && <p>{errors.image.message}</p> }
                </div>
                <div>
                    <label htmlFor="">price</label>
                    <input type="number" id="price" placeholder=" price product" {...register("price",{required:"ko dc de trong (*)"})} />
                    {errors.price && <p>{errors.price.message}</p> }
                </div>
                <button type="submit">Edit</button>
            </form>
        </div>
    )
}

export default Edit