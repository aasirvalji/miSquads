import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../styles/About.css";
import aboutImage from "../assets/aboutLanding.png";
import securityImage from "../assets/undrawSecurity.svg";

import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

//material UI imports
import Button from "@material-ui/core/Button";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const About = () => {
  return (
    <>
      <div id="about-content-container">
        <h3 id="whats-header">Whats miTeams?</h3>
        <img src={aboutImage}></img>
        <p>
          miTeams is a team collaboration platform that focuses on quick
          collaboration and prompt check-ins. By reducing the number of
          un-necessary buttons, you can create, view and manage upcoming events
          in seconds.
        </p>
      </div>

      <div id="get-started-container">
        <h3 id="whats-header">How do I get started?</h3>
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
                <TableCell align="right">
                  {" "}
                  Hit Register in the top right corner of your screen and create
                  an account (make it something easy to remember)
                </TableCell>
              </TableRow>

              <TableRow key="2">
                <TableCell component="th" scope="row">
                  2)
                </TableCell>
                <TableCell align="right">
                  {" "}
                  Once you're signed in, hit create team
                </TableCell>
              </TableRow>

              <TableRow key="3">
                <TableCell component="th" scope="row">
                  3)
                </TableCell>
                <TableCell align="right">
                  {" "}
                  Enter in your team name and a team key (Keep this key handy as
                  new users joining your team will be asked for it)
                </TableCell>
              </TableRow>

              <TableRow key="4">
                <TableCell component="th" scope="row">
                  4)
                </TableCell>
                <TableCell align="right">
                  {" "}
                  Once you've created your team, that's it you're done! You can
                  invite others to your team by sending them the URL of your
                  team or by sending them your unique team ID
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div id="about-privacy-container">
        <h3 id="privacy-header">Data Privacy and Concerns</h3>
        <img src={securityImage}></img>
        <p>
          miTeams doesn't use any of your personal information outside of the
          platform. This information is used to keep track of your entries and
          better your experience. Nothing more.
        </p>
      </div>

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

      <Footer />
    </>
  );
};

About.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(About);