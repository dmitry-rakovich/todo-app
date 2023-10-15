import { Comment } from "../../types/DataTypes";
import { useAppDispatch } from "../../hooks/hooks";
import { deleteComment } from "../../redux/actions/commentsActions";

type Props = {
  comment: Comment
}
const CommentItem = ({ comment: { date, id, text } }: Props) => {
  const dispatch = useAppDispatch()

  const removeComment = () => {
    dispatch(deleteComment(id))
  }
  return (
    <div className="comment">
      <div>
        <p className="comment-date">Created: {date}</p>
        <p>{text}</p>
      </div>
      <button onClick={removeComment}>Delete</button>
    </div>
  )
}

export default CommentItem