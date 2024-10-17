import axios from "../api/axios";
import { useEffect, useState } from "react";
import MovieByGenre from "./MovieByGenre";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

export default function MovieByCategory() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState(null);

  const fetchMoviesByCategory = async () => {
    try {
      const [popularResponse, topRatedResponse] = await Promise.all([
        axios.get("/movie/popular", {
          params: { language: "ko-KR", region: "KR" },
        }),
        axios.get("/movie/top_rated", {
          params: { language: "ko-KR", region: "KR" },
        }),
      ]);

      setPopularMovies(popularResponse.data.results);
      setTopRatedMovies(topRatedResponse.data.results);
    } catch (error) {
      setError("Failed to fetch movies.");
      console.error("Error fetching movies:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get("/genre/movie/list", {
        params: { language: "ko-KR" },
      });
      setGenres(response.data.genres);
    } catch (error) {
      console.error("Failed to fetch genres", error);
    }
  };

  useEffect(() => {
    fetchMoviesByCategory();
    fetchGenres();
  }, []);

  useEffect(() => {
    console.log(genres);
  }, [genres]);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <h2 className="text-2xl font-bold mb-4 text-white mx-14 mt-20">
          인기 영화
        </h2>
        <div className="mx-14">
          <Swiper
            slidesPerView={6}
            spaceBetween={12}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
          >
            {popularMovies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <div
                  key={movie.id}
                  className="rounded-lg border-2 border-slate-700 hover:border-white overflow-hidden transition-colors ease-in-out"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.title}
                    className="rounded-md h-32 w-72 bg-center bg-cover bg-no-repeat shadow-2xl hover:scale-110 hover:opacity-75 transition-all ease-in-out"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-white mx-14 mt-24">
          평점 높은 영화
        </h2>
        <div className="mx-14">
          <Swiper
            slidesPerView={6}
            spaceBetween={12}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
          >
            {topRatedMovies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <div
                  key={movie.id}
                  className="rounded-lg border-2 border-slate-700 hover:border-white overflow-hidden transition-colors ease-in-out"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.title}
                    className="rounded-md h-32 w-72 bg-center bg-cover bg-no-repeat shadow-2xl hover:scale-110 hover:opacity-75 transition-all ease-in-out"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {genres && (
        <>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white mx-14 mt-24">
              {genres[8].name} 영화
            </h2>
            <MovieByGenre genreId={genres[8].id} />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-white mx-14 mt-24">
              {genres[0].name} 영화
            </h2>
            <MovieByGenre genreId={genres[0].id} />
          </div>
        </>
      )}
    </div>
  );
}
