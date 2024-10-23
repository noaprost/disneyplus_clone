import axios from "../api/axios";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import SwiperContainer from "./SwiperContainer";
import ModalContainer from "./ModalContainer";

export default function MovieByGenre({ genreId }) {
  const [movies, setMovies] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

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

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalIsOpen(true);
    setScrollPosition(window.scrollY);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedMovie(null);
    document.body.style.overflow = "auto";
    window.scrollTo(0, scrollPosition);
  };

  return (
    <div className="mx-14 mb-24">
      <SwiperContainer>
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              key={movie.id}
              className="rounded-lg border-2 border-slate-700 hover:border-white overflow-hidden transition-colors ease-in-out"
              onClick={() => openModal(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
                className="rounded-md h-32 w-72 bg-center bg-cover bg-no-repeat shadow-2xl hover:scale-110 hover:opacity-75 transition-all ease-in-out"
              />
            </div>
          </SwiperSlide>
        ))}
      </SwiperContainer>
      <ModalContainer
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        selectedMovie={selectedMovie}
      />
    </div>
  );
}
