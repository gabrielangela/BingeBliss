import { useState, useRef } from 'react';
import MovieCard from './MovieCard';

const MovieCarousel = ({ 
  movies, 
  loading, 
  error, 
  title, 
  onFavorite, 
  favorites = [] 
}) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const isFavorite = (movieId) => {
    return favorites.some(fav => fav.id === movieId);
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  if (error) {
    return (
      <div className="movie-carousel-error">
        <h3>Error loading {title}</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="movie-carousel-loading">
        <h2 className="carousel-title">{title}</h2>
        <div className="loading-container">
          <div className="loading-spinner large"></div>
          <p>Loading {title.toLowerCase()}...</p>
        </div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="movie-carousel-empty">
        <h2 className="carousel-title">{title}</h2>
        <p>No movies found</p>
      </div>
    );
  }

  return (
    <div className="movie-carousel">
      <h2 className="carousel-title">{title}</h2>
      <div className="carousel-container">
        {showLeftArrow && (
          <button 
            className="carousel-arrow carousel-arrow-left" 
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
        )}
        
        <div 
          className="carousel-scroll"
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="carousel-item">
              <MovieCard
                movie={movie}
                onFavorite={onFavorite}
                isFavorite={isFavorite(movie.id)}
              />
            </div>
          ))}
        </div>

        {showRightArrow && (
          <button 
            className="carousel-arrow carousel-arrow-right" 
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCarousel;