-- migrate:up
DROP TABLE IF EXISTS session;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS session (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id BIGINT references person (id) NOT NULL
)


-- migrate:down
DROP TABLE IF EXISTS session;

