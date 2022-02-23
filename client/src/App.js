import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Routing
import PrivateRoute from "./routing/PrivateRoute";

// Components
import Navbar from "./components/Navbar";

// Screens
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ErrorScreen from "./screens/ErrorScreen";
import ContentScreen from "./screens/ContentScreen";
import Main from "./components/Main";

const App = () => {
  return (
    <Router>
      <main className="app">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<ContentScreen />}>
              <Route exact path="/" element={<Main />} />
            </Route>
          </Route>
          <Route exact path="/login" element={<LoginScreen />} />
          <Route exact path="/register" element={<RegisterScreen />} />
          <Route exact path="*" element={<ErrorScreen />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
