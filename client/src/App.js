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

const App = () => {
  return (
    <Router>
      <main className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<ContentScreen />} />
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
