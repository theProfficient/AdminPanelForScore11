import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import BasicForm from "./components/forms/basicForm";
import Home from "./routes/Home";
import Dashboard from "./routes/Dashboard";
import Contact from "./routes/Contact";
import Games from "./routes/Games";
import CreateTournament from "./routes/CreateTournament";
import Cricket from "./components/games/Cricket";
import SnakeLadder from "./components/games/SnakeLadder";
import UserHistory from "./components/UserHistory";
import CricketGroups from "./components/games/CricketGroups";
import CricketMatchData from "./components/games/CricketMatchData";
import SnkGroups from "./components/games/SnkGroups";
import SnkMatchData from "./components/games/SnkMatchData";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            !isLoggedIn ? (
              <BasicForm onLogin={handleLogin} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/games"
          element={isLoggedIn ? <Games /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/contact"
          element={isLoggedIn ? <Contact /> : <Navigate to="/" />}
        />
        <Route
          path="/createTournament"
          element={isLoggedIn ? <CreateTournament /> : <Navigate to="/" />}
        />{" "}
        {/* Update the route path and component name */}
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/" />}
        />
        <Route path="/games/cricket" element={<Cricket />} />
        <Route path="/games/cricket/Groups" element={<CricketGroups />} />
        <Route path="/cricket/groupsData/players" element={<CricketMatchData/>} />
        <Route path="/games/snakeLadder" element={<SnakeLadder />} />
        <Route path="/games/snakeLadder/Groups" element={<SnkGroups />} />
        <Route path="/snakeLadder/groupsData/players" element={<SnkMatchData/>} />
        <Route path="/user/history" element={<UserHistory />} />
        
      </Routes>
    </>
  );
}

export default App;