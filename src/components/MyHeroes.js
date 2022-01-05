import { useState, useEffect } from "react";
import { getNotifications } from "../services/notificationService";
import { isAuth } from "../hoc/AuthHoc";
import {
  getHeroesByOwner,
  getHeroById,
  deleteHero,
  getHeroes,
} from "../services/heroService";

import { Link } from "react-router-dom";
import MyHeroesRow from "./MyHeroesRow";
import MyHeroesNotificationsTableRow from "./MyHeroesRow";

function MyHeroes({ user }) {
  let [heroes, setHeroes] = useState([]);
  let [notifications, setNotifications] = useState([]);
  let [note, setNote] = useState("");
  let [toDelete, setToDelete] = useState([]);

  useEffect(() => {
    if (user.email)
      // getHeroesByOwner(user._id).then((result) => {
      getHeroes().then((result) => {
        result = result.filter((x) => x !== null);
        console.log(result);
        if (result)
          setHeroes(result);
      });
    // getNotifications().then((result) => {
    //   if (result) {
    //     result = result.sort((a, b) => b.date - a.date); // show newest first
    //     result = result.slice(0, 5); // show only the first 5 notifications
    //     setNotifications(result);
    //   }
    // });
  }, [user]);

  async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    let forDelete = Object.keys(object);
    if (forDelete.length > 0) {
      let heroesToDelete = await getArrayOfHeroes(forDelete);
      let names = [];
      heroesToDelete.forEach((x) => names.push(x.name));
      setToDelete(heroesToDelete);
      setNote(`Are you sure you want to delete ${names.join(", ")}?`);
    }
  }

  async function yesClickHandler(e) {
    setNote("");
    if (user.email) {
      for (let index = 0; index < toDelete.length; index++) {
        const element = toDelete[index];
        await deleteHero(element, user);
      }
      getHeroesByOwner(user._id).then((result) => {
        if (result) {
          setHeroes(result);
        }
        getNotifications().then((result) => {
          console.log(`Getting notifications!`);
          if (result) {
            result = result.sort((a, b) => b.date - a.date); // show newest first
            result = result.slice(0, 5); // show only the first 5 notifications
            setNotifications(result);
          }
        });
      });
    }
  }

  function noClickHandler(e) {
    setNote("");
  }

  function garbageBinHandler(garbageHero) {
    setToDelete([garbageHero]);
    setNote(`Are you sure you want to delete ${garbageHero.name}?`);
  }

  async function getArrayOfHeroes(arrayOfIds) {
    let result = [];
    for (let i = 0; i < arrayOfIds.length; i++) {
      const element = await getHeroById(arrayOfIds[i]);
      result.push(element);
    }
    return result;
  }

  return (
    <div className="container mt-5">
      <div className="row tm-content-row">
        <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
          <div className="tm-bg-primary-dark tm-block tm-block-products">
            {note !== "" ? (
              <div>
                <h2 style={{ color: "white" }}>{note}</h2>
                <button
                  className="btn btn-primary btn-block text-uppercase mb-3"
                  onClick={yesClickHandler}
                >
                  Yes
                </button>
                <button
                  className="btn btn-primary btn-block text-uppercase mb-3"
                  onClick={noClickHandler}
                >
                  No
                </button>
              </div>
            ) : (
              <div>
                <div className="tm-product-table-container">
                  <form method="POST" onSubmit={onSubmit}>
                    <table className="table table-hover tm-table-small tm-product-table">
                      <thead>
                        <tr>
                          <th scope="col">&nbsp;</th>
                          <th scope="col">MEAL NAME</th>
                          <th scope="col">DESCRIPTION</th>
                          <th scope="col">DATE ADDED</th>
                          <th scope="col">&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        {heroes.length > 0 ? (
                          heroes.map((hero) => (
                            <MyHeroesRow
                              hero={hero}
                              key={hero._id}
                              remove={garbageBinHandler}
                            />
                          ))
                        ) : (
                          <tr>
                            <td>You don't have any heroes entered!</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    {heroes.length > 0 ? (
                      <button
                        type="submit"
                        className="btn btn-primary btn-block text-uppercase"
                      >
                        Delete selected products
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </form>
                </div>
                <Link
                  to="/addHero"
                  className="btn btn-primary btn-block text-uppercase mb-3"
                >
                  Add new recipe
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 tm-block-col">
          <div className="tm-bg-primary-dark tm-block tm-block-product-categories">
            <h2 className="tm-block-title">Last 5 notifications</h2>
            <div className="tm-product-table-container">
              <table className="table tm-table-small tm-product-table">
                <tbody>
                  {notifications.length > 0 &&
                    notifications.map((notification) => (
                      <MyHeroesNotificationsTableRow
                        key={notification._id}
                        notification={notification}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const EnhancedComponent = isAuth(MyHeroes);

export default EnhancedComponent;
