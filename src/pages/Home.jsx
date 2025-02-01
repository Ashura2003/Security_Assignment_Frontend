import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import faqImg from "../assets/images/faq-img.png";
import heroImg01 from "../assets/images/home-page01.png";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import About from "../components/About/About";
import FaqList from "../components/Faq/FaqList";
import ServiceList from "../components/Services/ServiceList";
import Testimonial from "../components/Testimonial/Testimonial";

const Home = () => {
  return (
    <>
      {/* ==================== hero section ========================= */}
      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-between">
            {/* ======================== hero content ========================= */}
            <div className="w-full lg:w-1/2">
              <div className="lg:w-[570px]">
                <h1 className="text-2xl leading-tight text-headingColor font-bold md:text-4xl md:leading-tight">
                  Your Health is our concern
                </h1>
                <p className="text__para mt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                  odio et distinctio rem, repudiandae quod accusantium placeat
                  excepturi odit vel earum sunt, reprehenderit deserunt ratione.
                  Veritatis, ducimus. Voluptas, sed iusto.
                </p>
                <button className="btn mt-4">Appoint a Helper</button>
              </div>
              {/* ===================== hero counter ============================ */}
            </div>

            {/* ===================== hero content ============================ */}
            <div className="flex gap-4 lg:gap-8 justify-end w-full lg:w-1/2">
              <div>
                <img className="w-full" src={heroImg01} alt="Hero 1" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ============================= hero section end ==================================== */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="lg:w-[470px] mx-auto">
            <h2 className="heading text-center">
              We provide medical services all over Nepal
            </h2>
            <p className="text__para text-center mt-4">
              World-class care for the people, By the people
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mt-8">
            <div className="py-8 px-4">
              <div className="flex items-center justify-center">
                <img src={icon01} alt="Icon 1" />
              </div>

              <div className="mt-8 text-center">
                <h2 className="text-xl leading-tight text-headingColor font-bold">
                  Find a Doctor
                </h2>
                <p className="text-base leading-7 text-textColor mt-4">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex
                  laborum omnis sint corporis eaque enim doloremque accusamus,
                  laudantium molestiae.
                </p>

                <Link
                  to="/workers"
                  className="w-10 h-10 rounded-full border border-solid border-gray-800 mt-8 mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-6" />
                </Link>
              </div>
            </div>

            <div className="py-8 px-4">
              <div className="flex items-center justify-center">
                <img src={icon02} alt="Icon 2" />
              </div>

              <div className="mt-8 text-center">
                <h2 className="text-xl leading-tight text-headingColor font-bold">
                  Find Location
                </h2>
                <p className="text-base leading-7 text-textColor mt-4">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex
                  laborum omnis sint corporis eaque enim doloremque accusamus,
                  laudantium molestiae.
                </p>

                <Link
                  to="/workers"
                  className="w-10 h-10 rounded-full border border-solid border-gray-800 mt-8 mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-6" />
                </Link>
              </div>
            </div>

            <div className="py-8 px-4">
              <div className="flex items-center justify-center">
                <img src={icon03} alt="Icon 3" />
              </div>

              <div className="mt-8 text-center">
                <h2 className="text-xl leading-tight text-headingColor font-bold">
                  Book an Appointment
                </h2>
                <p className="text-base leading-7 text-textColor mt-4">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex
                  laborum omnis sint corporis eaque enim doloremque accusamus,
                  laudantium molestiae.
                </p>

                <Link
                  to="/workers"
                  className="w-10 h-10 rounded-full border border-solid border-black-800 mt-8 mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <About />

      {/* ============================ services section============================ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Our medical services</h2>
            <p className="text__para text-center mt-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex
              laborum omnis sint corporis eaque enim doloremque accusamus,
              laudantium molestiae.
            </p>
          </div>
          <ServiceList />
        </div>
      </section>
      {/* ============================ services section end ======================== */}

      {/* ============================ feature section ============================= */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* =============== feature content ======================== */}
            <div className="xl:w-[670px]">
              <h2 className="heading">
                Get your treatment <br /> from anywhere.
              </h2>

              <ul className="pl-4 mt-4">
                <li className="text__para">
                  1. Schedule the appointment directly.
                </li>
                <li className="text__para">
                  2. Search for your physician here, and contact their office.
                </li>
                <li className="text__para">
                  3. View our physician who are accepting new patients, use the
                  online scheduling tool to select an appointment time.
                </li>
              </ul>

              <Link to="/">
                <button className="btn mt-4">Learn More</button>
              </Link>
            </div>

            {/*  ========================= feature img ================================= */}
          </div>
        </div>
      </section>
      {/* ============================ feature section end ========================== */}
      {/* ============================ faq section =================================== */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="w-full md:w-1/2 hidden md:block">
              <img src={faqImg} alt="FAQ" />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="heading">Frequently Asked Questions</h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>
      {/* ============================ faq section end ================================ */}
      {/*  =========================== testimonial =================================== */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patient say</h2>
            <p className="text__para text-center mt-4">
              What our patients have to say for our services.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
      {/*  =========================== testimonial end =================================== */}
    </>
  );
};

export default Home;
