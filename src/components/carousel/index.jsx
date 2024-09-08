// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./index.scss";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import axios from "axios";
import { useEffect, useState } from "react";
//Props  su dung khi cung la 1 component nhung co 2 cach su dung khac nhau thi cho  1 bien
//numberOfSlides => dinh nghia so luong slide cua carousel
//carousel => numberOfSlides = 3 => carousel show 3 item 1 luc
//default value props numberOfSlides khong truyen number cho no thi mac dinh la 1
export default function Carousel({
  numberOfSlides = 1,
  category = "Trending",
  autoplay = false,
}) {
  const [movies, setMovies] = useState([]);
  const fetchMovie = async () => {
    const response = await axios.get(
      "https://6628fc2b54afcabd0737b666.mockapi.io/Movie"
    );
    setMovies(response.data);
  };

  useEffect(() => {
    fetchMovie();
  }, []);
  return (
    <>
      <Swiper
        slidesPerView={numberOfSlides}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={autoplay ? [Autoplay, Navigation] : [Pagination]}
        className={`carousel ${numberOfSlides > 1 ? "multi-item" : ""}`}
      >
        {/* them dau ngoac nhon va dau huyen de chuyen thanh 1 bien
           - them ${} de chua bien
           -toan tu 3 ngoi [dieu kien] ? [neu dung] : [neu sai]  */}

        {/* cu moi movie trong movies = swiperSlide
            - movie => swiperSlide
            - no la 1 object => component
            -map
            -filter
            -cu moi movie la 1 swiperSlide
        */}

        {movies
          .filter((movie) => movie.category === category)
          .map((movie) => (
            <SwiperSlide>
              <img src={movie.poster_path} alt="" />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
