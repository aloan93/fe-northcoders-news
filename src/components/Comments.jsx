import { useEffect, useState } from "react";
import api from "../api/api";
import Loading from "./Loading";
import Error from "./Error";
import CommentCard from "./CommentCard";

export default function Comments({ article_id }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    api
      .get(`/articles/${article_id}/comments`)
      .then(({ data: { comments } }) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch(
        ({
          response: {
            data: { message },
            status,
            statusText,
          },
        }) => {
          setError({ status, message, statusText });
          setIsLoading(false);
        }
      );
  }, []);

  if (isLoading) return <Loading />;
  if (error)
    return (
      <Error
        status={error.status}
        message={error.message}
        statusText={error.statusText}
      />
    );
  return (
    <details>
      <summary className="comments-dropdown">Comments</summary>
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id}>
              <CommentCard comment={comment} />
            </li>
          );
        })}
      </ul>
    </details>
  );
}
