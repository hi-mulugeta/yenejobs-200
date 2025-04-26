import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import JobListing from "../components/JobListing";
import AppDownload from "../components/AppDownload";
import Footer from "../components/Footer";
import VisitorAnalyticsDashboard from "../components/VisitorAnalyticsDashboard";
import SectionDividers from "../components/SectionDividers";
import Divider from "../components/Divider";

const Home = () => {
  return (
    <div>
      <Navbar />

      <Hero />

      <JobListing />
      <Divider />
      <AppDownload />
      <Divider />
      <VisitorAnalyticsDashboard />
      <Divider />
      <Footer />
    </div>
  );
};

export default Home;
