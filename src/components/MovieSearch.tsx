import React, { useState, useEffect } from "react";
import axios from "axios";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Load saved search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    const API_KEY = "f9e907bd3ef642518e7d4614bd446f5c"; // Your TMDB API Key
    const BASE_URL = "https://api.themoviedb.org/3/search/movie";

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          api_key: API_KEY,
          query: query,
        },
      });

      setMovies(response.data.results);
      setSearchHistory([...searchHistory, query]); // Update search history
    } catch (error) {
      console.error("Error fetching data from TMDB API:", error);
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie"
        />
        <button type="submit">Search</button>
      </form>

      {movies.length === 0 && query && <p>No movies found for "{query}".</p>}

      <div>
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date}</p>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
