import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/ui/Navbar"; // Ensure this path is correct
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
            {/* course*/}
          </>
        ),
      },
    ],
  },
]);
function App() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <Login />
    </main>
  );
}

export default App;
