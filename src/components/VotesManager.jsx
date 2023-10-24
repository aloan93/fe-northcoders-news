import { useState } from "react";
import api from "../api/api";

export default function VotesManager({
  elementId,
  elementVotes,
  //   setVotes,
  setArticle,
}) {
  const [displayedVotes, setDisplayedVotes] = useState(elementVotes);

  function manageVote(e) {
    e.preventDefault();
    setDisplayedVotes(displayedVotes + Number(e.target.value));
    api
      .patch(`/articles/${elementId}`, { votes: e.target.value })
      .then(({ data: { article } }) => {
        setArticle(article);
      })
      .catch(
        ({
          response: {
            data: { message },
            status,
            statusText,
          },
        }) => {}
      );
  }

  return (
    <div className="votes-manager">
      <p>Votes: {elementVotes}</p>
      <button onClick={manageVote} value={1}>
        +
      </button>
      <button onClick={manageVote} value={-1}>
        -
      </button>
    </div>
  );
}
