import { useState } from "react";

export default function VideoButton({ name }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <div
        className="relative flex items-center justify-center w-60 h-32 border-2 border-white rounded-xl hover:scale-110 transition-transform ease-in-out duration-300 shadow-2xl mt-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button className="absolute z-10 w-full h-full bg-transparent text-white text-xl font-bold">
          <img
            className="h-full mx-auto"
            src={`/images/viewers-${name}.png`}
            alt={`${name}`}
          ></img>
        </button>

        {isHovered && (
          <video
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
            src={`/videos/${name}.mp4`}
            autoPlay
            muted
            loop
          />
        )}
      </div>
    </>
  );
}
