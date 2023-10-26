import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import Loading from "./Loading";
import Error from "./Error";
import VotesManager from "./VotesManager";
import Comments from "./Comments";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let timeConversion;
  if (article) {
    timeConversion = new Date(article.created_at);
  }

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    api
      .get(`/articles/${article_id}`)
      .then(({ data: { article } }) => {
        setIsLoading(false);
        setArticle(article);
      })
      .catch(({ response: { status } }) => {
        setIsLoading(false);
        if (status === 404) {
          setError("Oops! Could not find the article you are looking for");
        } else if (status === 400) {
          setError(
            "Oops! I can only find articles on whole, postive, numerical values (eg. 1, 5, 38 etc.)"
          );
        } else {
          setError("Oops! Something went wrong. Please try again later");
        }
      });
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <div className="single-article">
      {article && timeConversion && (
        <>
          <h2>{article.title}</h2>
          <h3>by {article.author}</h3>
          <p>{timeConversion.toString()}</p>
          <p>
            <Link to={`/articles/topics/${article.topic}`}>
              {article.topic}
            </Link>
          </p>
          <img
            className="article-image"
            src={article.article_img_url}
            alt={`an author supplied image to make the article`}
          />
          <article>{article.body}</article>
          <VotesManager
            elementId={article.article_id}
            elementVotes={article.votes}
            path="articles"
            elementAuthor={article.author}
          />
          <Comments
            article_id={article_id}
            comment_count={article.comment_count}
          />
        </>
      )}
    </div>
  );
}
