import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/sign-up";
import SignIn from "./pages/sign-in";
import AuthProvider from "react-auth-kit";
import store from "./lib/auth";
import HomePage from "./pages/home";
import SideNav from "./components/navbar/sideNav";
import CreateReport from "./pages/home/create_report";
import Profile from "./pages/home/profile";
import ReportList from "./pages/home/report_list";

function App() {
  return (
    <>
      <AuthProvider store={store}>
        <div className="flex flex-row">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SideNav />}>
                <Route index element={<HomePage />} />
                <Route path="create_report" element={<CreateReport />} />
                <Route path="report_list" element={<ReportList />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} index />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
