import { render } from "react-dom";
import { Provider } from "react-redux";

import "./index.css";

import App from "./App";
import { default as store, RootState } from "./store";
import reportWebVitals from "./reportWebVitals";

// Save changes to localStorage
store.subscribe(() => {
  if (window) {
    const storeInstance = store;
    const currentState = storeInstance.getState();
    localStorage.setItem("app", JSON.stringify(currentState));
  }
});

if (localStorage.getItem("app")) {
  const appState: RootState = JSON.parse(localStorage.getItem("app") as string);
  // This will only fire once, when the app loads
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
