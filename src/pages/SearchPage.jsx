import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SearchPage() {
  const param = useLocation();
  const searchKeyword = decodeURIComponent(param.search.split("=")[1]);
  const [searchResults, setSearchResults] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchMovies = async (query) => {
    try {
      const response = await axios.get("/search/movie", {
        params: {
          query,
          language: "ko-KR",
          region: "KR",
        },
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };

  useEffect(() => {
    searchMovies(searchKeyword);
    setIsClicked(false);
  }, [searchKeyword]);

  const handleClick = (movie) => {
    setSelectedMovie(movie);
    setIsClicked(true);
  };

  return (
    <div className="w-screen h-screen">
      {!isClicked && searchResults && searchResults.length > 0 && (
        <div className="flex flex-wrap px-36 py-20">
          {searchResults.map(
            (movie) =>
              movie.poster_path &&
              movie.backdrop_path && (
                <div
                  key={movie.id}
                  className="w-64 h-96 bg-cover bg-no-repeat m-6"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie.poster_path})`,
                  }}
                  onClick={() => handleClick(movie)}
                ></div>
              )
          )}
        </div>
      )}
      {isClicked && (
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w780${selectedMovie.backdrop_path})`,
          }}
          className="w-full h-full bg-cover overflow-hidden"
        ></div>
      )}
    </div>
  );
}
