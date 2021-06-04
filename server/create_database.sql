DROP TABLE IF EXISTS "Like";
DROP TABLE IF EXISTS "Match";

DROP TABLE IF EXISTS "MakeOrBreakUserAnswer";
DROP TABLE IF EXISTS "MakeOrBreakPossibleAnswer";
DROP TABLE IF EXISTS "MakeOrBreakQuestion";
DROP TABLE IF EXISTS "Photo";
DROP TABLE IF EXISTS "UserInterest";
DROP TABLE IF EXISTS "User";
DROP TABLE IF EXISTS "LoginInfo";
DROP TABLE IF EXISTS "Gender";
DROP TABLE IF EXISTS "Interest";


create table "Gender" (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

create table "Interest" (
    id SMALLSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

create table "LoginInfo" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL CHECK(coalesce(TRIM(username), '') <> ''),
    passwordHash TEXT NOT NULL CHECK(coalesce(TRIM(passwordHash), '') <> '')
);

create table "User" (
    id UUID PRIMARY KEY references "LoginInfo",
    name VARCHAR(100),
    birthdate DATE,
    bio TEXT,
    gender INTEGER REFERENCES "Gender"(id),    
    gendersInterestedIn SMALLINT, -- bitmap to genders
    contactInfo TEXT

    --  FOREIGN KEY(id) references "LoginInfo"(id)
);

create table "UserInterest" (
    userId UUID NOT NULL REFERENCES "User"(id),
    interestId smallint NOT NULL REFERENCES "Interest"(id),

    PRIMARY KEY (userId, interestId)
);

create table "Photo" (
    id UUID PRIMARY KEY, -- DEFAULT gen_random_uuid(),
    userId UUID REFERENCES "User"(id),
    "path" TEXT
);

create table "MakeOrBreakQuestion" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text TEXT
);

create table "MakeOrBreakPossibleAnswer" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mobqId UUID REFERENCES "MakeOrBreakQuestion"(id),
    text TEXT
);

create table "MakeOrBreakUserAnswer" (
    userId UUID REFERENCES "User"(id),
    mobqId UUID REFERENCES "MakeOrBreakQuestion"(id),
    mobqpaId UUID REFERENCES "MakeOrBreakPossibleAnswer"(id),

    PRIMARY KEY (userId, mobqId, mobqpaId)
);

-- matches stuff -- 

create table "Like" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    likerId UUID REFERENCES "User"(id),
    likeeId UUID REFERENCES "User"(id),

    UNIQUE (likerId, likeeId)
);

create table "Match" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userid1 UUID REFERENCES "User"(id),
    userid2 UUID REFERENCES "User"(id),

    UNIQUE (userid1, userid2),
    UNIQUE (userid2, userid1)
);
