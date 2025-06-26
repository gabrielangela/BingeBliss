import { useState, useEffect } from 'react';
import { movieAPI } from '../services/movieAPI';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState({
    popular: true,
    trending: true,
    search: false
  })
  const [error, setError] = useState({
    popular: null,
    trending: null,
    search: null
  });
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
    fetchTrendingMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      setLoading(prev => ({ ...prev, popular: true }));
      setError(prev => ({ ...prev, popular: null }));
      const data = await movieAPI.getPopularMovies();
      setPopularMovies(data.results || []);
    } catch (err) {
      setError(prev => ({ ...prev, popular: 'Failed to fetch popular movies' }));
      console.error('Error fetching popular movies:', err);
    } finally {
      setLoading(prev => ({ ...prev, popular: false }));
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      setLoading(prev => ({ ...prev, trending: true }));
      setError(prev => ({ ...prev, trending: null }));
      const data = await movieAPI.getTrendingMovies();
      setTrendingMovies(data.results || []);
    } catch (err) {
      setError(prev => ({ ...prev, trending: 'Failed to fetch trending movies' }));
      console.error('Error fetching trending movies:', err);
    } finally {
      setLoading(prev => ({ ...prev, trending: false }));
    }
  }

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    try {
      setLoading(prev => ({ ...prev, search: true }));
      setError(prev => ({ ...prev, search: null }));
      const data = await movieAPI.searchMovies(query);
      setMovies(data.results || []);
      setSearchMode(true);
      setSearchQuery(query);
    } catch (err) {
      setError(prev => ({ ...prev, search: 'Failed to search movies' }));
      console.error('Error searching movies:', err);
    } finally {
      setLoading(prev => ({ ...prev, search: false }));
    }
  };

  const clearSearch = () => {
    setSearchMode(false);
    setSearchQuery('');
    setSearchResults([]);
    setError(prev => ({ ...prev, search: null }));
  }

  const toggleFavorite = (movie) => {
    const updatedFavorites = favorites.some(fav => fav.id === movie.id)
      ? favorites.filter(fav => fav.id !== movie.id)
      : [...favorites, movie];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('movieFavorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="main-content">
      <div className="container">
        {/* Hero Section */}
        <div className="hero-section">
          <h1 className="hero-title">Discover Amazing Movies</h1>
          <p className="hero-subtitle">
            Find your next favorite film from thousands of movies
          </p>
        </div>

        {/* Search Section */}
        <SearchBar onSearch={handleSearch} isLoading={loading.search} />

        {searchMode && (
          <div className="search-header">
            <h2>Search Results for "{searchQuery}"</h2>
            <button className="btn btn-secondary" onClick={clearSearch}>
              Clear Search
            </button>
          </div>
        )}

        {/* Search Results */}
        {searchMode && (
          <MovieList
            movies={searchResults}
            loading={loading.search}
            error={error.search}
            title={`Found ${searchResults.length} results`}
            onFavorite={toggleFavorite}
            favorites={favorites}
          />
        )}

        {/* Popular and Trending Movies */}
        {!searchMode && (
          <div className="movie-sections">
            <MovieList
              movies={trendingMovies}
              loading={loading.trending}
              error={error.trending}
              title="🔥 Trending This Week"
              onFavorite={toggleFavorite}
              favorites={favorites}
            />
            
            <MovieList
              movies={popularMovies}
              loading={loading.popular}
              error={error.popular}
              title="⭐ Popular Movies"
              onFavorite={toggleFavorite}
              favorites={favorites}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;