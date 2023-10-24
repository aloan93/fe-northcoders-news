import { useState } from "react";
import VotesManager from "./VotesManager";

export default function CommentCard({ comment }) {
  const [currComment, setCurrComment] = useState(comment);

  return (
    <>
      <p>{currComment.author}</p>
      <p>{currComment.created_at}</p>
      <p>{currComment.body}</p>
      <VotesManager
        elementId={currComment.comment_id}
        elementVotes={currComment.votes}
        setElement={setCurrComment}
        path="comments"
      />
    </>
  );
}
