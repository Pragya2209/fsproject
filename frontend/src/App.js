import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Article from "./pages/articleList/index";
import User from "./pages/userInfo/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Article />}></Route>
        <Route exact path="/info" element={<User />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
