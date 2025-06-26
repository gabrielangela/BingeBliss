import MovieCard from './MovieCard';

const MovieList = ({ 
  movies, 
  loading, 
  error, 
  title, 
  onFavorite, 
  favorites = [] 
}) => {
  const isFavorite = (movieId) => {
    return favorites.some(fav => fav.id === movieId);
  };

  if (error) {
    return (
      <div className="movie-list-error">
        <h3>Error loading {title}</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="movie-list-loading">
        <h2>{title}</h2>
        <div className="loading-container">
          <div className="loading-spinner large"></div>
          <p>Loading {title.toLowerCase()}...</p>
        </div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="movie-list-empty">
        <h2>{title}</h2>
        <p>No movies found</p>
      </div>
    );
  }

  return (
    <div className="movie-list">
      <h2 className="movie-list-title">{title}</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onFavorite={onFavorite}
            isFavorite={isFavorite(movie.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;