import { Comment } from "../../types/DataTypes";
import { useAppDispatch } from "../../hooks/hooks";
import { deleteComment } from "../../redux/actions/commentsActions";
import dayjs from "dayjs";
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
      <div>
        <p className={styles.date}>Created: {dayjs(date).format('DD/MM/YYYY, HH:mm')}</p>
        <p>{text}</p>
      </div>
      <button className="delete" onClick={removeComment} title="Delete comment">🗑</button>
    </div>
  )
}

export default CommentItem