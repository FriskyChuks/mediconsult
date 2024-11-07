import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";

const Testimonials = () => {
  return (
    <>
      <NavBar />
      <div className="testimonials" id="testimonials">
        <div className="container">
          <div className="w3ls-heading">
            <h3>Testimonials</h3>
          </div>
          <div className="w3_agileits_testimonial_grids">
            <section className="slider">
              <div className="flexslider">
                <ul className="slides">
                  <li>
                    <div className="w3_agileits_testimonial_grid">
                      <p>
                        <i className="fa fa-quote-right" aria-hidden="true"></i>
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                        <i className="fa fa-quote-right" aria-hidden="true"></i>
                      </p>
                      <img
                        src="src/assets/images/test1.jpg"
                        alt=" "
                        className="img-responsive"
                      />
                      <h4>
                        Rosy James<span>mollit anim</span>
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div className="w3_agileits_testimonial_grid">
                      <p>
                        <i className="fa fa-quote-right" aria-hidden="true"></i>
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                        <i className="fa fa-quote-right" aria-hidden="true"></i>
                      </p>
                      <img
                        src="src/assets/images/test2.jpg"
                        alt=" "
                        className="img-responsive"
                      />
                      <h4>
                        Allen parker<span>voluptate velit</span>
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div className="w3_agileits_testimonial_grid">
                      <p>
                        <i className="fa fa-quote-right" aria-hidden="true"></i>
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                        <i className="fa fa-quote-right" aria-hidden="true"></i>
                      </p>
                      <img
                        src="src/assets/images/test3.jpg"
                        alt=" "
                        className="img-responsive"
                      />
                      <h4>
                        Crisp Ally <span>sint occaecat</span>
                      </h4>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Testimonials;
