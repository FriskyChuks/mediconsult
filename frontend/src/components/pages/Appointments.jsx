import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";

const Appointments = () => {
  return (
    <>
      <NavBar />
      <div className="appointment">
        <div className="container">
          <div className="w3ls-heading">
            <h3>Make an appointment today</h3>
          </div>
          <div className="appointment-grid">
            <div className="col-md-6 appointmnet-left">
              <div className="inner">
                <div className="working-grid">
                  <h4>working hours</h4>
                  <p>
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                    <span>Mon to fri</span>{" "}
                    <span className="span1">9:00 am to 6:30 pm</span>
                  </p>
                  <p>
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                    <span>sat</span>{" "}
                    <span className="span1">9:00 am to 10:00 pm</span>
                  </p>
                  <p>
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                    <span>sun</span>{" "}
                    <span className="span1">10:00 am to 1:00 pm</span>
                  </p>
                  <div className="clearfix"></div>
                </div>
                <div className="working-grid1">
                  <h4>For help</h4>
                  <h5>
                    <i className="fa fa-pencil" aria-hidden="true"></i>For
                    appointment fill the form
                  </h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus sit amet ultrices odio.
                  </p>
                  <div className="clearfix"></div>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
            <div className="col-md-6 appointmnet-middle">
              <div className="inner">
                <h4>Appointment form</h4>
                <form action="#" name="row" method="post" className="register">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    required=""
                  />
                  <input
                    type="email"
                    name="email"
                    id="Email"
                    placeholder="Email id"
                    required=""
                  />
                  <input
                    type="text"
                    name="mobile number"
                    id="Mobile_Number"
                    placeholder="Mobile Number"
                    required=""
                  />
                  <input
                    className="date"
                    id="datepicker"
                    type="text"
                    value="Appointment date"
                    onFocus="this.value = '';"
                    onBlur="if (this.value == '') {this.value = 'Appointment date';}"
                    required=""
                  />
                  <textarea
                    onFocus="this.value = '';"
                    onBlur="if (this.value == '') {this.value = 'Enter Message...';}"
                  >
                    Enter Message...
                  </textarea>
                  <input
                    type="submit"
                    onClick="myFunction()"
                    value="book appointment "
                  />
                </form>
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Appointments;
