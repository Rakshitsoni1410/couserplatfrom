import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { appStore } from "./app/store";
import { Toaster } from "./components/ui/sonner";
import { useLoadUserQuery } from "./features/api/authApi";
import SplashScreen from "./components/ui/SplashScreen"; // ✅ Import splash screen

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return <>{isLoading ? <SplashScreen /> : <>{children}</>}</>;  // ✅ Replaced <h1>loading</h1>
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <Custom>
        <App />
      </Custom>
      <Toaster />
    </Provider>
  </StrictMode>
);