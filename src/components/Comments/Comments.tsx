import { useState } from "react";
import { Comment } from "../../types/DataTypes";

const Comments = (comment: Comment) => {
  const [text, setText] = useState('')
  const nestedComments = (comment.comments || []).map((comment) => {
    return <Comments key={comment.id} {...comment} />;
  });
  return (
    <div>
      <p>{comment.text}</p>
      <button onClick={() => {console.log(text);setText('')}}>send comment</button>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="add comment"></textarea>
      {nestedComments}
    </div>
  );
};

export default Comments;
