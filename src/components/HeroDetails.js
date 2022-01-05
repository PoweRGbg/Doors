import AuthContext from "../contexts/AuthContext";
import { useEffect, useState, useContext } from "react";
import { getHeroById, deleteHero } from "../services/heroService";
import CommentsCard from "./CommentsCard";
import ConfirmDialog from "./ConfirmDialog.js";
import { useHistory } from "react-router-dom";
import "../css/fontawesome.min.css";
import "../css/bootstrap.min.css";
import "../css/templatemo-style.css";

export default function HeroDetails({ match }) {
  const [hero, setHero] = useState([]);
  const { user } = useContext(AuthContext);
  let historyHook = useHistory();
  const [note, setNote] = useState("");
  const [toDelete, setToDelete] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let result = await getHeroById(match.params.heroId);
      return result;
    }
    fetchData()
      .then((result) => {
        if (!result.message && !Array.isArray(result.ingredients) ) {
          result.ingredients = result.ingredients.split("\r");
        }
        setHero(result);
      })
      .then(window.scrollTo(0, 0));
  }, [match.params.heroId, user]);

  function editButtonHandler(e) {
    e.preventDefault();
    historyHook.push(`/edit/${hero._id}`);
  }

  function deleteButtonHandler(e) {
    e.preventDefault();
    setToDelete(hero);
    setNote(`Are you sure you want to remove hero ${hero.name}?`);
  }

  function goBackHandler(e) {
    e.preventDefault();
    historyHook.goBack();
  }

  async function deleteHandler() {
    await deleteHero(hero, user);
    historyHook.push(`/heros/myheros`);
  }

  const ownerButtons = (
    <div className="col-6">
      <button
        type="submit"
        className="btn btn-primary btn-block text-uppercase"
        onClick={editButtonHandler}
      >
        Edit
      </button>
      <button
        type="submit"
        className="btn btn-primary btn-block text-uppercase"
        onClick={deleteButtonHandler}
      >
        Delete
      </button>
    </div>
  );
  return hero.name === undefined ? (


    <div className="container tm-mt-big tm-mb-big">
      <div className="row">
        <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
          <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
            <div className="row">
              <div className="col-12"></div>
            </div>
            <div className="row tm-edit-product-row">
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group mb-3">
                  <center>ERROR FETCHING MEAL!</center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
    <ConfirmDialog show={note} onClose={() => setNote(false)} onSave={deleteHandler} text={note} />
    <div className="container tm-mt-big tm-mb-big">
      <div className="row">
        <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
          <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
            <div className="row"></div>
            <div className="row tm-edit-product-row">
              <div className="tm-product-img-edit mx-auto">
                <img
                  src={hero.imageURL}
                  alt="HeroShot"
                  className="img-fluid d-block mx-auto"
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group mb-3">
                  <label htmlFor="name">Hero Name</label>
                  <h4 className="form-control">{hero.name}</h4>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="description">Description</label>
                  <h5 className="form-control">{hero.description}</h5>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="ingredients">Ingredients needed</label>
                  <ul className="form-control">
                    {hero.ingredients.map((ingredient) => (
                      <li key={ingredient.length+Date.now()}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="recipe">Preparation</label>
                  <h5 className="form-control">{hero.recipe}</h5>
                </div>

                <div className="row">
                  <div className="custom-file mt-3 mb-3">
                    {hero._ownerId === user._id ? ownerButtons : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CommentsCard hero={hero} />

          <div className="container tm-mt-big tm-mb-big">
            <div className="row custom-file mt-3 mb-3 col-3">
              <button
                type="submit"
                className="btn btn-primary btn-block text-uppercase col-6"
                onClick={goBackHandler}
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
