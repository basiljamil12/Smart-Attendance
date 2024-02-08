import "../App.css";
import React, { useState, useEffect } from "react";
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RoleSelect from "../pages/role_selection";

function Layout() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className={`App`}>
      <div className="App-content">
        <Routes>
          <Route
            path="/"
            element={<RoleSelect />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default Layout;
