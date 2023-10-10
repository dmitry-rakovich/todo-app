import { useDispatch } from "react-redux";
import { Comment } from "../../types/DataTypes";
import { useState } from "react";

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
          text: value
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
        <div className="comment">
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBlock: '10px'}}>
            <p>{comment.text}</p>
            <button onClick={deleteComment}>Delete</button>
          </div>
            <div className="comment-form">
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Add comment" />
                <button onClick={addComment}>Add</button>
            </div>
            {
                !!comment.children.length && 
                comment.children.map(comment => <CommentItem
                  key={comment.id}
                  taskId={taskId}
                  comment={comment}
              />)
            }
        </div>
    )
}

export default CommentItem