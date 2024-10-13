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
);

-- export type PostEntry = {
--     id: number,
--     profile_id: number,
--     username: string,
--     content: string,
--     created_at: string,
--     clerk_id: string
-- }


-- SELECT posts.id as id, profile.id as profile_id, profile.nickname as username, content, created_at, clerk_id FROM socialmedia_follows INNER JOIN socialmedia_posts posts ON followee = posts.profile_id INNER JOIN socialmedia_profile profile ON posts.profile_id = profile.id WHERE socialmedia_follows.follower = (SELECT id FROM socialmedia_profile WHERE clerk_id = 'user_2nCKQsw74EqcczWsyHlbvGp8nJT');



