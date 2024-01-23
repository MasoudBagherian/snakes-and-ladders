import Intro from "./pages/Intro";
import FindPath from "./pages/FindPath";
import SearchBoard from "./pages/SearchBoard";
import { Route, Routes } from "react-router-dom";
import Container from "./components/layout/Container";

function App() {
  return (
    <>
      <Container>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/find-path" element={<FindPath />} />
          <Route path="/search-board" element={<SearchBoard />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
