import { Link } from "react-router-dom";
import "./HeroesTableRow.css";

export default function MyHeroesRow({ hero }) {

  return (
    <tr>
      <th scope="row">
        <input type="checkbox" id={hero._id} name={hero._id} />
      </th>
      <td className="tm-product-name">
        <Link to={"/heroes/" + hero._id} className="tm-notification-link">
          {hero.name}
        </Link>
      </td>
      <td>
        
      </td>
    </tr>
  );
}
