import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import FileReport from "./pages/FileReport";
import SignUp from "./pages/sign-up";
import SignIn from "./pages/sign-in";
import AuthProvider from 'react-auth-kit';
import store from './lib/auth'
function App() {
  return (
    <>
    <AuthProvider store={store}>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Routes>
          <Route path="/file-report" element={<FileReport />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
