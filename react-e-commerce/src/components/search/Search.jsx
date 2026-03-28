import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import "./Search.css"
import api from "../api/api";


const Search = () => {

    const { keyword } = useParams();
    const [searchList, setSearchList] = useState([]);

    console.log(keyword);



    useEffect(() => {

        const res = api.get(`/api/products/search?keyword=${keyword}`);

        res.then((res) => {
            console.log(res.data);
            setSearchList(res.data);

        })
            .catch((error) => console.log(error))
    }, [keyword])

    return (
        <div className="search-container">
            {searchList.length ? (
                searchList.map((item) => (
                    <div className="product-card" key={item.id}>
                        <img src={item.imageUrl} alt={item.name} className="product-img" />

                        <div className="product-info">
                            <p className="product-name">{item.name}</p>
                            <h5 className="product-price">₹{item.price}</h5>

                            <button className="cart-btn">Add to Cart</button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="not-found">{keyword} not found</p>
            )}
        </div>
    )
}
export default Search