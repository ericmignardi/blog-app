import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import BlogList from "../components/BlogList";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <BlogList />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
