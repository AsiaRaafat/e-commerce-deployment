
import "./SkinCare.scss";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useCart } from "../../Components/CartContext";
import { useRecoilState } from "recoil";
import { $baseURL } from "../../recoilstore/index";
import { useNavigate } from "react-router-dom"
import ScrollToTopButton from "../../Components/ScrollButton/ScrollButton";
import { useOrders } from "../../Components/OrdersContext";


export default function SkinCare() {
  const [baseUrl] = useRecoilState($baseURL);
  const [Products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const{searchInput}=useRef();
  const [reults, setResults] = useState([]);
  const {addToOrders} = useOrders()
  const Navigate = useNavigate();
      


  useEffect(() => {
    axios.get(`${baseUrl}api/skincare-products`,{
      params: {
        populate: "*",
      },
    }).then((res) => {
      setProducts(res.data.data);
      setResults(res.data.data);
    });
  }, []);

  return (
    <div className="col-12">
      <div className="hero-section">
        <img
          src="src/assets/cosmetics(1).png"
          alt="Cosmetic products"
          className="hero-img"
        />
      </div>
      <div className="container  inputdiv">
              <input type="text" name="search" ref={searchInput} onChange={(event)=>{
                let val = event.target.value;
                let searchRes=Products.filter((el)=>{
                  return el.name.toLowerCase().includes(val.toLowerCase()) == true;
                })
                 console.log(searchRes);
                 setResults(searchRes);
                 
                 console.log(event.target.value)
                }} autoComplete="on" placeholder="   Search ....  " className=" d-none  d-lg-block input2"/>
              {/* <img   src="src/Components/NavBar/search-interface-symbol (1).png"  alt="Search" className=" d-none  d-lg-block  img2"/> */}
              
              <select className="select" style={{width:"8rem", height:"2rem", borderRadius:"5px"}  } onChange={(event)=>{
                let val = event.target.value;
                let searchRes=Products.filter((el)=>{
                  return el.name.toLowerCase().includes(val.toLowerCase()) == true;
                                })
                 console.log(searchRes);
                 setResults(searchRes);
              }}
              >
                <option value={-1} hidden>Choose Brand</option>
                <option></option>
                <option value={"Hair"}>Hair</option>
                <option value={"Serum"}>SeruM</option>
                <option value={"lip"}>lip</option>
                <option value={"set"}>set </option>
              </select>
      </div>
      <div className="cards col-12 d-flex container flex-wrap g-4">
        {reults.map((product) => (
          <div key={product.documentId} className="card" style={{ width: "18rem" }}>
            <img src={`${baseUrl}`+ product.image[0].url} className="card-img-top" alt={product.category} />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <b className="price card-text">Price: {product.price} EGP</b>
              <div className="d-flex gap-3">
                <button  className="Show" onClick={() => {
                    addToOrders(product) ;
                    addToCart(product);
                    // Navigate("/orders");
                }}>
                  Add to Cart
                </button>
                <button  className="Show">
                  <a href={`SkinCare/${product.documentId}`}>Show Details</a>
                </button>
              </div>
            </div>
          </div>
        ))}
        <ScrollToTopButton />
      </div>
    </div>
  );
}


