import React, { useState, useEffect } from "react";

function StreamList() {
  const [movies, setMovies] = useState<
    { id: number; title: string; watched: boolean }[]
  >([]);
  const [input, setInput] = useState("");

  // Load saved movies from localStorage
  useEffect(() => {
    const savedMovies = localStorage.getItem("movies");
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
    }
  }, []);

  // Save movies to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMovie = { id: Date.now(), title: input, watched: false };
      setMovies([...movies, newMovie]);
      setInput("");
      localStorage.setItem("movies", JSON.stringify([...movies, newMovie])); // Ensure localStorage updates immediately
    }
  };

  const handleDelete = (id: number) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  };

  const toggleWatched = (id: number) => {
    const updatedMovies = movies.map((movie) =>
      movie.id === id ? { ...movie, watched: !movie.watched } : movie
    );
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  };

  return (
    <div>
      <h1>Your StreamList</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a movie"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <span
              style={{
                textDecoration: movie.watched ? "line-through" : "none",
                color: movie.watched ? "#7f8c8d" : "#2c3e50",
              }}
            >
              {movie.title}
            </span>
            <div>
              <button onClick={() => toggleWatched(movie.id)}>
                {movie.watched ? "Unwatch" : "Watch"}
              </button>
              <button onClick={() => handleDelete(movie.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;
