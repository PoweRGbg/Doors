import '../css/herostyle.css';
import { useState, useEffect } from 'react';
import StrengthRow from './StrengthRowContentCard';
import Timer from './Timer';

export default function ContentCard(props) {
    let [hero, setHero] = useState(props.hero);
    let [goblin, setGoblin] = useState(initialGoblin());
    // let [gold, setGold] = useState(0);
    let [lastAction, setLastAction] = useState(Date.now());
    const forceUpdate = useForceUpdate();

    // Get state from strength
    function handleStrengthChange(heroValues) {
        console.log('Strength is now ' + heroValues.strength);
        hero = heroValues;
        setHero(hero);
        forceUpdate();
    }


    function initialGoblin() {
        let goblin = {
            health: 10,
            xp: 10,
            level: props.hero.level,
            damage: 1,
            gold: Math.floor(Math.random() * props.hero.maxHealth)
        }
        return goblin;
    }

    function fightGoblinButtonClick() {
        if (Date.now() <= lastAction) {
            console.log("Wait " + Math.floor((lastAction - Date.now()) / 1000) + " sec more");
            forceUpdate();
            return;
        }
        hero.lastAttackTime = Date.now();
        goblin.health -= hero.strength;
        if (goblin.health <= 0) {
            console.log('Killed goblin! Getting ' + goblin.gold + ' gold and ' + goblin.xp + ' xp');
            setGoblin(initialGoblin());
            hero.gold += goblin.gold;
            hero.xp += goblin.xp;
            setHero(hero);
            // check for levelup
            heroLevelUp();
            props.hero.gold = hero.gold;
            setLastAction(Date.now() + 10000);
            forceUpdate();
        } else {
            console.log('Goblin (' + goblin.damage + ')left with  ' + goblin.health + ' life after ' + hero.strength + ' damage');
            setGoblin(goblin);
            hero.health -= goblin.damage;
            //hero is dead
            if (hero.health <= 0) {
                console.log(`${hero.name} is dead! Wait 10 seconds!`);
                setLastAction(Date.now() + 10000);
                setHero(hero);
                forceUpdate();
                setTimeout(() => {
                    hero.health += 1;
                    setHero(hero);
                    forceUpdate()
                }, 10000);
                return;
            }
            setHero(hero);
            console.log('Goblin retaliates and leaves you with ' + props.hero.health);
            forceUpdate()
        }
    };

    function healButtonClick() {
        // we have enough gold for full heal
        if (props.hero.gold >= (props.hero.maxHealth - props.hero.health)) {
            console.log('Full healed for ' + (hero.maxHealth - hero.health) + ' gold');
            hero.gold -= (hero.maxHealth - hero.health)
            props.hero.health = props.hero.maxHealth;
            setHero(hero);
            forceUpdate();
        } else if (hero.gold > 0) {
            hero.health += hero.gold;
            hero.gold = 0;
            setHero(hero);
            forceUpdate();
        } else
            console.log('Not enough gold!');
    };

    function healFromTimeButtonClick() {
        if (Date.now() - hero.lastAttackTime > 10000) {
            let timeInSeconds = (Date.now() - hero.lastAttackTime) / 1000;
            let healed = Math.floor(timeInSeconds / 10);
            console.log(`Time since last attack is ${timeInSeconds}sec. Healing ${healed}(${hero.health})`);
            hero.health += healed;
            if(hero.maxHealth < hero.health){
                hero.health = hero.maxHealth;
            }
            props.hero.health = hero.health;
            hero.lastAttackTime = Date.now();
            setHero(hero);
            forceUpdate();
        } else {
            console.log('Wait more than 10 sec!');
        }
    };

    function heroLevelUp() {
        if (hero.xp >= hero.nextLevelXp) {
            hero.level++;
            hero.nextLevelXp += hero.nextLevelXp * 1.5;
            hero.skillPointsAvailable = 2;
            setHero(hero);
        } else {
            console.log(`You have ${hero.xp}. Next level in ${hero.nextLevelXp - hero.xp}`);
        }
        return;
    }

    //create your forceUpdate hook
    function useForceUpdate() {
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => value + 1); // update the state to force render
    }

    function lowHealth() {
        if (hero.health < hero.maxHealth / 3) {
            return 'blinkingRed';
        } else if (hero.health < hero.maxHealth * 0.8) {
            return 'blinkingOrange';
        }
    }

    return (
        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
            <div className="tm-bg-primary-dark tm-block">
                <h2 className="tm-block-title">{props.title}</h2>
                <h3>{props.hero?.name}</h3>
                <table className="Hero" style={{
                    'backgroundColor': '#54657d',
                    'color': '#fff',
                    'text-align': 'right',
                    'border': 0
                }}>

                    <StrengthRow hero={hero} onHeroChange={handleStrengthChange} />
                    <tr>
                        <td>Life</td>
                        <td className={lowHealth()}>{hero.health}</td>
                        <td>{(hero.maxHealth - hero.health) > 0
                            && hero.gold > 0
                            &&
                            <button className="btn btn-primary btn-block text-uppercase" onClick={() => {
                                //add random gold 
                                healButtonClick();
                            }}
                            >Heal for gold</button>}
                        </td>
                        <td>{(hero.maxHealth - hero.health) > 0
                            && ((Date.now() - hero.lastAttackTime) / 1000) > 10
                            &&
                            <button className="btn btn-primary btn-block text-uppercase" onClick={() => {
                                //add random gold 
                                healFromTimeButtonClick();
                            }}
                            >Heal from time</button>}
                        </td>
                    </tr>
                    <tr>
                        <td>Gold</td>
                        <td>{hero.gold}</td>
                    </tr>
                    <tr>

                        <td>{hero.health > 0 &&
                            <button className="btn btn-primary btn-block text-uppercase" onClick={() => {
                                fightGoblinButtonClick();

                            }}>{(Date.now() >= lastAction)
                                ? `Fight goblin!(${goblin.health})`
                                : timeLeft(lastAction, `Fight goblin!(${goblin.health})`)
                                }</button>
                        }
                        </td>
                    </tr>
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

