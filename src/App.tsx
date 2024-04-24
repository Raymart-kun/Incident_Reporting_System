import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import FileReport from "./pages/FileReport";
import SignUp from "./pages/sign-up";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/file_report" element={<FileReport />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
