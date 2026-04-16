import Image from "next/image";
import Link from "next/link";

export default function TourCard({ tour }) {
  const date = tour.startDates?.length
    ? new Date(tour.startDates[0]).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="card mt-10">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay">&nbsp;</div>

          <Image
            className="card__picture-img"
            src={`/img/tours/${tour.imageCover}`}
            alt={tour.name}
            width={500}
            height={300}
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <h3 className="heading-tertirary">
          <span>{tour.name}</span>
        </h3>
      </div>

      <div className="card__details">
        <h4 className="card__sub-heading">
          {tour.difficulty} {tour.duration}-day tour
        </h4>

        <p className="card__text">{tour.summary}</p>

        <div className="card__data">
          <svg className="card__icon">
            <use href="/img/icons.svg#icon-map-pin" />
          </svg>
          <span>{tour.startLocation?.description || "Unknown"}</span>
        </div>

        <div className="card__data">
          <svg className="card__icon">
            <use href="/img/icons.svg#icon-calendar" />
          </svg>
          <span>{date}</span>
        </div>

        <div className="card__data">
          <svg className="card__icon">
            <use href="/img/icons.svg#icon-flag" />
          </svg>
          <span>{tour.locations?.length || 0} stops</span>
        </div>

        <div className="card__data">
          <svg className="card__icon">
            <use href="/img/icons.svg#icon-user" />
          </svg>
          <span>{tour.maxGroupSize} people</span>
        </div>
      </div>

      <div className="card__footer">
        <p>
          <span className="card__footer-value">${tour.price}</span>{" "}
          <span className="card__footer-text">per person</span>
        </p>

        <p className="card__ratings">
          <span className="card__footer-value">
            {tour.ratingsAverage}
          </span>{" "}
          <span className="card__footer-text">
            ({tour.ratingsQuantity})
          </span>
        </p>

        <Link
          href={`/tours/${tour.id}`}
          className="btn btn--green btn--small"
        >
          Details
        </Link>
      </div>
    </div>
  );
}