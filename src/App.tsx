import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/sign-up";
import SignIn from "./pages/sign-in";
import AuthProvider from "react-auth-kit";
import store from "./lib/auth";
import CreateReport from "./pages/home/create_report";
import Profile from "./pages/home/profile";
import ReportList from "./pages/home/report_list";
import AuthPage from "./components/auth/AuthPage";
import SideNav from "./components/navbar/sideNav";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { defaultQueryFn } from "./lib/query/queries";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    }
  }
});

function App() {
  return (
    <>
      <AuthProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <div className="flex flex-row">
            <BrowserRouter>
              <Routes>
                <Route element={<SideNav />}>
                  {/* <Route index element={<HomePage />} /> */}
                  <Route
                    index
                    path="/create-report"
                    element={<CreateReport />}
                  />
                  <Route path="/report-list" element={<ReportList />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
                <Route element={<AuthPage />}>
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </div>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
