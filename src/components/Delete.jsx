import { useState } from "react";
import api from "../api/api";
import Error from "./Error";
import Loading from "./Loading";

export default function Delete({ comment_id, setIsDeleted }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function deleteComment(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    api
      .delete(`/comments/${comment_id}`)
      .then(() => {
        setIsLoading(false);
        setIsDeleted(true);
      })
      .catch(() => {
        setIsLoading(false);
        setError("Unable to delete right now. Please try again later");
      });
  }

  return (
    <>
      {!isLoading ? (
        <button className="delete-button" onClick={deleteComment}>
          Delete
        </button>
      ) : (
        <Loading />
      )}
      {error && <Error error={error} />}
    </>
  );
}
