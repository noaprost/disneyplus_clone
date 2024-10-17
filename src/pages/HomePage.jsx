import axios from "../api/axios";
import { useEffect, useState } from "react";
import VideoButton from "../components/ui/VideoButton";
import MovieByCategory from "../components/MovieByCategory";

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  const fetchDisneyPlusMovies = async () => {
    try {
      const response = await axios.get("/discover/movie", {
        params: {
          with_watch_providers: 337,
          watch_region: "KR",
          language: "ko-KR",
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error("Failed to fetch movies from Disney Plus", error);
    }
  };

  useEffect(() => {
    fetchDisneyPlusMovies();
  }, []);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  return (
    <>
      {movies && (
        <>
          {/* 메인 영화 */}
          <div className="pt-20">
            <div
              className="h-124 mx-24 bg-center bg-no-repeat shadow-2xl"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w780${movies[0].poster_path})`,
              }}
            >
              <div className="flex flex-col h-full w-full p-12 justify-evenly pt-44">
                <p className="text-white text-4xl font-bold">
                  {movies[0].title}
                </p>
                <button className="bg-white py-1 px-4 rounded-md font-bold w-20 hover:bg-slate-300 transition-colors ease-in-out">
                  PLAY
                </button>
                <p className="text-white text-wrap w-72 line-clamp-3 text-sm">
                  {movies[0].overview}
                </p>
              </div>
            </div>
          </div>
          {/* 영화사 버튼 */}
          <div className="flex justify-around mx-24">
            <VideoButton name={"disney"} />
            <VideoButton name={"pixar"} />
            <VideoButton name={"marvel"} />
            <VideoButton name={"starwars"} />
            <VideoButton name={"national"} />
          </div>
        </>
      )}
      {/* 카테고리 별 영화 */}
      <MovieByCategory />
    </>
  );
}
