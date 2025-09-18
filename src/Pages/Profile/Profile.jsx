import "./Profile.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function UserProfile({}) {
  const userData = JSON.parse(localStorage.getItem("UserInfo"));
  const navigate = useNavigate();
  const handleLogOut=()=>{
    navigate("/login");
    localStorage.removeItem("UserInfo");
    const [urOrders,setUrOrders]=useState([]);
    const [userOrders,setUserOrders]=useState([]);
    useEffect(() => {
         setUrOrders(JSON.parse(localStorage.getItem("yourOrders")));  
         setUserOrders(JSON.parse(localStorage.getItem("UserOrders")));      
       }, []);
    let myArray = urOrders;
    const userData = JSON.parse(localStorage.getItem("UserInfo"));
    function addElement() {
  // إضافة عنصر جديد (يمكنك استبدال "newElement" بقيمة أخرى)
   let newElement = {
    name:userData.email,
      orderDetails: userOrders,
   };
   myArray.push(newElement);
   setArray([...myArray]);
}
  }

  return (
    <div className="container col-12 profile col-lg-6">
      <h3>WELCOMEـ"{userData.name || userData.email}" TO YOUR ACCOUNT</h3>
      <p>
        "Embark on your journey with us now! Explore the Products available to
        you<br/> and "discover all that we have to  "offerWe have so much to share
        with you! <br/> Get ready for "a new and exciting experience and to get our NEWEST OFFERS!"
      </p>
      <button className="b1" onClick={() => navigate("/")}>
        SHOP NOW !
      </button>
      <button className="b2" onClick={() => navigate("/orders")}> MY ORDERS </button>
      <button className="b2" onClick={() => handleLogOut()}> Log Out </button>
    </div>
  );
}
export default UserProfile;
