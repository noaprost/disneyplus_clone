import React from "react";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

export default function SwiperContainer({ children }) {
  return (
    <Swiper
      slidesPerView={6}
      spaceBetween={12}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
    >
      {children}
    </Swiper>
  );
}
