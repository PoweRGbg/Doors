import AuthContext from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

export default function Navbar() {
  let historyHook = useHistory();
  let [activeButton, setActive] = useState("");
  const { user, logout } = useContext(AuthContext);


  //catch logout
  const logoutHandler = async function (event) {
    await window.api.logout();
    logout();
    setActive("");
    historyHook.push(`/`);
    console.log(`Navbar passed through logoutHandler!`);
  };

  useEffect(() => {
    let splittedPathname = historyHook.location.pathname.split("/")[1];
    setActive(splittedPathname);
  }, [historyHook.location.pathname]);

  const clickHandler = function (e) {
    if (user.email !== undefined) {
      if (sessionStorage.getItem("email")) {
        user.email = sessionStorage.getItem("email");
      } else {
        console.log(`No user in navbar!`);
        logout();
      }
    }
    if (!e.target.href) {
      e.target.href = "";
      if (e.currentTarget.href) {
        e.target.href = e.currentTarget.href;
      }
    }
    let locationSplitted = e.target.href.split("/");
    let currentButton = locationSplitted[locationSplitted.length - 1];
    if (currentButton === undefined) {
      currentButton = "";
    }
    setActive(currentButton);
  };

  return (
    <nav className="navbar navbar-expand-xl">
      <div className="container h-100">
        <Link className="navbar-brand" to="/" onClick={clickHandler}>
          <h1 className="tm-site-title mb-0">Heroes</h1>
        </Link>
        <button
          className="navbar-toggler ml-auto mr-0"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars tm-nav-icon"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto h-100">
            <li className="nav-item">
              <Link
                className={activeButton === "" ? "nav-link active" : "nav-link"}
                to="/"
                onClick={clickHandler}
              >
                <i className="fas fa-lemon"></i>
                All heroes
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            {user.email ? (
              <li className="nav-item dropdown">
                <Link
                  className={
                    activeButton === "meals" ||
                    activeButton === "allmeals" ||
                    activeButton === "notifications" ||
                    activeButton === "addMeal"
                      ? "nav-link dropdown-toggle active"
                      : "nav-link dropdown-toggle"
                  }
                  to="/"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-apple-alt"></i>
                  <span>
                    Meals <i className="fas fa-angle-down"></i>
                  </span>
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {user.email ? (
                    <Link
                      className="dropdown-item"
                      to="/heroes/myheroes"
                      onClick={clickHandler}
                    >
                      My heroes
                    </Link>
                  ) : (
                    ""
                  )}
                  <Link
                    className="dropdown-item"
                    to="/addMeal"
                    onClick={clickHandler}
                  >
                    Add new meal
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/notifications"
                    onClick={clickHandler}
                  >
                    Latest actions
                  </Link>
                </div>
              </li>
            ) : (
              ""
            )}

            <li className="nav-item dropdown">
              <Link
                className={
                  activeButton === "login" || activeButton === "register"
                    ? "nav-link dropdown-toggle active"
                    : "nav-link dropdown-toggle"
                }
                to="/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="far fa-user"></i>
                <span>
                  User <i className="fas fa-angle-down"></i>
                </span>
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {user.email ? (
                  <Link
                    className="dropdown-item"
                    to="/addMeal"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Link>
                ) : (
                  <div>
                    <Link
                      className="dropdown-item"
                      to="/login"
                      onClick={clickHandler}
                    >
                      Login
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="/register"
                      onClick={clickHandler}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav">
          {user.email ? (
            <li className="nav-item">
              <Link className="nav-link d-block" to="/" onClick={logoutHandler}>
                {user.email}, <b>Logout</b>
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </nav>
  );
}
