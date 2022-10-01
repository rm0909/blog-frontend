import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Admin } from "./components/Admin.jsx";
import { Post } from "./components/Post.jsx";
import { Home } from "./components/Home.jsx";
import { Article } from "./components/article/Article.jsx";
function App() {
  return (
    <div id="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artigo/:id" element={<Article />} />
        <Route path="/post" element={<Post />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
