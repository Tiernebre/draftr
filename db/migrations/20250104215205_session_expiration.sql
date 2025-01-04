-- migrate:up
ALTER TABLE session ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;


-- migrate:down
ALTER TABLE session DROP COLUMN created_at;

