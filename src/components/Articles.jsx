import { useEffect, useState } from "react";
import api from "../api/api";
import { Link, useParams } from "react-router-dom";
import PageNav from "./PageNav";
import TopicFilter from "./TopicFilter";
import Loading from "./Loading";
import Error from "./Error";
import SortBy from "./SortBy";
import Order from "./Order";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [totalArticleCount, setTotalArticleCount] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { topic } = useParams(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    api
      .get(
        `/articles?${
          topic
            ? `topic=${topic}&sort_by=${sortBy}&order=${order}&p=${page}`
            : `sort_by=${sortBy}&order=${order}&p=${page}`
        }`
      )
      .then(({ data: { total_count, articles } }) => {
        setIsLoading(false);
        if (total_count > 0) {
          setArticles(articles);
          setTotalArticleCount(total_count);
        } else {
          setError("Oops! That topic does not exist");
        }
      })
      .catch(() => {
        setIsLoading(false);
        setError("Oops! Something went wrong. Please try again later");
      });
  }, [page, topic, sortBy, order]);

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <>
      <TopicFilter currTopic={topic} />
      <div className="radio-options">
        <SortBy sortBy={sortBy} setSortBy={setSortBy} />
        <Order order={order} setOrder={setOrder} />
      </div>

      <ul>
        {articles.map((article) => {
          const timeConversion = new Date(article.created_at);
          return (
            <li className="article-card" key={article.article_id}>
              <p className="article-title-list">
                <Link to={`/articles/${article.article_id}`}>
                  {article.title}
                </Link>
              </p>
              <p>by {article.author}</p>
              <p>{timeConversion.toString()}</p>
              {!topic && (
                <p>
                  <Link to={`/topics/${article.topic}`}>{article.topic}</Link>
                </p>
              )}
              <p>Votes: {article.votes}</p>
              <p>Comment Count: {article.comment_count}</p>
            </li>
          );
        })}
      </ul>
      <PageNav
        page={page}
        setPage={setPage}
        totalArticleCount={totalArticleCount}
      />
    </>
  );
}
