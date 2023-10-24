import { useEffect, useState } from "react";
import VotesManager from "./VotesManager";
import api from "../api/api";
import Loading from "./Loading";

export default function CommentCard({ comment }) {
  const [currComment, setCurrComment] = useState(comment);
  const [authorAvatar, setAuthorAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const timeConversion = new Date(currComment.created_at);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/users/${currComment.author}`)
      .then(({ data: { user } }) => {
        setAuthorAvatar(user.avatar_url);
        setIsLoading(false);
      })
      .catch(() => {
        setAuthorAvatar("placeholder");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;
  return (
    <div className="comment-card">
      <div className="comment-identity">
        <img
          className="comment-avatar"
          src={authorAvatar}
          alt={`user ${currComment.author}'s avatar`}
        />
        <p className="comment-author">{currComment.author}</p>
      </div>
      <p className="comment-timestamp">{timeConversion.toString()}</p>
      <p>{currComment.body}</p>
      <VotesManager
        elementId={currComment.comment_id}
        elementVotes={currComment.votes}
        setElement={setCurrComment}
        path="comments"
      />
    </div>
  );
}
