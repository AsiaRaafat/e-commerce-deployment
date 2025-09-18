import "./LogIn.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { $baseURL } from "../recoilstore/index";


export default function Register() {
  const navigate = useNavigate();
  const [baseUrl] = useRecoilState($baseURL);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required!")
      .min(3, "Name must be at least 3 characters long"),
    email: Yup.string()
      .required("Email is required!")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required!")
      .min(8, "Password must be at least 8 characters long"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });
 
  
  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    // localStorage.setItem("UserInfo",JSON.stringify(values));
    // navigate("/profile");  
    setSubmitting(true);
    axios.post(`${baseUrl}api/app-users`,{values}).then((res)=>{
    console.log(res.data);
    localStorage.setItem("UserInfo",JSON.stringify(values));
     navigate("/profile");
    }).catch((err)=>{
      console.log(err.data);
    //  navigate("/login")
    //  alert("this email is already registerd ,please login");
    })

    if (values.password !== values.confirmpassword) {
      setErrors({ confirmpassword: "Passwords do not match" });
      setSubmitting(false);
      return;
    }
    console.log(values);
    // navigate("/");
    setSubmitting(false);
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <div className="row">
            <div className="col-lg-6">
              <div className="image w-100 h-100">
                <img
                  src="src/assets/register.png"
                  alt="../assets/logo.jpg"
                  className="img w-100 h-100"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="register_form w-100 h-100">
                <Form className="form h-100">
                  <h2 className="title">Register</h2>
                  <p className="name">Enter Your Name</p>
                  <Field className="input" name="name" />
                  <ErrorMessage name="name" component="div" className="error" />
                  <p className="name">Enter Your Email</p>
                  <Field className="input" name="email" type="email" />
                  <ErrorMessage name="email" component="div" className="error" />
                  <p className="name">Enter Your Password</p>
                  <Field className="input" name="password" type="password" />
                  <ErrorMessage name="password" component="div"className="error"/>
                  <p className="name">Confirm Your Password</p>
                  <Field className="input" name="confirmpassword" type="password" />
                  <ErrorMessage name="confirmpassword" component="div" className="error"/>
                  <b>
                    Already Have Account?
                    <Link className="login" to="/login">Login</Link>
                  </b>
                  <button className="sub" type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
