import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
type productsModel ={
    id:number,
    name:string,
    image:string,
    price:number
}
function Home() {
    const [products,setProducts] = useState<productsModel[]>([])
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(`http://localhost:3000/products`)
        .then(({data})=>setProducts(data))
        .catch(()=>alert("ko the tai danh sach !"))
    },[])
    const onDelete= async (id:number)=>{
        if (window.confirm("xoa ?")) {
            try {
                const res = await axios.delete(`http://localhost:3000/products/${id}`)
                if (res.status===200) {
                    alert("xoa thanh cong")
                    setProducts(products.filter(item=>item.id!==id))
                    navigate("/fff")
                }
            } catch (error) {
                alert("loi khi xoa")            
            }
        }
    }
    return (
        <div>
            <h1>List Products</h1>
            <Link to={`/fff/add`}><button>Add Product</button></Link>
            <Link to={`/fff/register`}><button>Register</button></Link>
            <Link to={`/fff/login`}><button>Login</button></Link>
            <table border={1}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>image</th>
                        <th>price</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length ? products.map((item)=>(
                        <tr key={item.id}>
                        <td>{item.name}</td>
                        <td><img src={item.image} style={{width:"100px",height:"100px", objectFit:"cover"}} alt="" /></td>
                        <td>{item.price}</td>
                        <td>
                            <Link to={`/fff/${item.id}/update`}><button>Edit</button></Link>
                            <Link to={`/fff/${item.id}/detail`}><button>Detail</button></Link>
                            <button onClick={()=>onDelete(item.id)}>Xoa</button>
                        </td>
                    </tr>
                    )):( <p>ko con sp nao !</p> )}
                    
                </tbody>
            </table>
        </div>
    )
}

export default Home