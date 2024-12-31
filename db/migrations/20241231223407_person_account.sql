-- migrate:up
CREATE TABLE IF NOT EXISTS account (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  person_id BIGINT REFERENCES person (id) NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);


-- migrate:down
DROP TABLE IF EXISTS account;