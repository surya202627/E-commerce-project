import { useEffect, useState } from "react";
import "./Admin.css";
import api from "../api/api";

const Admin = () => {

    const [data, setData] = useState("");
    const [id, setId] = useState();
    const [message, setMessage] = useState("");

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setUrl] = useState("");

    const [productId, setProductId] = useState("");


    useEffect(() => {

        const response = api.get("/api/admin");

        response.then(res => setData(res.data));

    }, [])

    const handleDelete = async (e) => {

        e.preventDefault();

        try {

            const res = await api.delete(`/api/admin/${id}`);
            console.log(res.data);
            setMessage(res.data);
        } catch (error) {
            console.log(error);
        }
    }


    const handleSubmit = async () => {

        try {

            const res = await api.post("/api/admin", { username, password });
            console.log(res.data);
            alert("User registred successfully");
        } catch (error) {
            alert(error.response.data)
            console.log(error.response.data);
        }
    }

    const handleProducts = async (e) => {
        e.preventDefault();


        try {

            console.log(name, price, imageUrl);
            const res = await api.post("/api/admin/product", { name, price, imageUrl });

            console.log(res.data);
            alert(res.data);
        } catch (error) {

            console.log(error.response.data);
        }
    }


    const deleteProduct = async () => {

        try {
            const res = await api.delete(`/api/admin/product/${productId}`);

            console.log(res.data);
            alert(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="admin-container">

            {/* Top Section */}
            {data ? (

                <>

                    <div className="admin-card">
                        <h3 className="admin-title">{data}</h3>

                        <div className="section">
                            <h4>Delete User</h4>
                            <label>User ID</label>
                            <input
                                type="text"
                                placeholder="Enter user ID"
                                onChange={(e) => setId(e.target.value)}
                            />
                            <button className="btn delete-btn" onClick={handleDelete}>
                                Delete
                            </button>

                            {message && <p className="error">{message}</p>}
                        </div>
                    </div>



                    {/* Add User */}
                    <div className="admin-card">
                        <h4>Add User</h4>

                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className="btn" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>

                    {/* Add Product */}
                    <div className="admin-card">
                        <h4>Add Product</h4>

                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Product name"
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label>Price</label>
                        <input
                            type="text"
                            placeholder="Product price"
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <label>Image URL</label>
                        <input
                            type="text"
                            placeholder="Image URL"
                            onChange={(e) => setUrl(e.target.value)}
                        />

                        <button className="btn" onClick={handleProducts}>
                            Add Product
                        </button>
                    </div>

                    {/* Delete Product */}
                    <div className="admin-card">
                        <h4>Delete Product</h4>

                        <label>Product ID</label>
                        <input
                            type="text"
                            placeholder="Enter product ID"
                            onChange={(e) => setProductId(e.target.value)}
                        />

                        <button className="btn delete-btn" onClick={deleteProduct}>
                            Delete
                        </button>
                    </div>

                </>
            ) : (
                <h3 className="error">Request refused</h3>

            )}

        </div>
    )
}

export default Admin;

