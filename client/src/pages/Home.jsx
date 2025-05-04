import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import JobListing from "../components/JobListing";
import AppDownload from "../components/AppDownload";
import Footer from "../components/Footer";
import VisitorAnalyticsDashboard from "../components/VisitorAnalyticsDashboard";
import SectionDividers from "../components/SectionDividers";
import Divider from "../components/Divider";
import Partner from "../components/Partner";

const Home = () => {
  return (
    <div id="hero">
      <Navbar />
      <Hero />
      <JobListing />
      <Divider />
      <Partner />
      <Divider />

      <VisitorAnalyticsDashboard />
      <Divider />

      <Footer />
    </div>
  );
};

export default Home;
