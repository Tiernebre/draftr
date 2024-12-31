-- migrate:up
ALTER TABLE users RENAME TO person;


-- migrate:down
ALTER TABLE person RENAME TO users;

