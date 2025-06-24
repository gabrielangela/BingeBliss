import { useState, useEffect } from 'react';
import { movieAPI } from '../services/movieAPI';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Fetch popular movies on component mount
  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await movieAPI.getPopularMovies();
      setMovies(data.results || []);
      setSearchMode(false);
      setSearchQuery('');
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      console.error('Error fetching popular movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const data = await movieAPI.searchMovies(query);
      setMovies(data.results || []);
      setSearchMode(true);
      setSearchQuery(query);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (movie) => {
    const updatedFavorites = favorites.some(fav => fav.id === movie.id)
      ? favorites.filter(fav => fav.id !== movie.id)
      : [...favorites, movie];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('movieFavorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (movieId) => {
    return favorites.some(fav => fav.id === movieId);
  };

  if (error) {
    return (
      <div className="main-content">
        <div className="container">
          <div className="error-message">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={fetchPopularMovies}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="container">
        <div className="page-header">
          <h1>{searchMode ? `Search Results for "${searchQuery}"` : 'Popular Movies'}</h1>
          {searchMode && (
            <button className="btn btn-secondary" onClick={fetchPopularMovies}>
              Back to Popular
            </button>
          )}
        </div>

        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner large"></div>
            <p>Loading movies...</p>
          </div>
        ) : movies.length > 0 ? (
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onFavorite={toggleFavorite}
                isFavorite={isFavorite(movie.id)}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No movies found</h3>
            <p>Try searching for something else</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;