import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";

import StreamList from "./components/StreamList";

import Movies from "./components/Movies";

import Cart from "./components/Cart";

import About from "./components/About";

import MovieSearch from "./components/MovieSearch";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />

        <Routes>
          <Route path="/" element={<StreamList />} />

          <Route path="/movies" element={<Movies />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/about" element={<About />} />

          <Route path="/search" element={<MovieSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
