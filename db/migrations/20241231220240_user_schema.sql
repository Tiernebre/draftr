-- migrate:up
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY
);


-- migrate:down
DROP TABLE IF EXISTS users;
