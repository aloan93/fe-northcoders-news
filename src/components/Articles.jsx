import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import PageNav from "./PageNav";
import TopicFilter from "./TopicFilter";
import { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingCon";
import { ErrorContext } from "../contexts/ErrorCon";
import Loading from "./Loading";
import Error from "./Error";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [totalArticleCount, setTotalArticleCount] = useState(null);
  const [page, setPage] = useState(1);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { error, setError } = useContext(ErrorContext);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    api
      .get(`/articles?p=${page}`)
      .then(({ data: { total_count, articles } }) => {
        setIsLoading(false);
        setArticles(articles);
        setTotalArticleCount(total_count);
      })
      .catch(
        ({
          response: {
            data: { message },
            status,
            statusText,
          },
        }) => {
          setIsLoading(false);
          setError({ status, message, statusText });
        }
      );
  }, [page]);

  if (isLoading) return <Loading />;
  if (error)
    return (
      <Error
        status={error.status}
        message={error.message}
        statusText={error.statusText}
      />
    );
  return (
    <>
      <TopicFilter />
      <ul>
        {articles.map((article) => {
          return (
            <li className="article-card" key={article.article_id}>
              <p className="article-title-list">
                <Link to={`/articles/${article.article_id}`}>
                  {article.title}
                </Link>
              </p>
              <p>by {article.author}</p>
              <p>{article.created_at}</p>
              <p>{article.topic}</p>
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
