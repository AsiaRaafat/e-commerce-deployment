import {$baseURL} from "../../recoilstore/index";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { useEffect } from "react";
import "./UserOrders.scss"

export default function UserOrders() {
   const {baseUrl} = useRecoilState($baseURL);
   const [userOrders,setUserOrders]=useState([]);
   const [orderDate,setOrderDate]=useState([]);
   useEffect(() => {
     setUserOrders(JSON.parse(localStorage.getItem("UserOrders")));    
     setOrderDate(JSON.parse(localStorage.getItem("ordersdate")))
   }, []);
   

   const userData = JSON.parse(localStorage.getItem("UserInfo"));
   let myOrders = [
    {
      name:userData.email,
      orderDetails: userOrders,
    }
   ];
   console.log(myOrders);
   localStorage.setItem("yourOrders",JSON.stringify(myOrders));
   return (
    <div className="container col-12">
      <div>{myOrders[0].name}</div>
  <table className="table table-bordered">
  <thead>
    <tr>
    <th>*</th>  
    <th>orderName</th>
    <th>orderAmount</th>
    <th>orderDate</th>
    </tr>
  </thead>
  <tbody>
  {
    myOrders[0].orderDetails .map((product , index) => (
             <tr key={product.documentId}>
              <td>
                {index+1}
            {/* <img
              src={`${baseUrl}`+ product.image[0].url}
              width="50"
              className="img-fluid"
            /> */}
          </td>
              <td>{product.name}</td>
              <td>{product.count}</td>
              <td>{orderDate}</td>
             </tr>
              ))
 }
  </tbody>
</table>
    </div>
  );
}
