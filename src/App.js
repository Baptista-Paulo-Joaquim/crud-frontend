import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./elements/Home"
import Create from "./elements/Create"
import Read from "./elements/Read"
import Edit from "./elements/Edit"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home /> }/>
        <Route path="/create" element={<Create />} />
        <Route path="/user/:id" element={<Read />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;