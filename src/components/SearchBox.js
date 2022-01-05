import {searchHeroes} from "../services/heroService";

export default function SearchBox({searchResult}) {

    function onClickHandler(e) {
    e.preventDefault();
    let formData = new FormData(e.target);

    let searchText = formData.get("search");
    if(searchText)
    searchHeroes(searchText).then(result =>{
        searchResult(result);
    });

  }

  return (
    <div
      className="row tm-content-row"
      style={{
        height: "30px",
        padding: "10px",
        paddingRight: "30px",
        marginBottom: 0,
        float: "right"
      }}
    >
      
          <form action="" className="tm-signup-form row" onSubmit={onClickHandler}>
            <input
              id="search"
              name="search"
              type="text"
              className="form-control validate"
              placeholder="Search"
              style={{
                height: "30px",
                width: "250px",
              }}
            />
            <button
              type="submit"
              className="btn btn-primary btn-block text-uppercase"
              style={{
                height: "30px",
                width: "80px",
                padding: "0",
              }}
            >
              Search
            </button>
          </form>
        </div>
  );
}
