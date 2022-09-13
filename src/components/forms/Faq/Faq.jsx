import React, { useState } from "react";
import { Link } from "react-router-dom";
import FaqImg from "../../../Assets/FaqImg.png";
import { MdExpand } from "react-icons/md";
import { motion } from "framer-motion";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import "./Faq.css";
import { Questions } from "./FaqQuestions";
const Faq = () => {
  const renderQuestion = Questions.map((question, index) => (
    <Accordion key={index} className="my-2 col-md-7 border-0">
      <AccordionSummary
        expandIcon={<MdExpand />}
        aria-controls="panel1a-content"
        id={index}
      >
        <Typography> {question.topic}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{question.content}</Typography>
      </AccordionDetails>
    </Accordion>
  ));
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="container-fluid"
    >
      <div className="faq-box col-12 p-5 my-3 text-center">
        <h3>FAQ</h3>
        <h2>We're here to help</h2>
        <h5>Have Questions? we're here to help</h5>
      </div>
      <div className="">
        <div className="accordion accordion-flush row mx-auto w-100 w-md-75 justify-content-center">
          <div className="heading text-center m-5">
            <h4>Frequently asked questions</h4>
            <h6>Everything you need to know about the product and billing.</h6>
          </div>

          {renderQuestion}
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="contact-link text-center bg-white p-3 col-md-8 me-auto d-flex flex-column justify-content-center align-items-center">
            <div>
              <img src={FaqImg} alt="" />
            </div>
            <div>
              <h6>Still have questions?</h6>
              <p>
                Can’t find the answer you’re looking for? Please chat to our
                friendly team.
              </p>
              <Link to="/contact" className="btn btn-primary btn-lg p-2">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Faq;
