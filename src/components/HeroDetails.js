import AuthContext from "../contexts/AuthContext";
import { useEffect, useState, useContext } from "react";
import { getHeroById, deleteHero, editHero } from "../services/heroService";
import ConfirmDialog from "./ConfirmDialog.js";
import { useHistory } from "react-router-dom";
import "../css/fontawesome.min.css";
import "../css/bootstrap.min.css";
import "../css/templatemo-style.css";
import {
  allowActionEveryMin,
  lifepointsEveryPeriod,
} from "../config/configuration.js";

export default function HeroDetails({ match }) {
  const [hero, setHero] = useState({});
  const [rerender, setRerender] = useState(1);
  const { user } = useContext(AuthContext);
  let historyHook = useHistory();
  const [note, setNote] = useState("");
  const isAdmin = false;
  user._id = "something";

  useEffect(() => {
    function fetchData() {
      if (match.params.heroId === undefined) {
        console.log(`Error! Getting undefined id!`);
      }
      return new Promise(function (resolve) {
        getHeroById(match.params.heroId).then((result) => {
          // console.log(`Result in details is ${JSON.stringify(result)}`);
          resolve(result);
        });
      });
    }

    fetchData()
      .then((result) => {
        let secondsAgo = (Date.now() - result.lastAction) / 1000;
        console.log(`Last action was ${Math.round(secondsAgo)} sec ago`);
        // console.log(`hero is ${JSON.stringify(result)}`);
        setHero(result);
      })
      .then(window.scrollTo(0, 0));
    const interval = setInterval(() => {
      let secondsAgo = (Date.now() - hero.lastAction) / 1000;
      if (secondsAgo / 60 > allowActionEveryMin) {
        console.log(`Healing automatically`);
        let lifeDiffernece = hero.maxLife - hero.life;
        if (lifeDiffernece === 0) return;
        let timeDifference = (Date.now() - hero.lastAction) / 60000;
        let periods = Math.floor(timeDifference / allowActionEveryMin);
        let newHero = hero;
        newHero.life += periods * lifepointsEveryPeriod;
        if (newHero.life > newHero.maxLife) newHero.life = newHero.maxLife;
        newHero.lastAction = Date.now();
        compareHeroes(hero, newHero);
        setHero(newHero);
        saveHero();
        console.log(`Healed ${periods * lifepointsEveryPeriod} for ${timeDifference} min`);
        setRerender(rerender + 1);
      }
      console.log(`Last action was ${secondsAgo}`);
    }, 60000);
    return () => clearInterval(interval);
  }, [match.params.heroId, rerender, hero.lastAction]);

  function saveHero() {
      console.log(`Saving hero!`);
    editHero(hero, user).then((updatedHero) => {
      console.log(`Updated is ${JSON.stringify(updatedHero)}`);
    //   setHero(updatedHero);

    });
  }

  function trainButtonHandler(e) {
    e.preventDefault();
    historyHook.push(`/train/${match.params.heroId}`);
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
    console.log(`Plus button for ${what} with ${howMuch}`);
    let upgradedHero = hero;
    upgradedHero[what] += howMuch;
    if (what === "health") {
      upgradedHero.maxLife += howMuch * 10;
    }
    upgradedHero.skillPoints -= 1;
    saveHero();
    setRerender(rerender + 1);
  }

  async function healButtonHandler() {
    let lifeDiffernece = hero.maxLife - hero.life;
    if (lifeDiffernece === 0) return;
    let newHero = hero;
    // heal completely
    if (hero.gold > 0 && hero.gold >= lifeDiffernece) {
      newHero.life = hero.maxLife;
      console.log(`${hero.life} - ${hero.maxLife}`);
      newHero.gold -= lifeDiffernece;
    } else if (hero.gold > 0) {
      // heal for all the money
      newHero.life += hero.gold;
      newHero.gold = 0;
    }
    compareHeroes(hero, newHero);
    setHero(newHero);
    saveHero();
    setRerender(rerender + 1);
  }

  async function healButtonTimeHandler() {
    let lifeDiffernece = hero.maxLife - hero.life;
    if (lifeDiffernece === 0) return;
    let timeDifference = (Date.now() - hero.lastAction) / 60000;
    let periods = Math.floor(timeDifference / allowActionEveryMin);
    let newHero = hero;
    newHero.life += periods * lifepointsEveryPeriod;
    if (newHero.life > newHero.maxLife) newHero.life = newHero.maxLife;
    newHero.lastAction = Date.now();
    compareHeroes(hero, newHero);
    setHero(newHero);
    saveHero();
    console.log(`Healed ${periods * lifepointsEveryPeriod} for ${timeDifference} min`);
    setRerender(rerender + 1);
  }

  function compareHeroes(oldOne, newOne){
      let keys = Object.keys(newOne);
      for(let i = 0; i<keys.length; i++){
          if(newOne[keys[i]] !== oldOne[keys[i]]){
              console.log(`${keys[i]} is  ${newOne[keys[i]]} from ${oldOne[keys[i]]}`);
          }
      }
  }

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

  return (
    <div>
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
                          <td className="form-control">
                            {hero.life}
                            {hero.life < hero.maxLife && hero.gold > 0 && (
                              <button
                                type="submit"
                                className="btn btn-primary btn-block text-uppercase col-6"
                                onClick={healButtonHandler}
                              >
                                Heal for gold!
                              </button>
                            )}
                            {hero.life < hero.maxLife &&
                              (Date.now() - hero.lastAction) / 60000 >
                                allowActionEveryMin && (
                                <button
                                  type="submit"
                                  className="btn btn-primary btn-block text-uppercase col-6"
                                  onClick={healButtonTimeHandler}
                                >
                                  Heal from time!
                                </button>
                              )}
                          </td>
                        </tr>
                        <tr>
                          <td>Level</td>
                          <td className="form-control">{hero.level}</td>
                        </tr>
                        <tr>
                          <td>Attack</td>
                          <td className="form-control">
                            {hero.attack}
                            {(isAdmin === true || hero.skillPoints > 0) && (
                              <button
                                type="submit"
                                className="btn btn-primary btn-block text-uppercase col-6"
                                onClick={(e) => {
                                  plusButtonHandler("attack", 1, e);
                                }}
                              >
                                +
                              </button>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>Defense</td>
                          <td className="form-control">
                            {hero.defense}
                            {(isAdmin === true || hero.skillPoints > 0) && (
                              <button
                                type="submit"
                                className="btn btn-primary btn-block text-uppercase col-6"
                                onClick={(e) => {
                                  plusButtonHandler("defense", 1, e);
                                }}
                              >
                                +
                              </button>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>Health</td>
                          <td className="form-control">
                            {hero.health}
                            {(isAdmin === true || hero.skillPoints > 0) && (
                              <button
                                type="submit"
                                className="btn btn-primary btn-block text-uppercase col-6"
                                onClick={(e) => {
                                  plusButtonHandler("health", 1, e);
                                }}
                              >
                                +
                              </button>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>Experience</td>
                          <td className="form-control">
                            {hero.xp}
                            {isAdmin === true && (
                              <button
                                type="submit"
                                className="btn btn-primary btn-block text-uppercase col-6"
                                onClick={(e) => {
                                  plusButtonHandler("xp", 1, e);
                                }}
                              >
                                +
                              </button>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>Gold</td>
                          <td className="form-control">
                            {hero.gold}
                            {isAdmin === true && (
                              <button
                                type="submit"
                                className="btn btn-primary btn-block text-uppercase col-6"
                                onClick={(e) => {
                                  plusButtonHandler("gold", 20, e);
                                }}
                              >
                                +
                              </button>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>{trainButton}</div>
                  <div className="row">
                    <div className="custom-file mt-3 mb-3">
                      {hero._ownerId === user._id ? "" : ""}
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
    </div>
  );
}
