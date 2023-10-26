import { useContext, useState } from "react";
import api from "../api/api";
import Error from "./Error";
import { UserContext } from "../contexts/User";

export default function VotesManager({
  elementId,
  elementVotes,
  path,
  elementAuthor,
}) {
  const [displayedVotes, setDisplayedVotes] = useState(elementVotes);
  const [error, setError] = useState(null);
  const [inputTracker, setInputTracker] = useState(1);
  const { user } = useContext(UserContext);

  function manageVote(e) {
    e.preventDefault();
    setError(null);
    setInputTracker(inputTracker + Number(e.target.value));
    setDisplayedVotes(displayedVotes + Number(e.target.value));
    api
      .patch(`/${path}/${elementId}`, { inc_votes: e.target.value })
      .catch(() => {
        setInputTracker(1);
        setDisplayedVotes(displayedVotes);
        setError("Unable to vote right now. Please try again later");
      });
  }

  return (
    <>
      <div className="votes-manager">
        <p className="votes-tally">Votes: {displayedVotes}</p>
        {user !== elementAuthor && (
          <>
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
          </>
        )}
      </div>
      {error && <Error error={error} />}
    </>
  );
}
