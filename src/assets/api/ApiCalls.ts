const apikey :string =`2f4a4c9a34f363132a65dbf88e922bc9`;
export const baseImagePath = (size: string, path: string) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
export const nowPlayingMovies: string = `https://api.themoviedb.org/3/movie/now_playing?api_key=2f4a4c9a34f363132a65dbf88e922bc9`;
export const upcomingMovies: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=2f4a4c9a34f363132a65dbf88e922bc9`;
export const popularMovies: string = `https://api.themoviedb.org/3/movie/popular?api_key=2f4a4c9a34f363132a65dbf88e922bc9`
export const searchMovies = (keyword: string) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=2f4a4c9a34f363132a65dbf88e922bc9&query=${keyword}`;
};
export const movieDetails = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`;
};
export const movieCastDetails = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`;
};
