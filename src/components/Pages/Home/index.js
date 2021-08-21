import React, { useEffect } from "react";
import { EncryptStorage } from "encrypt-storage";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, EffectCoverflow, Autoplay } from "swiper";
import { useHistory } from "react-router-dom";

import ButtonRipple from "../../ButtonRipple";

//css
import "./home.css";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([EffectFade, EffectCoverflow, Autoplay]);

const Home = () => {
  const encryptStorage = EncryptStorage(
    `${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`
  );
  const history = useHistory();

  const handleClickGettingStarted = () => {
    if (encryptStorage.getItem("userLoggedIn")) {
      history.push("/gettingstarted");
    } else {
      history.push("/signin");
    }
  };

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div className="home">
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
          <SwiperSlide className="swiper-slide">
            <img src="/assets/images/home/swiper_fade_1.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src="/assets/images/home/swiper_fade_2.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src="/assets/images/home/swiper_fade_3.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src="/assets/images/home/swiper_fade_4.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
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
            fa={<FontAwesomeIcon icon={faArrowRight} />}
            iconIsLeft={false}
            onClick={handleClickGettingStarted}
            text="getting started"
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
            depth: 0,
            modifier: 1,
            slideShadows: true,
          }}
          breakpoints={{
            800: { slidesPerView: 1 },
            1200: { slidesPerView: 2 },
          }}
        >
          <SwiperSlide className="swiper-slide">
            <img src="/assets/images/home/swiper_coverflow_1.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src="/assets/images/home/swiper_coverflow_2.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src="/assets/images/home/swiper_coverflow_3.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src="/assets/images/home/swiper_coverflow_4.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src="/assets/images/home/swiper_coverflow_5.jpg" alt="" />
          </SwiperSlide>
        </Swiper>
        <div className="swiper-description-coverflow-container">
          <div className="swiper-description-coverflow">
            <h5>
              The Freedom to Create
              <div>the Websites You Want</div>
            </h5>
            <div className="swiper-description-coverflow-content">
              <p>
                Design and build your own high-quality websites.
                <span>Whether you’re promoting your business, showcasing</span>
                <span>
                  your work, opening your store or starting a blog—you
                </span>
                <span>can do it all with our website builder.</span>
              </p>
              <ButtonRipple
                onClick={handleClickGettingStarted}
                text="start now"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid">
        <h5>
          Professionally Designed <span>Website Templates</span>
        </h5>
        <p>
          Choose from 500+ customizable website templates
          <span>that are built to meet your business needs</span>
        </p>
        <ButtonRipple text="see all templates" />
        <div
          className="grid-container"
          style={{
            backgroundImage: "url('/assets/images/home/swiper_fade_1.jpg')",
          }}
        >
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
    </div>
  );
};

export default Home;
