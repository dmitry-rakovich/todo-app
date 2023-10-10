import { useState } from "react";
import { Comment } from "../../types/DataTypes";
import { useDispatch } from "react-redux";
import CommentItem from "../CommentItem/CommentItem";
import dayjs from "dayjs";

type Props = {
  comments: Comment[],
  taskId: string
}

const Comments = ({comments, taskId}: Props) => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const addComment = () => {
    dispatch({
      type: 'ADD_COMMENT',
      payload: {
        comment: {
          id: window.crypto.randomUUID(),
          parentId: null,
          children: [],
          text: value,
          date: dayjs(new Date()).format('DD/MM/YYYY, hh:mm')
        },
        taskId: taskId
      }
    })
    setValue('')
  }
  return (
    <div>
      <h3>Comments</h3>
        {
          comments
            .filter(comment => !comment.parentId)
            .map(comment => <CommentItem key={comment.id} comment={comment} taskId={taskId} />)
        }
        <div className="comment-form">
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Add comment" />
          <button disabled={!value.trim()} onClick={addComment}>Add</button>
        </div>
    </div>
  );
};

export default Comments;
