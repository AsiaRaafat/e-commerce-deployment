import { useFormik } from "formik";
import * as Yup from "yup";
import { useCart } from "../../Components/CartContext";
import { $baseURL } from "../../recoilstore/index";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import "./CheckOut.scss";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const userData = JSON.parse(localStorage.getItem("UserInfo"));
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [baseUrl] = useRecoilState($baseURL);
  const isUserLoggedIn = true; 
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      address: Yup.string()
        .min(10, "Address must be at least 10 characters")
        .required("Address is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (!userData) {
        Swal.fire({
          icon: "warning",
          title: "Please log in",
          text: "You need to log in to place an order.",
        });
        navigate("/login");
        return;
      }
      
      console.log("Order submitted:", { ...values, cartItems });
      const formattedDate = moment(values).format('YYYY-MM-DD');   
      console.log(formattedDate);
      localStorage.setItem("ordersdate",JSON.stringify(formattedDate));
      Swal.fire({
        icon: "success",
        title: "Order placed successfully ",
        text: "Your order has been placed successfully!",
      });
      clearCart();
      resetForm();
    },
  });

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  return (
    <div className="CheckOut container" order="1">
      <h2 className=" title text-center my-4">Checkout</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty!</p>
      ) : (
        <div className="checkout-content d-flex gap-4">
          {/*  Order*/}
          <div className="order-summary col-md-6">
            <h4 className="mb-3"> Your Order </h4>
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={`${baseUrl}` + item.image[0].url} alt={item.name} width="50" />
                    </td>
                    <td>{item.name}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.count}</td>
                    <td>${(item.price * item.count).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" className="text-end">
                    <strong className="float-start">Total Price:</strong>
                  </td>
                  <td>
                    <strong>${totalPrice.toFixed(2)}</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Checkout Form */}
          <div className="checkout-form col-md-6" order="2">
            <h4 className="mb-3">YOUR Details</h4>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className={`form-control ${
                    formik.touched.name && formik.errors.name
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                ) : null}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className={`form-control ${
                    formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="address"> Address</label>
                <textarea
                  id="address"
                  className={`form-control ${
                    formik.touched.address && formik.errors.address
                      ? "is-invalid"
                      : ""
                  }`}
                  rows="3"
                  {...formik.getFieldProps("address")}
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className="invalid-feedback">{formik.errors.address}</div>
                ) : null}
              </div>

              <button type="submit" className="send  w-100">
                Confirm Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
