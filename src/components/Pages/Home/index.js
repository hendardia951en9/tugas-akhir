import React, { useEffect } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, EffectCoverflow, Autoplay } from "swiper";

import ButtonRipple from "../../ButtonRipple";

//css
import "./home.css";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([EffectFade, EffectCoverflow, Autoplay]);

const Home = () => {
  console.log("render home");

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <>
      <section className="fade">
        <Swiper
          effect="fade"
          className="swiper-container-fade"
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          allowTouchMove={false}
        >
          <SwiperSlide>
            <img src="/assets/images/home/swiper_fade_1.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/images/home/swiper_fade_2.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/images/home/swiper_fade_3.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/images/home/swiper_fade_4.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/images/home/swiper_fade_5.jpg" alt="" />
          </SwiperSlide>
        </Swiper>
        <div className="swiper-description-fade">
          <h1>
            Create a Website<span>You're Proud Of</span>
          </h1>
          <p>
            Discover the platform that gives you the freedom to create, design,
            <span>
              manage and develop your web presence exactly the way you want.
            </span>
          </p>
          <ButtonRipple
            text="getting started"
            fa={<FontAwesomeIcon icon={faArrowRight} />}
            left={false}
          />
        </div>
      </section>

      <section className="coverflow">
        <Swiper
          effect="coverflow"
          className="swiper-container-coverflow"
          spaceBetween={50}
          loop={true}
          autoplay={{ delay: 3000 }}
          allowTouchMove={false}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          breakpoints={{
            800: { slidesPerView: 1 },
            1200: { slidesPerView: 2 },
            2400: { slidesPerView: 2 },
          }}
        >
          <SwiperSlide>
            <img src="/assets/images/home/swiper_fade_1.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/images/home/swiper_fade_2.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/images/home/swiper_fade_3.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/images/home/swiper_fade_4.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/images/home/swiper_fade_5.jpg" alt="" />
          </SwiperSlide>
        </Swiper>
        <div className="swiper-description-coverflow">
          <h5>
            The Freedom to Create
            <div>the Websites You Want</div>
          </h5>
          <div>
            <p>
              Design and build your own high-quality websites.
              <span>Whether you’re promoting your business, showcasing</span>
              <span>your work, opening your store or starting a blog—you</span>
              <span>can do it all with our website builder.</span>
            </p>
            <ButtonRipple text="start now" />
          </div>
        </div>
      </section>

      <section className="grid">
        <h5>
          Professionally Designed <div>Website Templates</div>
        </h5>
        <p>
          Choose from 500+ customizable website templates
          <span>that are built to meet your business needs</span>
        </p>
        <ButtonRipple text="see all templates" />
        <div className="grid-container">
          <div className="grid-item">
            <img src="/assets/images/home/swiper_fade_1.jpg" alt="" />
          </div>
          <div className="grid-item">
            <img src="/assets/images/home/swiper_fade_1.jpg" alt="" />
          </div>
          <div className="grid-item">
            <img src="/assets/images/home/swiper_fade_1.jpg" alt="" />
          </div>
          <div className="grid-item">
            <img src="/assets/images/home/swiper_fade_1.jpg" alt="" />
          </div>
          <div className="grid-item">
            <img src="/assets/images/home/swiper_fade_1.jpg" alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;