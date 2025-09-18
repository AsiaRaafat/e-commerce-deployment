import { RouterProvider } from "react-router-dom";
import router from "./Components/Root";
import "./App.scss";


export default function App() {

  return (
    <div className="col-12 App">
      <RouterProvider router={router} />
    </div>
  );
}
