import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import api from "../api/api";
import Error from "./Error";
import Loading from "./Loading";

export default function CommentInput({ article_id, comments, setComments }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const [newInput, setNewInput] = useState("");

  function postComment(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    api
      .post(`/articles/${article_id}/comments`, {
        username: user,
        body: newInput,
      })
      .then(({ data: { comment } }) => {
        setComments([comment, ...comments]);
        setIsLoading(false);
      })
      .catch(() => {
        setError({
          status: 500,
          message: "Unable to comment right now. Please try again later",
        });
        setIsLoading(false);
      });
  }

  return (
    <>
      <form onSubmit={postComment} className="comment-form">
        <label htmlFor="comment-body">Post a comment:</label>

        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <input
              id="comment-body"
              type="text"
              value={newInput}
              onChange={(e) => {
                setNewInput(e.target.value);
              }}
            />
            <button>Submit</button>
          </div>
        )}
      </form>
      {error && <Error status={error.status} message={error.message} />}
    </>
  );
}
