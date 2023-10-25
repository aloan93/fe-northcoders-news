export default function PageNav({ page, setPage, totalArticleCount }) {
  function pageUp(e) {
    e.preventDefault();
    setPage(page + 1);
  }

  function pageDown(e) {
    e.preventDefault();
    setPage(page - 1);
  }

  return (
    <div className="page-navigation">
      <button aria-label="back-page" onClick={pageDown} hidden={page === 1}>
        {"<"}
      </button>
      <p id="current-page" aria-label="current-page">
        {page}
      </p>
      <button
        aria-label="forward-page"
        onClick={pageUp}
        hidden={totalArticleCount <= page * 10}>
        {">"}
      </button>
    </div>
  );
}
