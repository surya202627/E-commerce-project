import { useEffect, useState } from 'react';
import './Home.css'

import api from '../api/api';

import {addToCart} from '../api/cartApi';

const Home = () => {


    const [products, setProducts] = useState([]);

    useEffect(() => {



        const res = api.get("/api/products");

        res.then((res) => {
            console.log(res.data);
            setProducts(res.data);
        })
            .catch((error) => console.log(error));



    }, [])

    const handleAddToCart = async (id)=>{

        try{
         await addToCart(id);
        alert("Added to cart")
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="products">
            <div className="products-container">
                {products.map((product) => {
                    return (
                        <div className="product-card" key={product.id}>
                            <div className="image-container">
                                {product.imageUrl ? (
                                    <img src={product.imageUrl} alt={product.name} />
                                ) : (
                                    <img src="https://via.placeholder.com/200" alt="default" />
                                )}
                            </div>

                            <h6 className="product-name">{product.name}</h6>
                            <h5 className="product-price">₹{product.price}</h5>

                            <button className="add-to-cart" onClick={()=>handleAddToCart(product.id)}>Add to Cart</button>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Home;
