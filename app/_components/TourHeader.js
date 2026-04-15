import Image from "next/image";

export default function TourHeader({ tour }) {
  if (!tour) return null;

  return (
    <section className="section-header">
      <div className="header__hero">
        <div className="header__hero-overlay">&nbsp;</div>

        <Image
          src={`/img/tours/${tour.imageCover}`}
          alt={tour.name}
          fill
          className="header__hero-img"
        />
      </div>

      <div className="heading-box">
        <h1 className="heading-primary">
          <span>{tour.name}</span>
        </h1>

        <div className="heading-box__group">
          <div className="heading-box__detail">
            <svg className="heading-box__icon">
              <use href="/img/icons.svg#icon-clock" />
            </svg>
            <span className="heading-box__text">
              {tour.duration} days
            </span>
          </div>

          <div className="heading-box__detail">
            <svg className="heading-box__icon">
              <use href="/img/icons.svg#icon-map-pin" />
            </svg>
            <span className="heading-box__text">
              {tour.startLocation?.description}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}