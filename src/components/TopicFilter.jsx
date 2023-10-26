import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import Error from "./Error";

export default function TopicFilter({ currTopic }) {
  const [topics, setTopics] = useState([]);
  const [chosenFilter, setChosenFilter] = useState(null);
  const [error, setError] = useState(null);

  function catchFilter(e) {
    setChosenFilter(e.target.value);
  }

  useEffect(() => {
    api
      .get("/topics")
      .then(({ data: { topics } }) => {
        setTopics(topics);
      })
      .catch(() => {
        setError("Cannot retrieve topics right now. Please try again later");
      });
  }, []);

  return (
    <>
      <form onChange={catchFilter}>
        <label className="topic-filter" htmlFor="topic">
          Filter by Topic:
        </label>
        {!error ? (
          <select
            className="topic-filter"
            type="text"
            id="topic"
            defaultValue="choose"
            required>
            <option key="placeholder" value="choose" hidden>
              ---Topic---
            </option>
            {topics.map((topic) => {
              if (topic.slug === currTopic) return;
              return (
                <option key={topic.slug} value={topic.slug}>
                  {topic.slug}
                </option>
              );
            })}
          </select>
        ) : (
          <Error error={error} />
        )}
      </form>
      {chosenFilter && (
        <Link
          className="topic-filter-link"
          to={`/articles/topics/${chosenFilter}`}>
          Filter
        </Link>
      )}
      {currTopic && (
        <p className="topic-curr-filter">Current Filter: {currTopic}</p>
      )}
    </>
  );
}
