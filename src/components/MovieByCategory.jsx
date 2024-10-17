import axios from "../api/axios";
import { useEffect, useState } from "react";
import MovieByGenre from "./MovieByGenre";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function MovieByCategory() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

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

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalIsOpen(true);
    setScrollPosition(window.scrollY)
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedMovie(null);
    document.body.style.overflow = "auto";
    window.scrollTo(0, scrollPosition);
  };

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
            <div
              onClick={closeModal}
              className="absolute inset-0 cursor-pointer"
            />
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
            <div
              onClick={closeModal}
              className="absolute inset-0 cursor-pointer"
            />
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
