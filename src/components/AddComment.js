import AuthContext from '../contexts/AuthContext';
import { useEffect, useContext, useState } from 'react';
import { addComment } from '../services/commentsService';
import { useHistory } from 'react-router-dom';

export default function AddComment({meal}) {
    let historyHook = useHistory();
    const [commentText, setCommentText] = useState('');
    let newComment = {};
    const {user} = useContext(AuthContext)

    useEffect(() => {
        console.log(`Meal id got is ${meal._id}`);
    }, [meal._id]);

    function commentChangeHandler(e){
        e.preventDefault();
        setCommentText(e.target.value)
        console.log('text  '+ e.target.value);
    }

    function onClickHandler(e) {
        e.preventDefault();
        newComment.text = commentText;
        newComment.user = user.email;
        newComment.meal = meal._id;
        newComment.date = Date.now(); 
        if (user.email) {
            addComment(newComment, user);
            historyHook.push(`/meal/${meal._id}`);
        }
        
    }

    return (
        <div className="container tm-mt-big tm-mb-big">
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
                                            value=""
                                            required
                                            style={{
                                                'backgroundColor': '#54657d',
                                                color: '#fff',
                                                border: 0
                                            }}
                                            onChange={commentChangeHandler}
                                        ></textarea>
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block text-uppercase"
                                        >
                                            Add comment
                                        </button>
                                    </form></td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}