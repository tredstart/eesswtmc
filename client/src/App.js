import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Routing
import PrivateRoute from "./routing/PrivateRoute";

// Components
import Navbar from "./components/Navbar";

// Screens
import LoginScreen from "./screens/LoginScreen";
import PrivateScreen from "./screens/PrivateScreen";
import RegisterScreen from "./screens/RegisterScreen";

const App = () => {
  return (
    <Router>
      <Navbar />

      <main>
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<PrivateScreen />} />
          </Route>
          <Route exact path="/login" element={<LoginScreen />} />
          <Route exact path="/register" element={<RegisterScreen />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
