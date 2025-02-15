import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { appStore } from "./app/store"; // Import the appStore
import { Toaster } from "./components/ui/sonner";
import { useLoadUserQuery } from "./features/api/authApi";

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return <>{isLoading ? <h1> loading</h1> : <> {children} </>}</>;
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
