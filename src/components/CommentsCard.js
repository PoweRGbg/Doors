import AuthContext from "../contexts/AuthContext";
import { useState, useEffect, useContext, useRef } from "react";
import { getComments } from "../services/commentsService.js";
import CommentsTableRow from "./CommentTableRow.js";
import { addComment } from "../services/commentsService.js";

export default function CommentsCard({ meal }) {
  let [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const {user} = useContext(AuthContext)
  let newComment = {};
  const commentsDiv = useRef(null);


  useEffect(() => {
    getComments(meal._id).then((result) => {
      if (result) setComments(result);
    });
  }, [meal]);

  function commentChangeHandler(e){
    e.preventDefault();
    setCommentText(e.target.value)
}


  function onClickHandler(e) {
    e.preventDefault();
    newComment.text = commentText;
    newComment.user = user.email;
    newComment.recipe = meal._id;
    newComment.recipeName = meal.name;
    newComment.date = Date.now();
    if (user.email && commentText) {
      addComment(newComment, user);
      getComments(meal._id).then((result) => {
        if (result) setComments(result);
      });
      setCommentText("");
      executeScroll(); 
      getComments(meal._id).then((result) => {
        if (result) setComments(result);
      });
      // window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
    }
  }
  const executeScroll = () => commentsDiv.current.scrollIntoView();

  return (
    <div className="container tm-mt-big tm-mb-big">
      {user.email ? (
        <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
          <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
            <table className="col-12 text-center">
              <tbody>
                <tr>
                  <td>
                    <form action="" method="GET" onSubmit={onClickHandler}>
                      <label className="tm-block-list ">Your Comment</label>
                      <textarea
                        name="text"
                        type="text"
                        className="form-control validate tm-small"
                        id="text"
                        required
                        style={{
                          backgroundColor: "#54657d",
                          color: "#fff",
                          border: 0,
                        }}
                        value={commentText}
                        onChange={commentChangeHandler}
                      ></textarea>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block text-uppercase"
                      >
                        Add comment
                      </button>
                    </form>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="container tm-mt-big tm-mb-big" ref={commentsDiv}>
        <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
          <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
            <label className="tm-block-list ">Comments about {meal.name}</label>
            <table className="col-12 text-center">
              <tbody>
                {comments.length > 0 &&
                  comments.map((comment) => (
                    <CommentsTableRow comment={comment} key={comment._id} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
