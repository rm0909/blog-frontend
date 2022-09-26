import "./App.css";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Admin } from "./components/Admin.jsx";
import { Post } from "./components/Post.jsx";
function App() {
  return (
    <div id="App">
      <Routes>
        <Route path="/" element={<>HOME</>} />
        <Route path="/post" element={<Post />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
