import { Link } from "react-router-dom";
import "./MealsTableRow.css";

export default function MyHeroesRow({ hero, remove }) {

  function del() {
    remove(hero);
  }
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
        <Link to="" className="tm-product-delete-link">
        <i
          className="far fa-trash-alt tm-product-delete-icon tm-product-delete-link"
          id={hero._id}
          name={hero.name}
          onClick={del}
        ></i>
        </Link>
      </td>
    </tr>
  );
}
