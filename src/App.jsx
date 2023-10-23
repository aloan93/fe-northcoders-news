import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import Articles from "./components/Articles";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </>
  );
}

export default App;
