//general imports
import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../styles/About.css';
import aboutImage from '../assets/aboutLanding.png';
import securityImage from '../assets/undrawSecurity.svg';
import { removeCurrentAlert } from '../../actions/alert';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';

//import react reveal effects
import Fade from 'react-reveal/Fade';

//material UI imports
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const About = ({ removeCurrentAlert }) => {
  useEffect(() => {
    removeCurrentAlert();
  }, [removeCurrentAlert]);
  return (
    <>
      <div id="about-display">
        {/* START SECTION 1*/}
        <div id="about-content-container">
          <h3 id="whats-header">Whats miSquads?</h3>
          <Fade>
            <img src={aboutImage}></img>
          </Fade>
          <p className="non-responsive-about-text">
            miSquads is a team collaboration platform that focuses on quick
            collaboration and prompt check-ins. By reducing the number of
            un-necessary buttons, you can create, view and manage upcoming
            events in seconds.
          </p>
          <p className="responsive-about-text">
            miSquads is a team collaboration platform that focuses on quick
            collaboration and prompt check-ins.
          </p>
        </div>
        {/* END SECTION 1*/}

        {/* START SECTION 2*/}
        <div id="get-started-container">
          <h3 id="whats-header" className="non-responsive-about-text">
            How do I get started?
          </h3>
          <h3 id="whats-header" className="responsive-about-text">
            Getting started
          </h3>

          <TableContainer component={Paper} id="about-steps-table-container">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Step(s)</TableCell>
                  <TableCell align="right">Instructions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key="1">
                  <TableCell component="th" scope="row">
                    1)
                  </TableCell>
                  <TableCell
                    align="right"
                    className="non-responsive-about-text"
                  >
                    {' '}
                    <p className="non-responsive-about-text">
                      Hit Register in the top right corner of your screen and
                      create an account (make it something easy to remember)
                    </p>
                    <p className="responsive-about-text">
                      Hit Register in the top right corner of your screen
                    </p>
                  </TableCell>
                </TableRow>

                <TableRow key="2">
                  <TableCell component="th" scope="row">
                    2)
                  </TableCell>
                  <TableCell align="right">
                    {' '}
                    Once you're signed in, hit create squad
                  </TableCell>
                </TableRow>

                <TableRow key="3">
                  <TableCell component="th" scope="row">
                    3)
                  </TableCell>
                  <TableCell
                    align="right"
                    className="non-responsive-about-text"
                  >
                    {' '}
                    <p className="non-responsive-about-text">
                      Enter in your squad name and a squad key (Keep this key
                      handy as new users joining your squad will be asked for
                      it)
                    </p>
                    <p className="responsive-about-text">
                      Enter in your squad name and a squad key
                    </p>
                  </TableCell>
                </TableRow>

                <TableRow key="4">
                  <TableCell component="th" scope="row">
                    4)
                  </TableCell>
                  <TableCell align="right">
                    {' '}
                    <p className="non-responsive-about-text">
                      Once you've created your squad, that's it you're done! You
                      can invite others to your squad by sending them the URL of
                      your squad or by sending them your unique squad ID
                    </p>
                    <p className="responsive-about-text">
                      Thats it, you're done! Share your squad with your squad
                      URL or unique ID
                    </p>
                  </TableCell>
                  {/* <TableCell align="right" className="responsive-about-text">
                  {" "}
                  Thats it, you're done! Share your squad with your squad URL or
                  unique ID
                </TableCell> */}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/* END SECTION 2*/}

        {/* START SECTION 3*/}
        <div id="about-privacy-container">
          <h3 id="privacy-header" className="non-responsive-about-text">
            Data Privacy and Concerns
          </h3>
          <h3 id="privacy-header" className="responsive-about-text">
            Data Privacy
          </h3>
          <Fade>
            <img src={securityImage}></img>
          </Fade>
          <p className="non-responsive-about-text">
            miSquads doesn't use any of your personal information outside of the
            platform. This information is used to keep track of your entries and
            better your experience. Nothing more.
          </p>
          <p className="responsive-about-text">
            Your information is used to keep track of your entries and is not
            used outside of this platform.
          </p>
        </div>
        {/* END SECTION 3*/}

        {/* START SECTION 4*/}
        <div id="about-updates-container">
          <h3 id="updates-header">Upcoming Updates</h3>
          <div id="about-updates-content-container">
            <div>
              <Link to="/upcoming-features">
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  id="about-upcoming-features-button"
                >
                  View Upcoming Features
                </Button>
              </Link>
            </div>
            <div>
              <p>Current Release 1.0</p>
            </div>
          </div>
        </div>
        {/* END SECTION 4*/}

        <Footer />
      </div>
    </>
  );
};

About.propTypes = {
  isAuthenticated: PropTypes.bool,
  removeCurrentAlert: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { removeCurrentAlert })(About);
