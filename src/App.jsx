import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/articles/topics/:topic" element={<Articles />} />
      </Routes>
    </>
  );
}

export default App;
