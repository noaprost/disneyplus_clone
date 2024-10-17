import axios from "../api/axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

export default function MovieByGenre({ genreId }) {
  const [movies, setMovies] = useState([]);

  const fetchMoviesByGenre = async () => {
    try {
      const response = await axios.get("/discover/movie", {
        params: {
          with_genres: genreId,
          language: "ko-KR",
          region: "KR",
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error("Failed to fetch movies by genre", error);
    }
  };

  useEffect(() => {
    fetchMoviesByGenre();
  }, [genreId]);

  return (
    <div className="mx-14 mb-24">
      <Swiper
        slidesPerView={6}
        spaceBetween={12}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {movies.map((movie) => (
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
  );
}
