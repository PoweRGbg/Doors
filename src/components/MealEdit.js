import { useEffect, useState } from "react";
import { getHeroById, editMeal } from "../services/mealService";
import { useHistory } from "react-router-dom";
import { isAuth } from "../hoc/AuthHoc"

import "../css/MealDetails.css";

function MealEdit({ match, user }) {
  let [meal, setMeal] = useState([]);
  let historyHook = useHistory();

  useEffect(() => {
    async function fetchData() {
      let result = await getHeroById(match.params.mealId);
      return result;
    }
    fetchData().then((result) => {
      if(Array.isArray(result.ingredients)){
        result.ingredients = result.ingredients.join("\n");
      }
      setMeal(result);
    });
  }, [match.params.mealId]);

  function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let newRecipe = {
      _id: meal._id,
      name: formData.get("name"),
      description: formData.get("description"),
      ingredients: formData.get("ingredients"),
      imageURL: formData.get("imageURL"),
      recipe: formData.get("preparation"),
    };
    editMeal(newRecipe, user)
    .then(() => {
        historyHook.push("/meals/"+meal._id);
    });
  }
  return meal._ownerId === user._id ? (
    <div className="container tm-mt-big tm-mb-big">
      <div className="row">
        <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
          <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
            <div className="row">
              <div className="col-12">
                <h2 className="tm-block-title d-inline-block">Edit meal</h2>
              </div>
            </div>
            <div className="row tm-edit-product-row">
              <div className="tm-product-img-edit mx-auto">
                <img
                  src={meal.imageURL}
                  alt="Meal"
                  className="img-fluid d-block mx-auto"
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12">
                <form
                  method="post"
                  className="tm-edit-product-form"
                  onSubmit={onSubmit}
                >
                  <div className="form-group mb-3">
                    <label htmlFor="name">Meal Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      defaultValue={meal.name}
                      className="form-control validate"
                    />
                    <label htmlFor="Image">Image URL</label>
                    <input
                      id="imegeURL"
                      name="imageURL"
                      type="text"
                      defaultValue={meal.imageURL}
                      className="form-control validate"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control validate tm-small"
                      rows="5"
                      required
                      name="description"
                      defaultValue={meal.description}
                    ></textarea>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="ingredients">Ingredients</label>
                    <textarea
                      className="form-control validate tm-small"
                      rows="5"
                      name="ingredients"
                      defaultValue={meal.ingredients}
                      required
                    ></textarea>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="preparation">Preparation</label>
                    <textarea
                      className="form-control validate tm-small"
                      rows="5"
                      defaultValue={meal.recipe}
                      name="preparation"
                      required
                    ></textarea>
                  </div>

                  <div className="col-8">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block text-uppercase"
                    >
                      Update Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>You are not the owner of this resource!</div>
  );
}

const EditComponent = isAuth(MealEdit);
export default EditComponent;