export default function SortBy({ sortBy, setSortBy, setPage }) {
  function inputSortBy(e) {
    setSortBy(e.target.value);
    setPage(1);
  }

  return (
    <form onChange={inputSortBy} className="sort-by">
      <fieldset>
        <legend>Sort By</legend>
        <label className="radio-labels">
          Date
          <input
            type="radio"
            name="sort-by"
            value="created_at"
            readOnly
            checked={sortBy === "created_at"}
          />
        </label>
        <label className="radio-labels">
          Title
          <input
            type="radio"
            name="sort-by"
            value="title"
            readOnly
            checked={sortBy === "title"}
          />
        </label>
        <label className="radio-labels">
          Votes
          <input
            type="radio"
            name="sort-by"
            value="votes"
            readOnly
            checked={sortBy === "votes"}
          />
        </label>
        <label className="radio-labels">
          Comment Count
          <input
            type="radio"
            name="sort-by"
            value="comment_count"
            readOnly
            checked={sortBy === "comment_count"}
          />
        </label>
      </fieldset>
    </form>
  );
}

// article_id, created_at (default), votes, comment_count, title
