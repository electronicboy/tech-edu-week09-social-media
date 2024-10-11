CREATE TABLE socialmedia_profile
(
    id       INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    clerk_id TEXT UNIQUE,
    bio      TEXT,
    nickname VARCHAR(64)
);

CREATE TABLE socialmedia_posts
(
    id         INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    profile_id INT REFERENCES socialmedia_profile (id),
    content    TEXT,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE socialmedia_likes
(
    profile_id INT REFERENCES socialmedia_profile (id),
    liked INT REFERENCES socialmedia_profile (id),
    PRIMARY KEY (profile_id, liked)
);

CREATE TABLE socialmedia_follows (
    follower INT REFERENCES socialmedia_profile (id),
    followee INT REFERENCES socialmedia_profile (id),
    PRIMARY KEY (follower, followee)
)
