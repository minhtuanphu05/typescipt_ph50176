import axios from "axios"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

type ProductInput = {
    name:string,
    image:string,
    price:number
}
function Add() {
    const {
        register,
        handleSubmit,
        formState :{errors}
    }= useForm<ProductInput>()
    const navigate = useNavigate()
    const onAdd : SubmitHandler<ProductInput> = async (data)=>{
        try {
            const res = await axios.post(`http://localhost:3000/products`,data)
            if (res.status===201 || res.status===200) {
                alert("Add thanh cong")
                navigate("/fff")
            }
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div>
            <h1>Add Products</h1>
            <form action="" onSubmit={handleSubmit(onAdd)}>
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
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default Add