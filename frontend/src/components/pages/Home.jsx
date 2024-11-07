import React from "react";

const Home = () => {
  return (
    <>
      {/* <!-- Carousel Start --> */}
      <div className="carousel-header">
        <div id="carouselId" className="carousel slide" data-bs-ride="carousel">
          <ol className="carousel-indicators">
            <li
              data-bs-target="#carouselId"
              data-bs-slide-to="0"
              className="active"
            ></li>
            <li data-bs-target="#carouselId" data-bs-slide-to="1"></li>
            <li data-bs-target="#carouselId" data-bs-slide-to="2"></li>
          </ol>
          <div className="carousel-inner" role="listbox">
            <div className="carousel-item active">
              <img
                src="/static/assets/img/top-view-medicine-keyboard-arrangement.jpg"
                className="img-fluid"
                alt="Image"
              />
              <div className="carousel-caption">
                <div className="p-3" style={{ maxWidth: "900px" }}>
                  {/* <h4
                    className="text-white text-uppercase fw-bold mb-4"
                    style={{ letterSpacing: "3px" }}
                  >
                    Explore The World
                  </h4> */}
                  <h1 className="display-2  text-white mb-4">
                    Consult with Our Specialists
                  </h1>
                  <p className="mb-5 fs-5">
                    You are just a Click Away from Expert Medical Advice.
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="/static/assets/img/unsplash2.jpg"
                className="img-fluid"
                alt="Image"
              />
              <div className="carousel-caption">
                <div className="p-3" style={{ maxWidth: "900px" }}>
                  <h4
                    className="text-white text-uppercase fw-bold mb-4"
                    style={{ letterSpacing: "3px" }}
                  >
                    Be happy always
                  </h4>
                  <h1 className="display-2 text-capitalize text-white mb-4">
                    Find Your Perfect care At mediConsult
                  </h1>
                  <p className="mb-5 fs-5">
                    Your well being is our concern. 
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="/static/assets/img/unsplash3.jpg"
                className="img-fluid"
                alt="Image"
              />
              <div className="carousel-caption">
                <div className="p-3" style={{ maxWidth: "900px" }}>
                  <h4
                    className="text-white text-uppercase fw-bold mb-4"
                    style={{ letterSpacing: "3px" }}
                  >
                    Be happy always
                  </h4>
                  <h1 className="display-2 text-capitalize text-white mb-4">
                    Want some care?
                  </h1>
                  <p className="mb-5 fs-5">
                    It's just a few clicks away. Register with us and get free consultations now!!!
                  </p>
                  {/* <div className="d-flex align-items-center justify-content-center">
                    <a
                      className="btn-hover-bg btn btn-primary rounded-pill text-white py-3 px-5"
                      href="#"
                    >
                      Discover Now
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselId"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon btn bg-primary"
              aria-hidden="false"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselId"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon btn bg-primary"
              aria-hidden="false"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* <!-- Carousel End --> */}
    </>
  );
};

export default Home;
