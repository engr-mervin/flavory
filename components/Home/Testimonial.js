import Image from "next/image";
import test1 from "../../assets/images/test-1.jpg";
import test2 from "../../assets/images/test-2.jpg";
import test3 from "../../assets/images/test-3.jpg";
const Testimonial = function () {
  return (
    <section className="testimonial">
      <h1 className="testimonial-title">We Rebuild Lives</h1>
      <div className="testimonial-video-box">
        <video className="testimonial-video" autoPlay muted loop>
          <source src={"/testimonial-bg-2.mp4"} type="video/mp4"></source>
        </video>
      </div>
      <div className="testimonial-item">
        <Image
          alt="Photo of "
          className="testimonial-image testimonial-image--1"
          src={test1}
        ></Image>
        <div className="testimonial-box">
          <h2 className="testimonial-author">Catherine Hall</h2>
          <p className="testimonial-text">
            My Husband and I enjoy trying the amazing recipes Flavory offers!
            From meals to desserts, you can never ran out of new things to make!
            It has been a medium to spark our marriage.
          </p>
          <h3 className="testimonial-profession">
            &mdash; Wife and Grandmother
          </h3>
        </div>
      </div>{" "}
      <div className="testimonial-item-2">
        <div className="testimonial-box-2">
          <h2 className="testimonial-author--2">Nattapon Kaew</h2>
          <p className="testimonial-text">
            As the lead chef and owner of my restaurant, flavory helped me
            create an amazing menu the customers love! A lot of cultural recipes
            are available, and there&apos;s always something new to try!
          </p>
          <h3 className="testimonial-profession">
            &mdash; &ldquo;Flavors of Siam&rdquo; Owner
          </h3>
        </div>
        <Image
          alt="Photo of Nattapon Kaew"
          className="testimonial-image-2 testimonial-image--2"
          src={test2}
        ></Image>
      </div>
      <div className="testimonial-item">
        <Image
          alt="Photo of Amelia Knight"
          className="testimonial-image testimonial-image--3"
          src={test3}
        ></Image>
        <div className="testimonial-box">
          <h2 className="testimonial-author">Amelia Knight</h2>

          <p className="testimonial-text">
            Flavory offers food recipes I can prepare in 20 minutes, which helps
            me manage my very hectic schedule. Hello healthy living, fast-food
            delivery no more!
          </p>
          <h3 className="testimonial-profession">&mdash; Product Manager</h3>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
