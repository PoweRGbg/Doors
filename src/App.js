import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Content from "./components/Content";
import NotificationsList from "./components/NotificationsList";
import MealsTable from "./components/HeroesTable";
import HeroDetails from "./components/HeroDetails";
import AddHeroCard from "./components/AddHeroCard";
import HeroCard from "./components/HeroCard";
import RegisterUser from "./components/RegisterUser";
import Login from "./components/Login";
import MealEdit from "./components/MealEdit";
import MyHeroes from "./components/MyHeroes";
import { useState } from "react";

import AuthContext from "./contexts/AuthContext.js";
import NotFound from "./components/NotFound";

function App() {
  const [user, setUser] = useState({});

  const login = (loggedUser) => {
    setUser(loggedUser);
  };

  const logout = () => {
    setUser({});
  };

  return (
    <>
    <AuthContext.Provider value={{ user: user, login, logout }}>
      <Navbar />
      <Switch>
        <Route path="/" exact component={MyHeroes} />
        <Route path="/notifications" exact component={NotificationsList} />
        <Route path="/addhero" exact component={AddHeroCard} />
        <Route path="/allheroes" component={MyHeroes} />
        <Route path="/heroes/myheroes" component={MyHeroes} />
        <Route path="/heroes/:heroId" component={HeroDetails} />
        <Route path="/train/:heroId" component={HeroCard} />
        <Route path="/edit/:mealId" component={MealEdit} />
        <Route path="/register" component={RegisterUser} />
        <Route path="/login" component={Login} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </AuthContext.Provider>
    </>
      );
    }
    
export default App;
