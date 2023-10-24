import { useState } from "react";
import api from "../api/api";
import Error from "./Error";

export default function VotesManager({
  elementId,
  elementVotes,
  setElement,
  path,
}) {
  const [displayedVotes, setDisplayedVotes] = useState(elementVotes);
  const [error, setError] = useState(null);
  const [inputTracker, setInputTracker] = useState(1);

  function manageVote(e) {
    e.preventDefault();
    setInputTracker(inputTracker + Number(e.target.value));
    setDisplayedVotes(displayedVotes + Number(e.target.value));
    api
      .patch(`/${path}/${elementId}`, { inc_votes: e.target.value })
      .then(({ data }) => {
        setElement(data.article || data.comment);
      })
      .catch(() => {
        setError({
          status: 500,
          message: "Unable to vote right now. Please try again later",
        });
      });
  }

  if (error) return <Error status={error.status} message={error.message} />;
  return (
    <div className="votes-manager">
      <p className="votes-tally">Votes: {displayedVotes}</p>
      <button
        className="votes-button"
        aria-label="upvote"
        onClick={manageVote}
        value={1}
        disabled={inputTracker > 1}>
        👍
      </button>
      <button
        className="votes-button"
        aria-label="downvote"
        onClick={manageVote}
        value={-1}
        disabled={inputTracker < 1}>
        👎
      </button>
    </div>
  );
}
