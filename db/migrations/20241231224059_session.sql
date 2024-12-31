-- migrate:up
CREATE TABLE IF NOT EXISTS session (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  person_id BIGINT references person (id) NOT NULL
)


-- migrate:down
DROP TABLE IF EXISTS session;