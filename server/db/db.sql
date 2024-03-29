CREATE TABLE review (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restraunts(id),  -- forign key added t o join two tables
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating>=1 AND rating<=5)
);