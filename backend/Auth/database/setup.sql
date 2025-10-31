CREATE TABLE "Users" (
  id SERIAL PRIMARY KEY,
  name CHARACTER VARYING NOT NULL,
  email CHARACTER VARYING NOT NULL,
  hashed_password CHARACTER VARYING NOT NULL,
  rol CHARACTER VARYING DEFAULT 'tourist'::character varying
  status SMALLINT,
);

CREATE TABLE "Session_Tokens" (
  id SERIAL PRIMARY KEY,
  "userID" INTEGER NOT NULL REFERENCES "Users"(id),
  token CHARACTER VARYING NOT NULL,
  expires_at CHARACTER VARYING NOT NULL
);

-- Índices y unicidades
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON "Users" (email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_session_token_unique ON "Session_Tokens" (token);
