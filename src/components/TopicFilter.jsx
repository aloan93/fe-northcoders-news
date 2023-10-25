import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

export default function TopicFilter({ currTopic }) {
  const [topics, setTopics] = useState([]);
  const [chosenFilter, setChosenFilter] = useState(null);

  function catchFilter(e) {
    setChosenFilter(e.target.value);
  }

  useEffect(() => {
    api
      .get("/topics")
      .then(({ data: { topics } }) => {
        setTopics(topics);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <form onChange={catchFilter}>
        <label className="topic-filter" htmlFor="topic">
          Filter by Topic:
        </label>
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
