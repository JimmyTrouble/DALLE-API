import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebfa]">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-64 hover:w-32 object-contain"
          />
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-slate-100 min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
