import { IMAGE_BASE_URL } from '../services/movieAPI';

const MovieCard = ({ movie, onFavorite, isFavorite }) => {
  const posterUrl = movie.poster_path 
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : '/placeholder-movie.jpg';
    
  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onFavorite(movie);
  };

  return (
    <div className="movie-card">
      <div className="movie-poster-container">
        <img 
          src={posterUrl} 
          alt={movie.title}
          className="movie-poster"
          loading="lazy"
        />
        <button 
          className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? '#e50914' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </button>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">{releaseYear}</p>
        {movie.vote_average > 0 && (
          <div className="movie-rating">
            <span className="rating-star">★</span>
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;