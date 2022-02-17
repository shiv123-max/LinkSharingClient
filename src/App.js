import React from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewAll from "./pages/ViewAll";
import ViewFile from "./pages/ViewFile";
import AccessLogs from "./pages/AccessLogs"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/allFiles" element={<ViewAll />} />
        <Route path="/file/:id" element={<ViewFile />} />
        <Route path="/logs/:id" element={<AccessLogs />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
