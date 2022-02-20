import React from "react";
import "./App.css";
import { Login } from "./app/Login";
import { Link, HashRouter as Router, Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <div className="flex  h-screen w-screen justify-center items-center">
      <Router>
        <Link to="/login" />
        <Link to="/register" />
        <Link to="/app" />
        <Routes>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">Register</Route>
          <Route path="/app">This is the app!</Route>
        </Routes>
      </Router>
    </div>
  );
};
