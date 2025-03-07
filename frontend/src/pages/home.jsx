import React from "react";
import banner from "../assets/Banner03.jpg";
import SplitText from "../tools/splittext.jsx";
import AnimatedContent from "../tools/AminatedContent.jsx";
import workout from "../assets/workout.png";
import diet from "../assets/diet.png";


function Home() {
  return (
    <>
      <div
        className="w-screen min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-white"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className=" bg-opacity-50 p-6 rounded-lg text-center shadow-lg max-w-3xl mx-4">
          <SplitText
            text="Welcome to Fit-Gen"
            className="text-5xl font-extrabold text-center text-amber-500"
            delay={150}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
          <p className="mt-4 text-lg text-gray-300 md:max-w-xl">
            Your ultimate fitness companion. Track workouts, monitor nutrition, and stay motivated!
          </p>
          <a
            href="#get-started"
            className="mt-6 px-8 py-4 bg-orange-500 text-black font-semibold rounded-full hover:bg-orange-600 transition duration-300 transform hover:scale-105 inline-block"
          >
            Get Started
          </a>
        </div>
      </div>
      <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-3xl font-bold text-orange-500">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 items-center mx-auto ">
            <AnimatedContent direction="horizontal" distance={100} delay={150}>
              <div className="p-3 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center w-full max-w-xs">
                <img src={workout} alt="Workout Tracker" className="w-full h-auto rounded-lg mb-4" />
                <h3 className="text-2xl font-semibold text-orange-500">Workout Tracker</h3>
                <p className="mt-4 text-lg text-gray-300 text-center">
                  Keep track of your workouts and monitor your progress over time.
                </p>
              </div>
            </AnimatedContent>
            <AnimatedContent direction="horizontal" distance={100} delay={300}>
              <div className="p-3 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center w-full max-w-xs">
                <img src={diet} alt="Nutrition Tracker" className="w-full h-auto rounded-lg mb-4" />
                <h3 className="text-2xl font-semibold text-orange-500">Nutrition Tracker</h3>
                <p className="mt-4 text-lg text-gray-300 text-center">
                  Monitor your daily nutrition intake and stay on top of your diet.
                </p>
              </div>
            </AnimatedContent>
            <AnimatedContent direction="horizontal" distance={100} delay={450}>
              <div className="p-3 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center w-full max-w-xs">
                <img src="" alt="Motivation" className="w-full h-auto rounded-lg mb-4" />
                <h3 className="text-2xl font-semibold text-orange-500">Motivation</h3>
                <p className="mt-4 text-lg text-gray-300 text-center">
                  Stay motivated with our community and achieve your fitness goals.
                </p>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
