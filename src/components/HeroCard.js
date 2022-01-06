import "../css/herostyle.css";
import AuthContext from "../contexts/AuthContext";
import { useState, useEffect, useContext } from "react";
import { getHeroById, editHero } from "../services/heroService.js";
import Timer from "./Timer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function HeroCard({ match }) {
  const { user } = useContext(AuthContext);
  let [hero, setHero] = useState();
  let [goblin, setGoblin] = useState(initialGoblin());
  let [render, setRender] = useState(1);
  // let [gold, setGold] = useState(0);
  let [lastAction] = useState(Date.now());
  const historyHook = useHistory();
  //   const forceUpdate = useForceUpdate();

  useEffect(() => {
    getHeroById(match.params.heroId)
      .then((result) => {
        // console.log(`Hero is now ${JSON.stringify(result)}`);
        // set max life
        setHero(result);
      })
      .then((e) => {
        window.scrollTo(0, 0);
      });
  }, [match.params.heroId, goblin]);

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

  function attackButtonHandler() {
    let newGoblin = goblin;
    let newHero = hero;
    newGoblin.health -= hero.attack;
    setGoblin(newGoblin);
    console.log(
      `NewGoblin is ${newGoblin.health} health left Goblin is ${goblin.health}`
    );
    if (goblin.health <= 0) {
      // goblin is dead
      //add gold
      console.log(`Goblin is dead getting ${goblin.gold}`);
      newHero.gold += goblin.gold;
      newHero.xp += goblin.xp;
      //levelup hero
      heroLevelUp();
      console.log(`before save ${hero}`);
      hero.lastAction = Date.now();
      saveHero();
      historyHook.push(`/heroes/${hero._id}`);
    } else {
      // It should retaliate
      newHero.life -= goblin.damage;
      setHero(newHero);
      setRender(render + 1);

      if (goblin.health < 1 || hero.life < 1) {
        if (hero.life < 1) {
          saveHero();
        }
        historyHook.push(`/heroes/${hero._id}`);
      }
    }
  }

  async function heroLevelUp() {
    //first calculate level
    let nextLevelXp = 100 * Math.pow(1.5, hero.level - 1);
    // Do we have so much
    if (hero.xp >= nextLevelXp) {
      let newHero = hero;
      //add skillpoints
      newHero.skillPoints += 2;
      // change level
      newHero.level += 1;
      //save hero
      return newHero;
    }
  }

  function saveHero() {
    // save hero to database
    editHero(hero, user).then((updatedHero) => {
      setHero(updatedHero);
      historyHook.push(`/heroes/${hero._id}`);
    });
  }

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
            textAlign: "right",
            border: 0,
          }}
        >
          <tbody>
            <tr>
              <td>Life</td>
              <td>{hero?.life}</td>

              <td>
                {hero?.maxLife - hero?.life > 0 &&
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
                {hero?.life > 0 && goblin.health > 0 && (
                  <button
                    className="btn btn-primary btn-block text-uppercase"
                    onClick={() => {
                      attackButtonHandler();
                    }}
                  >
                    {Date.now() >= lastAction
                      ? `Attack goblin!(${goblin?.health})`
                      : timeLeft(
                          lastAction,
                          `Fight goblin!(${goblin?.health})`
                        )}
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
