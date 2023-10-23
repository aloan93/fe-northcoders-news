import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <Link to="/">HOME</Link>
      {" | "}
      <Link to="/articles">Articles</Link>
    </nav>
  );
}
