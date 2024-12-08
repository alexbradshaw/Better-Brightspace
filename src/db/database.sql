DROP ROLE IF EXISTS templateuser;

CREATE USER templateuser
WITH
    NOSUPERUSER INHERIT NOCREATEDB CREATEROLE NOREPLICATION PASSWORD 'testpassword';

CREATE TABLE person (
    id SERIAL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    teacher BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id)
);

CREATE TABLE message (
    id SERIAL,
    body TEXT NOT NULL,
    userId INTEGER NOT NULL,
    members INTEGER[] NOT NULL,
    FOREIGN KEY (userId) REFERENCES person (id),
    PRIMARY KEY (id)
);

CREATE TABLE resource (
    id SERIAL,
    resource VARCHAR(200) NOT NULL,
    type VARCHAR(200) NOT NULL,
    size VARCHAR(200) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE template (
    id SERIAL,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO
    person (
        id,
        firstName,
        lastName,
        teacher
    )
VALUES (
        0,
        'Hemadri',
        'Jayalath',
        true
    );

INSERT INTO
    person (firstName, lastName)
VALUES ('Alex', 'Bradshaw'),
    ('Kan', 'Eskender'),
    ('Alistair', 'Lee'),
    ('Shivang', 'Patel'),
    ('Bryan', 'Ponce'),
    ('Josh', 'Pyon'),
    ('Dalton', 'Shepard');

INSERT INTO
    message (body, userId, members)
VALUES (
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco',
        0,
        '{0, 1}'
    ),
    (
        'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
        1,
        '{0, 1}'
    ),
    (
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        0,
        '{0, 1}'
    ),
    (
        'O inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum',
        0,
        '{0, 1}'
    ),
    ('Heard that', 1, '{0, 1}');

INSERT INTO
    resource (resource, type, size)
VALUES (
        'Donald A. Norman. 2013. The Design of Everyday Things. Basic Books, New York, New York, Revised and Expanded Edition edition.',
        'PDF',
        '123 MB'
    ),
    (
        'https://uga.view.usg.edu/d2l/le/content/3315150/viewContent/52499643/View',
        'Website',
        'N/A'
    );

INSERT INTO
    template (name)
VALUES ('Milestone 0: IRB Training'),
    (
        'Milestone 1: Problem Proposal'
    ),
    (
        'Milestone 2: Understanding the Problem'
    ),
    (
        'Milestone 3: Define + Ideate'
    ),
    (
        'Milestone 4: Low-Fi Prototyping & Pilot Usability Testing'
    ),
    (
        'Milestone Presentation Evaluation'
    ),
    ('Breakout Activity'),
    ('Design Thinking');

GRANT pg_read_all_stats TO templateuser;

-- GRANT INSERT,
-- SELECT, DELETE,
-- UPDATE, REFERENCES, TRIGGER ON ALL TABLES IN SCHEMA public TO templateuser;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO templateuser;

GRANT USAGE,
SELECT
    ON ALL SEQUENCES IN SCHEMA public TO templateuser;