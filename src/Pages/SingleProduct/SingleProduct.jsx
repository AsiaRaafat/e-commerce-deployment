import "./Product.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../Components/CartContext";
import { useRecoilState } from "recoil";
import { $baseURL } from "../../recoilstore/index";

export default function SingleProduct() {
  const { documentId } = useParams();
  const [baseUrl] = useRecoilState($baseURL);
  const { addToCart } = useCart();

  const [product, setproduct] = useState({});
  useEffect(() => {
    console.log("Test ");
    axios
      .get(`http://localhost:1337/api/products/${documentId}`, {
        params: {
          populate: "*",
        },
      })
      .then((res) => {
        console.log(res.data);
        setproduct(res.data.data);
        // console.log(res.data.data);
      });
  }, []);
  useEffect(() => {
    console.log("Test ");
    axios
      .get(`http://localhost:1337/api/perfumes/${documentId}`, {
        params: {
          populate: "*",
        },
      })
      .then((res) => {
        console.log(res.data);
        setproduct(res.data.data);
        // console.log(res.data.data);
      });
  }, []);
  useEffect(() => {
    console.log("Test ");
    axios
      .get(`http://localhost:1337/api/offers/${documentId}`, {
        params: {
          populate: "*",
        },
      })
      .then((res) => {
        console.log(res.data);
        setproduct(res.data.data);
        // console.log(res.data.data);
      });
  }, []);
  useEffect(() => {
    console.log("Test ");
    axios
      .get(`http://localhost:1337/api/skincare-products/${documentId}`, {
        params: {
          populate: "*",
        },
      })
      .then((res) => {
        console.log(res.data);
        setproduct(res.data.data);
        // console.log(res.data.data);
      });
  }, []);
  useEffect(() => {
    console.log("Test ");
    axios
      .get(`http://localhost:1337/api/home-products/${documentId}`, {
        params: {
          populate: "*",
        },
      })
      .then((res) => {
        console.log(res.data);
        setproduct(res.data.data);
        // console.log(res.data.data);
      });
  }, []);

  return (
    <div className="Card">
      <div className="cardImage" order="1">
        {product.image && (
          <img
            src={`${baseUrl}` + product.image[0].url}
            className="card-img-top"
            alt="..."
          />
        )}
      </div>
      <div className="cardBody" order="2">
        <h2 className="card-title">{product.name}</h2>

        <h3 className="price">price :  {product.price} EGP</h3>
        <div className="button ">
          <button className="added" onClick={() => addToCart(product)}> Buy Now</button>
          <Link to="/CheckOut">
            <button className="check"> Check Your Order </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
