import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import Loading from "./Loading";
import Error from "./Error";
import VotesManager from "./VotesManager";
import Comments from "./Comments";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    api
      .get(`/articles/${article_id}`)
      .then(({ data: { article } }) => {
        setIsLoading(false);
        setArticle(article);
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
  }, []);

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
    <div className="single-article">
      {article && (
        <>
          <h2>{article.title}</h2>
          <h3>by {article.author}</h3>
          <p>{article.created_at}</p>
          <p>{article.topic}</p>
          <img
            className="article-image"
            src={article.article_img_url}
            alt={`an author supplied image to make the article`}
          />
          <article>{article.body}</article>
          <VotesManager
            elementId={article.article_id}
            elementVotes={article.votes}
            setElement={setArticle}
            path="articles"
          />
          <Comments article_id={article_id} setArticle={setArticle} />
        </>
      )}
    </div>
  );
}
