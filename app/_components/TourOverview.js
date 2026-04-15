export default function TourOverview({ tour }) {
  if (!tour) return null;

  const nextDate = tour?.startDates?.[0]
    ? new Date(tour.startDates[0])
    : null;

  const options = { month: "long", year: "numeric" };

  return (
    <section className="section-description">
       <div className="overview-box">
        <div >
          {/* QUICK FACTS */}
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">
              Quick facts
            </h2>

            {/* NEXT DATE */}
            {nextDate && (
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use href="/img/icons.svg#icon-calendar" />
                </svg>
                <span className="overview-box__label">
                  Next date
                </span>
                <span className="overview-box__text">
                  {nextDate.toLocaleString("en-US", options)}
                </span>
              </div>
            )}

            {/* DIFFICULTY */}
            <div className="overview-box__detail">
              <svg className="overview-box__icon">
                <use href="/img/icons.svg#icon-trending-up" />
              </svg>
              <span className="overview-box__label">
                Difficulty
              </span>
              <span className="overview-box__text">
                {tour.difficulty
                  ? tour.difficulty.charAt(0).toUpperCase() +
                    tour.difficulty.slice(1)
                  : "N/A"}
              </span>
            </div>

            {/* PARTICIPANTS */}
            <div className="overview-box__detail">
              <svg className="overview-box__icon">
                <use href="/img/icons.svg#icon-user" />
              </svg>
              <span className="overview-box__label">
                Participants
              </span>
              <span className="overview-box__text">
                {tour.maxGroupSize ?? "-"} people
              </span>
            </div>

            {/* RATING */}
            <div className="overview-box__detail">
              <svg className="overview-box__icon">
                <use href="/img/icons.svg#icon-star" />
              </svg>
              <span className="overview-box__label">
                Rating
              </span>
              <span className="overview-box__text">
                {tour.ratingsAverage ?? "-"} / 5
              </span>
            </div>
          </div>

          {/* GUIDES */}
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">
              Your tour guides
            </h2>

            {tour.guides?.length ? (
              tour.guides.map((guide) => (
                <div
                  className="overview-box__detail"
                  key={guide._id}
                >
                  <img
                    className="overview-box__img"
                    src={`/img/users/${guide.photo}`}
                    alt={guide.role}
                  />
                  <span className="overview-box__label">
                    {guide.role?.replace("-", " ")}
                  </span>
                  <span className="overview-box__text">
                    {guide.name}
                  </span>
                </div>
              ))
            ) : (
              <p>No guides available</p>
            )}
          </div>
        </div>

       
      </div>
       {/* DESCRIPTION */}
        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">
            About {tour.name || "this tour"}
          </h2>

          {tour.description
            ?.split("\n")
            .filter(Boolean)
            .map((p, i) => (
              <p className="description__text" key={i}>
                {p}
              </p>
            ))}
        </div>
    </section>
  );
}