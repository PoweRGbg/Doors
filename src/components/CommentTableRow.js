export default function CommentsTableRow({ comment }) {
    let dateOfComment =  new Date(comment.date)
    comment.date = dateOfComment.toLocaleString();

    return (<tr>
        <td>
            <form action="" method="GET">

                <label className="tm-block-list ">{comment.user} on {comment.date}</label>
                <h4
                    className="form-control validate tm-small"
                    style={{
                        'backgroundColor': '#54657d',
                        color: '#fff',
                        border: 0
                    }}
                >{comment.text}</h4>
            </form>
        </td>
    </tr>)
}