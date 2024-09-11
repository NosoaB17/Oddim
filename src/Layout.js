import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Hero from "./components/Hero/Hero";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SolutionCard from "./components/Solution/SolutionCard";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Hero />} />
          <Route index element={<SolutionCard />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Layout;
