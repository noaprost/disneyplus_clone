import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ModalContainer from "../components/ModalContainer";
import useDebounce from "../hook/useDebounce";

export default function SearchPage() {
  const param = useLocation();
  const searchKeyword = decodeURIComponent(param.search.split("=")[1] || "");
  const [searchResults, setSearchResults] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);

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
    if (debouncedSearchKeyword) {
      searchMovies(debouncedSearchKeyword);
    } else {
      setSearchResults(null);
    }
  }, [debouncedSearchKeyword]);

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
    <div className="w-screen h-full">
      {searchResults && searchResults.length > 0 && (
        <>
          <div className="flex flex-wrap px-36 py-20">
            {searchResults.map(
              (movie) =>
                movie.poster_path &&
                movie.backdrop_path && (
                  <div
                    key={movie.id}
                    className="w-64 h-96 bg-cover bg-no-repeat m-6 hover:scale-110 transition-transform ease-in-out cursor-pointer"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie.poster_path})`,
                    }}
                    onClick={() => openModal(movie)}
                  ></div>
                )
            )}
          </div>
          <ModalContainer
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            selectedMovie={selectedMovie}
          />
        </>
      )}
    </div>
  );
}
