import { useRecoilState } from "recoil";
import {$baseURL} from "../../recoilstore/index";
import "./Home.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ScrollToTopButton from "../../Components/ScrollButton/ScrollButton";
import { useCart } from "../../Components/CartContext";
import { useOrders } from "../../Components/OrdersContext";

export default function Home() {
  const { addToCart } = useCart();
  const [baseUrl] = useRecoilState($baseURL);
  const [homeProduct , setHomeProduct] = useState([]);
  const {addToOrders} = useOrders()
  const Navigate = useNavigate();
  
  useEffect(()=>{
    axios.get(`${baseUrl}api/home-products`,{
      params: {
        populate: "*",
      },
    }).then((res)=>{
      setHomeProduct(res.data.data);
    })
    
  }, [])
  
  return (
    
    <div className="col-12 ">
       <div className="hero-section ">
       <video src="src/assets/myVideo.mp4" autoPlay muted loop alt="" style={{width: "100%"  , height: "80vh" , objectFit: "cover"}}></video>
     </div>
        <div className=" container d-flex overflow-x-hidden  imgdiv">
         <div className="col-12 col-md-6 col-lg-6  img4">
          <Link to="/SpecialOffers">
            <img src="src/assets/img1-home.jpg" alt="" style={{width:"95%", height:"70%"}} />
          </Link>
         </div>
         <div className="col-12 col-md-6 col-lg-6  img5">
          <Link to="/SpecialOffers">
            <img src="src/assets/img2-home.jpg" alt=""  style={{width:"100%" , height:"70%"}}/>
          </Link>
        </div>
        </div>
        <div className="container  section2" >
        <h2 className="title text-center  ">Categories</h2>
        <br/>
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner" style={{ height: "80vh" }}>
    <div className="carousel-item active">
      <Link to="/makeup">
        <img src="src/assets/MAKEUP-HOME.jpg" className="d-block w-100" alt="Makeup" />
      </Link>
    </div>
    <div className="carousel-item">
      <Link to="/skincare">
        <img src="src/assets/SKINCARE-HOME.jpg" className="d-block w-100" alt="Skincare" />
      </Link>
    </div>
    <div className="carousel-item">
      <Link to="/Perfumes">
        <img src="src/assets/IMG-.jpg" className="d-block w-100" alt="Image" />
      </Link>
    </div>
    <div className="carousel-item">
      <Link to="/SpecialOffers">
        <img src="src/assets/offers.jpg" className="d-block w-100" alt="Offers" />
      </Link>
    </div>
  </div>

  <button
    className="carousel-control-prev button1"
    type="button"
    data-bs-target="#carouselExample"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>

  <button
    className="carousel-control-next button2"
    type="button"
    data-bs-target="#carouselExample"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

        </div>
      <div className="container section3"> 
                <h2 className="title text-center p-4">Our Products</h2>
                <div className="col-12 d-flex">
          <marquee  className="marquee gap-3">
          <img src="src/assets/img1home.jpg" alt="" />
          <img src="src/assets/img2home.jpg" alt="" />
          <img src="src/assets/img3home.jpg" alt="" />
          <img src="src/assets/img4home.jpg" alt="" />
          <img src="src/assets/img5home.jpg" alt="" />
          <img src="src/assets/img6home.jpg" alt="" />
          </marquee>      
           </div>  
           <br/>
            <div className="cards col-12 d-flex container flex-wrap g-3">
                   {
                   homeProduct.map((product) => (
                     <div key={product.documentId} className="card" style={{ width: "18rem" }}>
                       <img src={`${baseUrl}`+ product.image[0].url} className="card-img-top" alt={product.category} />
                       <div className="card-body">
                         <h5 className="card-title">{product.name}</h5>
                         <b className=" price card-text">Price: {product.price} EGP </b>
                         <div className="d-flex gap-3">
                           <button  className="Show" onClick={() => {
                            addToOrders(product);
                            addToCart(product);
                            Navigate("/Cart");
                            }}>
                             Add to Cart
                           </button>
                           <button  className="Show">
                             <a href={`MakeUp/${product.documentId}`}>Show Details</a>
                           </button>
                         </div>
                       </div>
                     </div>
                   ))
                   }
                       <ScrollToTopButton/>
           
                 </div>
    </div>  
    </div>  
  );
}

