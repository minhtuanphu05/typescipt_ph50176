import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
type Product = {
    id:number,
    name:string,
    image:string,
    price:number,
}
function Detail() {
    const {id} = useParams()
    const [product,setProduct] = useState<Product | null> ( null )
    useEffect(()=>{
        axios.get(`http://localhost:3000/products/${id}`)
        .then(({data})=>setProduct(data))
        .catch(()=>alert("ko tim thay sp !"))
    },[])
    return (
        <div>
            <h1>Detail Product</h1>
            <div>
                <img src={product?.image} style={{width:"400px",height:"auto",objectFit:"cover"}} alt="" />
                <p>ten sp : {product?.name}</p>
                <p>ma sp : {product?.id}</p>
                <p>gia sp : {product?.price}</p>
                <Link to={`/fff`}><button>quay lai</button></Link>
            </div>
        </div>
    )
}

export default Detail