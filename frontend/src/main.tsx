import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";
import "./styles/scroll.css";
import "./styles/modal.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
  //</React.StrictMode>
);
