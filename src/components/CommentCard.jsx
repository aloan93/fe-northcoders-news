import { useContext, useEffect, useState } from "react";
import VotesManager from "./VotesManager";
import api from "../api/api";
import Loading from "./Loading";
import Delete from "./Delete";
import { UserContext } from "../contexts/User";

export default function CommentCard({ comment }) {
  const [currComment, setCurrComment] = useState(comment);
  const [authorAvatar, setAuthorAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const timeConversion = new Date(currComment.created_at);
  const { user } = useContext(UserContext);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/users/${currComment.author}`)
      .then(({ data: { user } }) => {
        setAuthorAvatar(user.avatar_url);
        setIsLoading(false);
      })
      .catch(() => {
        setAuthorAvatar(
          "https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_1280.png"
        );
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;
  return (
    <div className="comment-card">
      {!isDeleted ? (
        <>
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
            path="comments"
            elementAuthor={currComment.author}
          />
          {user === currComment.author && (
            <Delete
              comment_id={currComment.comment_id}
              setIsDeleted={setIsDeleted}
            />
          )}
        </>
      ) : (
        <p>Successfully Deleted</p>
      )}
    </div>
  );
}
