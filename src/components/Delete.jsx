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
        setError({
          status: 500,
          message: "Unable to delete right now. Please try again later",
        });
      });
  }

  return (
    <>
      {!isLoading ? <button onClick={deleteComment}>🗑</button> : <Loading />}
      {error && <Error status={error.status} message={error.message} />}
    </>
  );
}
