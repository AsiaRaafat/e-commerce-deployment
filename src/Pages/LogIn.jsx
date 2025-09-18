
import "./LogIn.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LogIn() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required!"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required!"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.get("http://localhost:1337/api/app-users", {
        identifier: values.email,
        password: values.password,
      });

      // console.log(response.data);
      console.log(values);
      // navigate("/");
      localStorage.setItem("UserInfo",JSON.stringify(values));
      navigate("/");      
      //  response.data;

      // localStorage.setItem("token", response.data);
    } catch (error) {
      setErrors({ server: error.response?.data?.error?.message || "Login failed!" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting, errors }) => (
          <div className="row">
            <div className="col-lg-6">
              <div className="image w-100 h-100">
                <img
                  src="src/assets/register.png"
                  alt="../assets/logo.jpg"
                  className="img w-100 h-100 object-fit-cover"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="register_form w-100 h-100">
                <Form className="form h-100">
                  <h2 className="title" >LogIn</h2>

                  <p className="name">Enter Your Email</p>
                  <Field className="input" name="email" type="text" />
                  <ErrorMessage name="email" component="div" className="error" />
                
                  <p className="name">Enter Your Password</p>
                  <Field className="input" name="password" type="password" />
                  <ErrorMessage  name="password" component="div" className="error"/>
                 
                  {errors.server && (
                    <div className="error">{errors.server}</div>
                  )}

                  <b> Dont have an account?
                  <Link className="login" to="/Register">SignUp</Link>

                  </b>
                  <button className="sub" type="submit" disabled={isSubmitting}>
                    LogIn
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



