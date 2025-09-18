import "./P404.scss"
import { Link } from "react-router-dom"
export default function P404() {
  return (
    <div className="container">
      <h1 className="p404">PAGE NOT FOUND</h1>
      <div className="back">
    <Link to="/">
     <button className="check" id="back"> Back to home </ button></Link>
      </div>
    </div>
  )
}
