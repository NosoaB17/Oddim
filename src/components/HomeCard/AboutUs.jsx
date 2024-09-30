import React from "react";
import headerIcon from "../../assets/home/solution/sparkle.svg";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-transparent text-gray-800 py-18 px-24">
      <div className="flex items-center justify-center gap-3 mb-4">
        <img src={headerIcon} alt="headerIcon" className="w-6 h-6" />
        <span className="text-xl font-semibold text-blue-500">About us</span>
      </div>
      <h1 className="text-4xl font-semibold text-center mb-8">
        Dudaji Vietnam
      </h1>
      <p className="text-base text-gray-600 text-center mb-8 max-w-2xl mx-auto">
        Dudaji supports you to quickly build a deep learning utilization service
        in a timely and timely place.
      </p>
      <p className="text-base text-gray-600 text-center max-w-2xl mx-auto">
        To put machine learning and deep learning techniques into practice, you
        can not only design algorithms, but also there is a great need for
        infrastructure know-how, such as data preprocessing, building a
        distributed development environment, resource management, and process
        management. Based on the experience of conducting various AI projects,
        Dudaji accelerates the implementation of related data and ideas as a
        service quickly.
      </p>
    </div>
  );
};

export default AboutUs;
