import axios from "../api/axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Modal from "react-modal";

Modal.setAppElement("#root");

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
      </Swiper>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-25"
      >
        <div onClick={closeModal} className="absolute inset-0 cursor-pointer" />
        {selectedMovie && (
          <div className="bg-neutral-900 rounded-xl max-w-xl w-full overflow-hidden z-10">
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`}
              alt={selectedMovie.title}
              className="w-full h-72 bg-center"
            />
            <p className="text-neutral-400 px-6 mt-4">
              {selectedMovie.release_date}
            </p>
            <p className="text-2xl font-bold text-white p-6">
              {selectedMovie.title}
            </p>
            <p className="text-white px-6 pb-6 text-sm">
              평점 : {selectedMovie.vote_average}
            </p>
            <p className="text-white px-6 pb-6">{selectedMovie.overview}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
