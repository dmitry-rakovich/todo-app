import { Comment } from "../../types/DataTypes";
import { useAppDispatch } from "../../hooks/hooks";
import { deleteComment } from "../../redux/actions/commentsActions";
import styles from "./CommentItem.module.css"

type Props = {
  comment: Comment
}
const CommentItem = ({ comment: { date, id, text } }: Props) => {
  const dispatch = useAppDispatch()

  const removeComment = () => {
    dispatch(deleteComment(id))
  }
  return (
    <div className={styles.comment}>
      <div className={styles.text}>
        <p className={styles.date}>Created: {new Date(date).toLocaleString()}</p>
        <p>{text}</p>
      </div>
      <button className="delete" onClick={removeComment} title="Delete comment">🗑</button>
    </div>
  )
}

export default CommentItem