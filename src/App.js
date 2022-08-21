import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Article from './pages/Article';
import ArticleList from './pages/ArticleList';
import Navbar from './components/Navbar';
import Error from './pages/Error';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Navbar />
      <div id="page-body">
        <Routes>
          <Route path="/" element={<Home />} exact/>
          <Route path="/about" element={<About />}/>
          <Route path="/article-list" element={<ArticleList />}/>
          <Route path="/article/:name" element={<Article />}/>
          <Route path="*" element={<Error to="/error" replace/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;