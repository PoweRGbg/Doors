import AuthContext from "../contexts/AuthContext";
import { useEffect, useState, useContext } from "react";
import { getHeroById, deleteHero, editHero } from "../services/heroService";
import ConfirmDialog from "./ConfirmDialog.js";
import { useHistory } from "react-router-dom";
import "../css/fontawesome.min.css";
import "../css/bootstrap.min.css";
import "../css/templatemo-style.css";

export default function HeroDetails({ match }) {
  const [hero, setHero] = useState({});
  const [rerender, setRerender] = useState();
  const { user } = useContext(AuthContext);
  let historyHook = useHistory();
  const [note, setNote] = useState("");

  useEffect(() => {
    async function fetchData() {
      let result = await getHeroById(match.params.heroId);
      return result;
    }
    fetchData()
      .then((result) => {
        setHero(result);
      })
      .then(window.scrollTo(0, 0));
  }, [match.params.heroId, rerender]);

  function saveHero() {
    editHero(hero, user).then((updatedHero) => {
      console.log(`Updated is ${updatedHero}`);
      setHero(updatedHero);

      setRerender(rerender + 1);
    });
    getHeroById(hero._id)
      .then((result) => {
        setHero(result);
      });
  }

  function editButtonHandler(e) {
    e.preventDefault();
    historyHook.push(`/edit/${hero._id}`);
  }

  function trainButtonHandler(e) {
    e.preventDefault();
    historyHook.push(`/arena/${hero._id}`);
  }

  function deleteButtonHandler(e) {
    e.preventDefault();
    setNote(`Are you sure you want to remove hero ${hero.name}?`);
  }

  function goBackHandler(e) {
    e.preventDefault();
    historyHook.goBack();
  }

  async function deleteHandler() {
    await deleteHero(hero, user);
    historyHook.push(`/heroes/myheroes`);
  }

   function plusButtonHandler(what, howMuch, e) {
    console.log(`Plus button for ${what} ${howMuch}`);
    let upgradedHero = hero;
    upgradedHero[what] += howMuch;
    saveHero();
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

  const trainButton = (
    <div className="col-6">
      <button
        type="submit"
        className="btn btn-primary btn-block text-uppercase"
        onClick={trainButtonHandler}
      >
        Train
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
      <ConfirmDialog
        show={note}
        onClose={() => setNote(false)}
        onSave={deleteHandler}
        text={note}
      />
      <div className="container tm-mt-big tm-mb-big">
        <div className="row">
          <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
            <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
              <div className="row"></div>
              <div className="row tm-edit-product-row">
                <div className="col-xl-6 col-lg-6 col-md-12">
                  <div className="form-group mb-3">
                    <label htmlFor="name">Hero Name</label>
                    <h4 className="form-control">{hero.name}</h4>
                  </div>
                  <div className="form-group mb-3">
                    <table>
                      <tbody>
                        <tr>
                          <td>Life</td>
                          <td className="form-control">{hero.life}</td>
                        </tr>
                        <tr>
                          <td>Attack</td>
                          <td className="form-control">
                            {hero.attack}
                            <button
                              type="submit"
                              className="btn btn-primary btn-block text-uppercase col-6"
                              onClick={e => { plusButtonHandler("attack",1, e)}}
                            >
                              +
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Defense</td>
                          <td className="form-control">
                            {hero.defense}
                            <button
                              type="submit"
                              className="btn btn-primary btn-block text-uppercase col-6"
                              onClick={e => { plusButtonHandler("defense",1, e)}}
                            >
                              +
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Experience</td>
                          <td className="form-control">
                            {hero.xp}
                            <button
                              type="submit"
                              className="btn btn-primary btn-block text-uppercase col-6"
                              onClick={(e) => {
                                plusButtonHandler("xp", 1, e);
                              }}
                            >
                              +
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Gold</td>
                          <td className="form-control">
                            {hero.gold}
                            <button
                              type="submit"
                              className="btn btn-primary btn-block text-uppercase col-6"
                              onClick={(e) => {
                                plusButtonHandler("gold", 20, e);
                              }}
                            >
                              +
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="row">
                    <div className="custom-file mt-3 mb-3">
                      {hero._ownerId === user._id ? ownerButtons : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
