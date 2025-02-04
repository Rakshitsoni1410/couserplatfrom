import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login"; // Ensure this path is correct
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            {/* course section */}
          </>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
