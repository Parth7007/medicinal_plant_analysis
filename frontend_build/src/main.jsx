import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Hero from "./Components/Hero";
import Contact from "./Components/Contact";
import About from "./Components/About";
import FAQ from "./Components/FAQ";
import SBI from "./Components/SBI";
import GIB from "./Components/GIB";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Hero /> },
      { path: "contact", element: <Contact /> },
      { path: "about", element: <About /> },
      { path: "faq", element: <FAQ /> },
      { path: "search-by-image", element: <SBI /> },
      { path: "get-info-by-prompt", element: <GIB /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
