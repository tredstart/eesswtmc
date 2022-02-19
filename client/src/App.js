import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Routing
import PrivateRoute from "./routing/PrivateRoute";

// Components
import Navbar from "./components/Navbar";

// Screens
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Sidebar from "./components/Sidebar";
import ErrorScreen from "./screens/ErrorScreen";

const App = () => {
  return (
    <Router>
      <main className="app">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Sidebar />} />
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
