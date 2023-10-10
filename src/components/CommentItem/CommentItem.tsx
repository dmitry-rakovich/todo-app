import { useDispatch } from "react-redux";
import { Comment } from "../../types/DataTypes";
import { useState } from "react";
import dayjs from "dayjs";

type Props = {
    comment: Comment,
    taskId: string
}
const CommentItem = ({comment, taskId}: Props) => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const addComment = () => {
    dispatch({
      type: 'ADD_COMMENT',
      payload: {
        comment: {
          id: window.crypto.randomUUID(),
          parentId: comment.id,
          children: [],
          text: value,
          date: dayjs(new Date()).format('DD/MM/YYYY, hh:mm')
        },
        taskId: taskId
      }
    })
    setValue('')
  }

    const deleteComment = () => {
    dispatch({
      type: 'DELETE_COMMENT',
      payload: {
        commentId: comment.id,
        taskId: taskId
      }
    })
  }
    return (
        <details className="comment" title="Click to open/close comment">
          <summary className="comment-preview">
            <div>
              <p className="comment-date">Created: {comment.date}</p>
              <p>{comment.text}</p>
            </div>
            <button onClick={deleteComment}>Delete</button>
          </summary>
            <div className="comment-form">
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Add comment" />
                <button disabled={!value.trim()} onClick={addComment}>Add</button>
            </div>
            {
                !!comment.children.length && 
                comment.children.map(comment => <CommentItem
                  key={comment.id}
                  taskId={taskId}
                  comment={comment}
              />)
            }
        </details>
    )
}

export default CommentItem