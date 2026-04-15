export default function TourReviews({ reviews = [] }) {
  return (
    <section className="section-reviews">
      <div className="reviews">
        {reviews.length ? (
          reviews.map((review) => (
            <div className="reviews__card" key={review._id}>
              <div className="reviews__avatar">
                <img
                  className="reviews__avatar-img"
                  src={`/img/users/${review.user.photo}`}
                  alt={review.user.name}
                />
                <h6 className="reviews__user">
                  {review.user.name}
                </h6>
              </div>

              <p className="reviews__text">{review.review}</p>

              <div className="reviews__rating">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className={`reviews__star ${
                      review.rating >= i
                        ? "reviews__star--active"
                        : "reviews__star--inactive"
                    }`}
                  >
                    <use href="/img/icons.svg#icon-star" />
                  </svg>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </section>
  );
}