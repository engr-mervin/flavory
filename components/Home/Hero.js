import Image from "next/image";
import heroa from "../../assets/images/hero-a.jpg";
import herob from "../../assets/images/hero-b.jpg";
import heroc from "../../assets/images/hero-c.jpg";

import logoBBC from "../../assets/images/logo-bbc.png";
import logoBI from "../../assets/images/logo-bi.png";
import logoForbes from "../../assets/images/logo-forbes.png";
import logoTechcrunch from "../../assets/images/logo-techcrunch.png";

const Hero = function () {
  return (
    <div className="hero">
      <div className="hero-box">
        <h1 className="heading--1b">
          Thousands of healthy, tasty recipes from all over the world.
        </h1>
        <p className="hero-text">
          Immerse yourself in a world of endless flavor possibilities.
        </p>
        <div className="hero-actions">
          <button className="button-hero--start">Start Cooking!</button>
          <button className="button-hero--signup">Sign up</button>
        </div>

        <p className="hero-text-2">
          Come and join the Flavorist movement, where culinary artistry meets
          community!
        </p>

        <div className="hero-feature-box">
          <p className="hero-feature-text">Featured by</p>
          <ul className="hero-feature-list">
            <li>
              <Image className="hero-feature-item" src={logoBBC}></Image>
            </li>
            <li>
              <Image className="hero-feature-item" src={logoBI}></Image>
            </li>
            <li>
              <Image className="hero-feature-item" src={logoForbes}></Image>
            </li>
            <li>
              <Image className="hero-feature-item" src={logoTechcrunch}></Image>
            </li>
          </ul>
        </div>
      </div>
      <div className="hero-image-box">
        <Image
          src={heroa}
          className="hero-image-2"
          alt="Photo of an example food"
        ></Image>
        <Image
          src={herob}
          className="hero-image-center"
          alt="Photo of an example food"
        ></Image>
        <Image
          src={heroc}
          className="hero-image-1"
          alt="Photo of an example food"
        ></Image>
      </div>
    </div>
  );
};

export default Hero;
