import MealsTable from "./HeroesTable";
import AuthContext from "../contexts/AuthContext";
import { useContext, useState } from "react";
import SearchBox from "./SearchBox";
import {Link} from "react-router-dom";

export default function Content() {
  const [results, setResults] = useState([]);
  const [noResult, setNoResults] = useState(null);
  const { user } = useContext(AuthContext);

  function searchResult(mealsArray) {
    if (mealsArray.length > 0) {
      setResults(mealsArray);
    } else {
      setNoResults("No results for this search!");
    }
  }

  function clearResult() {
    setResults([]);
  }

  return (
    <div className="container">
      <div
        className="row"
        style={{
          paddingBottom: "10px",
        }}
      >
        <div className="col">
          {user.email != null ? (
            <p className="text-white">
              Welcome back <b>{user.email}</b>
            </p>
          ) : (
            <p className="text-white">
              Welcome to <b>Meals</b>
            </p>
          )}
        </div>
        <div className="col">
          {/* <SearchBox searchResult={searchResult}></SearchBox> */}
        </div>
      </div>
      <div className="row tm-content-row">
        {noResult ? (
          <table>
              <tr>
                  <td style={{color: "white"}}>No results found!</td>
              </tr>
              <tr>
                  <td style={{color: "white"}}>Search for another meal recipe or</td>
              </tr>
              <tr>
                  <td style={{color: "white"}}><Link to="/" onClick={() =>{setNoResults(false)}}> Go back to all meals</Link></td>
              </tr>
          </table>
        ) : (null)
        //  (
        //   <MealsTable
        //     title="Latest meals"
        //     results={results}
        //     clearResult={clearResult}
        //   />
        // )
      }
      </div>
    </div>
  );
}
