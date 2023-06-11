import { Routes, Route } from "react-router-dom"
import Header from "./layouts/heder"
import Home from "./pages/home"
import Movies from "./pages/movies"
import Series from "./pages/series"
import Search from "./pages/search"
import SingleMovie from "./pages/singeMovie"
import About from "./pages/about"

function App() {
  
  // test to remember
  // window.electron.ipcRenderer.invoke("save", "what").then(v => {
  //   console.log(v);
  // })

  return (
    <div className="Main h-screen">
      <Header/>
      <div className="panel">
        <Routes>
          <Route path="/"  element={<Home />}/>
          <Route path="/movies"  element={<Movies />}/>
          <Route path="/series"  element={<Series />}/>
          <Route path="/about"  element={<About />}/>
          <Route path="/search"  element={<Search />}/>
          <Route path="/movie/:id"  element={<SingleMovie />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
