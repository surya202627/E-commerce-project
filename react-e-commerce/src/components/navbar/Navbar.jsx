import { useState } from "react";
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [cartCount] = useState(3);
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("Home");

  const [keyword, setKeyword] = useState("");
  

  const categories = [
    "Home",
    "Men",
    "Women",
    "Kids",
    "Electronics",
    "New Arrivals",
    "Brands",
  ];


  const handleNavigate = () => {

  }

  const messageAlert = () => {
    // alert("search icon clicked " + keyword);
    
    navigate(`/search/${keyword}`)


  }

  return (
    <nav
      className="navbar sticky-top"
      style={{
        backgroundColor: "#0F172A",
        borderBottom: "1px solid #334155"
      }}
    >
      <div className="container-fluid flex-column px-0">

        {/* Top Row */}
        <div className="d-flex align-items-center w-100 px-4 py-2 gap-3">

          {/* Brand */}
          <a
            className="navbar-brand fw-bold fs-4 me-3 text-decoration-none"
            href="#"
            style={{ color: "#F8FAFC" }}
          >
            Shop<span style={{ color: "#22C55E" }}>.</span>co
          </a>

          {/* Search Bar */}
          <div className="input-group flex-grow-1" style={{ maxWidth: "420px" }}>
            <span
              className="input-group-text"
              style={{
                background: "#1E293B",
                border: "1px solid #334155",
                color: "#F8FAFC"
              }}
              onClick={messageAlert}   >
              <FiSearch size={15} />
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search products, brands..."
              style={{
                background: "#1E293B",
                border: "1px solid #334155",
                borderLeft: "none",
                color: "#F8FAFC",
                fontSize: "14px"
              }}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="d-flex align-items-center gap-2 ms-auto">

            <Link to="/login"
              className="btn d-flex align-items-center gap-2"
              style={{
                background: "#F1F5F9",
                fontSize: "14px"
              }}
            >
              <FiUser size={17} />
              Account
            </Link>

            <button
              className="btn d-flex align-items-center gap-2"
              style={{
                background: "#F1F5F9",
                fontSize: "14px"
              }}
            >
              <FiHeart size={17} />
              Wishlist
            </button>

            <button
              className="btn d-flex align-items-center gap-2 position-relative"
              style={{
                background: "#22C55E",
                color: "#fff",
                fontWeight: 500,
                fontSize: "14px"
              }}
              onClick={()=> navigate("/cart")}
            >
              <FiShoppingCart size={17} />
              Cart

              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{
                    background: "#EF4444",
                    fontSize: "10px"
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>

        {/* Bottom Row */}
        <div
          className="d-flex align-item-center w-100 px-4 gap-1 overflow-auto"
          style={{
            borderTop: "1px solid #334155"
          }}
        >
          {categories.map((cat) => (
            <Link
              key={cat}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveLink(cat);
                navigate(cat == "Home" ? "/" : `/${cat}`);
              }}
              className="text-decoration-none px-3 py-2"
              style={{
                fontSize: "13px",
                whiteSpace: "nowrap",
                color: activeLink === cat ? "#38BDF8" : "#CBD5F5",
                borderBottom:
                  activeLink === cat
                    ? "2px solid #38BDF8"
                    : "2px solid transparent",
                fontWeight: activeLink === cat ? 500 : 400,
              }}
            >
              {cat}

              {cat === "New Arrivals" && (
                <span
                  className="ms-1 px-2 rounded-pill"
                  style={{
                    background: "#22C55E",
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: 500
                  }}
                >
                  New
                </span>
              )}
            </Link>
          ))}

          <span
            className="ms-auto px-3 py-1 rounded-pill"
            style={{
              background: "#EF4444",
              color: "#fff",
              fontSize: "12px",
              fontWeight: 500
            }}
          >
            Summer Sale — 40% off
          </span>

        </div>

      </div>
    </nav>
  );
}

