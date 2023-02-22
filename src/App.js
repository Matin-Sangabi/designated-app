import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useEffect } from "react";
import routes from "./routes";

function App() {
  useEffect(() => {
    document.title = "Maher Bus";
  }, []);
  return (
    <Provider store={store}>
      <div className="w-full relative">
        <Routes>
          {routes.map((route , i) => {
            return (
              <Route key={i} {...route} />
            )
          })}
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
