import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import FileReport from "./pages/FileReport";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/file_report" element={<FileReport />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
