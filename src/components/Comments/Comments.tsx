import { useState } from "react";
import { Comment } from "../../types/DataTypes";
import CommentItem from "../CommentItem/CommentItem";
import { useAppDispatch } from "../../hooks/hooks";
import { addComment } from "../../redux/actions/commentsActions";
import styles from "./Comments.module.css"

type Props = {
  comments: Comment[],
  taskId: string
}

const Comments = ({ comments, taskId }: Props) => {
  const [value, setValue] = useState('')
  const dispatch = useAppDispatch()
  const addNewComment = () => {
    dispatch(addComment({
      id: window.crypto.randomUUID(),
      taskId,
      text: value,
      date: new Date().toString()
    }))
    setValue('')
  }
  return (
    <div>
      <h3>Comments</h3>
      {
        comments.map(comment => <CommentItem key={comment.id} comment={comment} />)
      }
      <div className={styles.form} onKeyUp={(e) => {
        if (e.key === 'Enter' && value.trim()) addNewComment()
      }}>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Add comment" />
        <button disabled={!value.trim()} onClick={addNewComment}>Add</button>
      </div>
    </div>
  );
};

export default Comments;
