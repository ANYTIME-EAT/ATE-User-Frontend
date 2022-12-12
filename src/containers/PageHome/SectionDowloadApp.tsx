import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import React from "react";
import appSvg1 from "images/appSvg1.png";
import appSvg2 from "images/appSvg2.png";
import appRightImgTree from "images/appRightImgTree.png";
import dowloadAppBGPng from "images/dowloadAppBG.png";
import appRightImg from "images/mobile.png";
import btnIosPng from "images/btn-ios.png";
import btnAndroidPng from "images/btn-android.png";
const SectionDowloadApp = () => {
  return (
    <div className="relative pb-24 pt-24 lg:py-32 xl:py-64 2xl:py-48">
      <BackgroundSection className="bg-red-500 bg-opacity-80 dark:bg-opacity-100 ">
        <img
          className="absolute inset-0 w-full h-full object-cover rounded-3xl object-right"
          src={dowloadAppBGPng}
          alt="dowloadAppPng"
        />

        <div className="hidden lg:block absolute left-8 top-12 max-w-md xl:max-w-sm rounded-3xl overflow-hidden">
          <img src={appRightImg} alt="" />
        </div>
        <div className="absolute right-0 top-0 max-w-2xl">
          <img src={appRightImgTree} alt="" />
        </div>
        <div className="absolute left-0 bottom-10 max-w-2xl">
          <img src={appSvg1} alt="" />
        </div>
      </BackgroundSection>

      <div className="relative xl:left-96 md:left-96 right-0 top-10 block  ">
        <h2 className="text-3xl md:text-6xl xl:text-6xl font-bold text-neutral-800">
          AnyTime Eat App
        </h2>
        <span className="block mt-7 max-w-md text-neutral-6000">
          Download Now...!
        </span>
        <div className="flex space-x-3 mt-10 sm:mt-14">
          <a href="##" target="_blank" rel="noopener noreferrer">
            <img src={btnIosPng} alt="" />
          </a>
          <a href="##" target="_blank" rel="noopener noreferrer">
            <img src={btnAndroidPng} alt="" />
          </a>
        </div>
      </div>

    </div>
  );
};

export default SectionDowloadApp;
