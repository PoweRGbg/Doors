import "../css/herostyle.css";
import { useState, useEffect } from "react";
import { getHeroById } from "../services/heroService.js";
import Timer from "./Timer";

export default function HeroCard({ match }) {
  let [hero, setHero] = useState();
  let [goblin, setGoblin] = useState(initialGoblin());
  // let [gold, setGold] = useState(0);
  let [lastAction] = useState(Date.now());
//   const forceUpdate = useForceUpdate();

  useEffect(() => {
    getHeroById(match.params.heroId)
      .then((result) => {
        console.log(`HEro is now ${JSON.stringify(result)}`);
        // set max health
        result.maxLife = result.life * 100;
        setHero(result);
      })
      .then(window.scrollTo(0, 0));
      setGoblin();
  }, [match.params.heroId]);

  function initialGoblin() {
    let goblin = {
      health: 10,
      xp: 10,
      level: 1,
      damage: 1,
      gold: Math.floor(Math.random() * 10),
    };
    return goblin;
  }

  //create your forceUpdate hook
//   function useForceUpdate() {
//     const [value, setValue] = useState(0); // integer state
//     return () => setValue((value) => value + 1); // update the state to force render
//   }



  return (
      
    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
      <div className="tm-bg-primary-dark tm-block">
        <h2 className="tm-block-title">{match.title}</h2>
        <h3>{match.hero?.name}</h3>
        <table
          className="Hero"
          style={{
            backgroundColor: "#54657d",
            color: "#fff",
            "textAlign": "right",
            border: 0,
          }}
        ><tbody>
          <tr>
            <td>Life</td>
            <td>{hero?.life}</td>
            <td>
              {hero?.maxLife - hero?.life > 0 && hero?.gold > 0 && (
                <button
                  className="btn btn-primary btn-block text-uppercase"
                  onClick={() => {
                    //add random gold
                  }}
                >
                  Heal for gold
                </button>
              )}
            </td>
            <td>
              {hero?.maxLife - hero?.health > 0 &&
                (Date.now() - hero?.lastAttackTime) / 1000 > 10 && (
                  <button
                    className="btn btn-primary btn-block text-uppercase"
                    onClick={() => {
                      //add random gold
                    }}
                  >
                    Heal from time
                  </button>
                )}
            </td>
          </tr>
          <tr>
            <td>Gold</td>
            <td>{hero?.gold}</td>
          </tr>
          <tr>
            <td>
              {hero?.life > 0 && (
                <button
                  className="btn btn-primary btn-block text-uppercase"
                  onClick={() => {
                  }}
                >
                  {Date.now() >= lastAction
                    ? `Fight goblin!(${goblin.health})`
                    : timeLeft(lastAction, `Fight goblin!(${goblin.health})`)}
                </button>
              )}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  function timeLeft(lastAction, textAfterTimeout) {
    if (lastAction > Date.now()) {
      let timeLeft = Math.floor((lastAction - Date.now()) / 1000);

      return (
        <Timer initialSeconds={timeLeft} textAfterTimeout={textAfterTimeout} />
      );
    } else {
      console.log(`here ${textAfterTimeout}`);
      return textAfterTimeout;
    }
  }
}
