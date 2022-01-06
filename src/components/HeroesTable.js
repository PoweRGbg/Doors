import { useState, useEffect } from "react";
import { getHeroes } from "../services/mealService";
import HeroesTableRow from "./HeroesTableRow";

export default function HeroesTable({ results, clearResult }) {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    if (results.length > 0) {
      setHeroes(results);
    } else {
      getHeroes().then((result) => {
        if (result) setHeroes(result);
      });
    }
  }, [results]);

  function goBack(e) {
    e.preventDefault();
    clearResult([]);
  }

  return (
    <div className="col-12 tm-block-col">
      <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
        {results.length ? (
          <h2 className="tm-block-title">Search results:</h2>
        ) : (
          <h2 className="tm-block-title">Heroes List</h2>
        )}
        <table className="table table-hover tm-table-small tm-product-table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">NAME</th>
              <th scope="col">DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
             {heroes.length > 0 &&
              heroes.map((meal) => <HeroesTableRow meal={meal} key={meal._id} />)} 
          </tbody>
        </table>
      </div>
      {results.length ? (
        <button
          type="submit"
          className="btn btn-primary btn-block text-uppercase col-6"
          onClick={goBack}
        >
          Go back
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
