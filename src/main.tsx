import ReactDOM from "react-dom/client";
import { CalendarApp } from "./CalendarApp";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <CalendarApp />
  </Provider>,
);
