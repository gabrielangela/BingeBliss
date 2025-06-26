import { useState, useEffect } from 'react';
import MovieCarousel from '../components/MovieCarousel';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const removeFavorite = (movie) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
    setFavorites(updatedFavorites);
    localStorage.setItem('movieFavorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="main-content">
      <div className="container">
        <div className="page-header">
          <h1>My Favorites</h1>
          <span className="favorites-count">
            {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'}
          </span>
        </div>

        {favorites.length > 0 ? (
          <MovieCarousel
          movies={favorites}
          title="Your Favorite Movies"
          onFavorite={removeFavorite}
          favorites={favorites}
          />
        ) : (
          <div className="no-favorites">
            <div className="no-favorites-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h3>No favorites yet</h3>
            <p>Start exploring movies and add them to your favorites!</p>
            <a href="/" className="btn btn-primary">
              Browse Movies
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;