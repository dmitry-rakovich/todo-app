import { useState } from "react";
import { Comment } from "../../types/DataTypes";
import { useDispatch } from "react-redux";
import CommentItem from "../CommentItem/CommentItem";

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
          text: value
        },
        taskId: taskId
      }
    })
    setValue('')
  }
  return (
    <div>
      <h3>Comments</h3>
      <div className="comment-form">
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Add comment" />
        <button onClick={addComment}>Add</button>
      </div>
        {
          comments
            .filter(comment => !comment.parentId)
            .map(comment => <CommentItem key={comment.id} comment={comment} taskId={taskId} />)
        }
    </div>
  );
};

export default Comments;
