import { Link } from "react-router-dom";
import './HeroesTableRow.css'

export default function HeroesTableRow({ meal }) {
  return ( <tr>
    <td><div className="tm-gray-circle"><img src={meal.imageURL} alt="Meal" className="rounded-circle img-small" /></div></td>
    <td className="tm-product-name"><b><Link className="tm-notification-link" to={`/meals/${meal._id}`}> {meal.name}</Link></b></td>
    <td><b>{meal.description}</b></td>
  </tr>)
}