import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function ArticleCard({ article, timeConversion, topic }) {
  const [isLoading, setIsLoading] = useState(true);
  const [articleImage, setArticleImage] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/articles/${article.article_id}`)
      .then(({ data: { article } }) => {
        setArticleImage(article.article_img_url);
        setIsLoading(false);
      })
      .catch(() => {
        setArticleImage(
          "https://cdn.vectorstock.com/i/preview-1x/18/04/no-photo-available-icon-default-image-symbol-vector-40461804.jpg"
        );
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="article-card">
      <div className="article-card-info">
        <p className="article-card-title">
          <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
        </p>
        <p className="article-card-author">by {article.author}</p>
        <p className="article-card-date">{timeConversion.toString()}</p>
        {!topic && (
          <p className="article-card-topic">
            {"Topic: "}
            <Link to={`/topics/${article.topic}`}>{article.topic}</Link>
          </p>
        )}
        <div className="article-card-metrics">
          <p>Votes: {article.votes}</p>
          <p>Comment Count: {article.comment_count}</p>
        </div>
      </div>
      <img
        className="article-card-image"
        src={articleImage}
        alt="image to reflect the content of the article"
      />
    </div>
  );
}
