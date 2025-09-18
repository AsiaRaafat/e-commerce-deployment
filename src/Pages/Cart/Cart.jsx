
import "./Cart.scss";
import { Link } from "react-router-dom";
import { useCart } from "../../Components/CartContext";
import {$baseURL} from "../../recoilstore/index";
import { useRecoilState } from "recoil";
import { useOrders } from "../../Components/OrdersContext";


  export default function Cart() {
  const { cartItems, updateCount, removeFromCart, clearCart } = useCart();
  const {userOrders, updateOrderCount, removeFromOrders, clearOrders} = useOrders();
  const [baseUrl] = useRecoilState($baseURL);

  const totalItems = cartItems?.reduce((total, item) => total + item.count, 0) || 0;

  const totalPrice = cartItems?.reduce((total, item) => total + item.price * item.count, 0) || 0;
  

  return (
    <div className="ShoppingCart mb-7">
      <h2 className="title  my-3 p-2">Shopping Cart</h2>
      <div className="container">
        {!cartItems?.length ? ( 
          <p className="text-center">No items in Cart</p>
        ) : (
          <>
           <div className="table-responsive">
  <table className="table table-bordered ">
    <thead >
      <tr>
        <th>#</th>
        <th>Img</th>
        <th>Name</th>
        <th>Price</th>
        <th>Count</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {cartItems.map((item, index) => (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>
            <img
              src={`${baseUrl}` + item.image[0].url}
              alt={item.name}
              width="50"
              className="img-fluid"
            />
          </td>
          <td>{item.name}</td>
          <td>${item.price}</td>
          <td>
            <button
              className="btn btn-sm  me-1"
              onClick={() =>{
                updateCount(item.id, item.count + 1);
                updateOrderCount(item.id, item.count +1) ;
              }
      }>
              +
            </button>
            <span>{item.count}</span>
            <button
              className="btn btn-sm  ms-1"
              onClick={() =>{
                updateCount(item.id, item.count - 1);
                updateOrderCount(item.id, item.count - 1);
              }
                
      }>
              -
            </button>
          </td>
          <td>
            <button
              className="btn btn-sm btn-danger"
              onClick={() =>{
                 removeFromCart(item.id);
                 removeFromOrders(item.id); 
                } 
                }>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

            <div className="d-flex justify-content-between">
              <div className="summary">
                <h4>
                  Total items: <span className="fs-4 text-black">{totalItems}</span>
                </h4>
                <h4>
                  Total Price:{" "}
                  <span className="fs-4 text-black">
                    ${totalPrice.toFixed(2)}
                  </span>
                </h4>
              </div>
              <div className="checkout">
                <button className="btn btn-danger" onClick={() =>{
                  clearCart();
                  clearOrders(); 
                 } 
                   }>
                  Delete All
                </button>
                <Link className="btn btn-primary" to="/CheckOut">
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


