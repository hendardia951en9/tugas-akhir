import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { openInNewTab } from "../../../utils/openInNewTab";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, EffectCoverflow, Autoplay } from "swiper";
import { useHistory } from "react-router-dom";

import ButtonRipple from "../../ButtonRipple";

//css
import "./home.css";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([EffectFade, EffectCoverflow, Autoplay]);

const Home = () => {
  const appContext = useContext(AppContext);

  const encryptStorage = EncryptStorage(
    `${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`
  );
  const history = useHistory();
  const [themes, setThemes] = useState([]);

  const fetchThemes = () => {
    appContext.setIsLoading(true);

    axios
      .get(`${process.env.REACT_APP_SITE_API_URL}/getthemes`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        setThemes(res.data.result);
      })
      .catch((err) => {
        //error
        if (err.response) {
          console.log("res error", err.response.data);
        } else if (err.request) {
          console.log("req error", err.request.data);
        } else {
          console.log("Error", err.message);
        }
        appContext.setIsLoading(false);
      });
  };

  const handleClickGettingStarted = () => {
    if (encryptStorage.getItem("user_logged_in")) {
      history.push("/gettingstarted");
    } else {
      history.push("/signin");
    }
  };

  useEffect(() => {
    document.title = "Home";
    fetchThemes();
    // eslint-disable-next-line
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
        <ButtonRipple
          onClick={() => {
            history.push("/themelist");
          }}
          text="see all templates"
        />
        <div
          className="grid-container"
          style={{
            backgroundImage: "url('/assets/images/home/themes_background.jpg')",
          }}
        >
          {themes
            ? themes.map((props) => {
                const { theme_id, theme_thumbnail_image_name } = props;

                return (
                  <div
                    className="grid-item"
                    key={theme_id}
                    onClick={(e) => {
                      openInNewTab(
                        `${process.env.REACT_APP_BASE_URL}/theme/${theme_id}/home`
                      );
                    }}
                  >
                    <img
                      src={`${process.env.REACT_APP_BASE_API_URL}/public/admin/images/${theme_thumbnail_image_name}`}
                      alt=""
                    />
                    {/* <div className="grid-item-text">{theme_name}</div> */}
                  </div>
                );
              })
            : "no themes"}
        </div>
      </section>
    </div>
  );
};

export default Home;
