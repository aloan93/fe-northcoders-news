export default function PageNav({ page, setPage, totalArticleCount }) {
  function pageUp(e) {
    e.preventDefault();
    if (page * 10 < totalArticleCount) setPage(page + 1);
  }

  function pageDown(e) {
    e.preventDefault();
    if (page > 1) setPage(page - 1);
  }

  return (
    <div className="page-navigation">
      <button aria-label="back-page" onClick={pageDown}>
        {"<"}
      </button>
      <p id="current-page" aria-label="current-page">
        {page}
      </p>
      <button aria-label="forward-page" onClick={pageUp}>
        {">"}
      </button>
    </div>
  );
}
