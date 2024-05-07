import { Navigate, redirect } from "react-router-dom";

const HomePage = () => {

  return (
    <Navigate to="/sign-in" replace={true} />
  )
};

export default HomePage;
