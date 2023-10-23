import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

export default function TopicFilter() {
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
      .catch(() => {});
  }, []);

  return (
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
          return (
            <option key={topic.slug} value={topic.slug}>
              {topic.slug}
            </option>
          );
        })}
      </select>
      {chosenFilter && <Link to={`/articles/${chosenFilter}`}>Filter</Link>}
    </form>
  );
}
