import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import { addHero } from "../services/heroService";
import { useHistory } from "react-router-dom";

export default function AddHeroForm() {
  let historyHook = useHistory();
  const { user } = useContext(AuthContext);

  function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let newHero = {
      name: formData.get("name"),
    };
    addHero(newHero, user).then(() => {
      console.log(`added ${newHero.name} to database`);
      historyHook.push("/");
    });
  }

  const handleChange = (e) => {};

  return (
    <div className="col-12 tm-block-col">
      <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
        <form
          action=""
          method="POST"
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <label className="tm-block-list">Name of your hero</label>
          <input
            name="name"
            type="text"
            className="form-control validate"
            id="name"
            required
            style={{
              backgroundColor: "#54657d",
              color: "#fff",
              border: 0,
            }}
            onChange={handleChange}
          />
              
          
          
          
          
          <button
            type="submit"
            className="btn btn-primary btn-block text-uppercase"
          >
            Create hero
          </button>
        </form>
      </div>
    </div>
  );
}
