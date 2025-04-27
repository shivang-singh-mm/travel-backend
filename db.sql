-- DONE
CREATE TABLE "user_queries" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "email" text,
  "number" text,
  "adults" integer,
  "childs" integer,
  "destination" text,
  "description" text
);




CREATE TABLE "tour_packages" (
  "id" SERIAL PRIMARY KEY,  -- Auto-incrementing ID
  "city" VARCHAR,
  "cover_url" TEXT[], 
  "description" TEXT,
  "pricing" TEXT,
  "included" TEXT,
  "destinations_covered" TEXT,
  "hotel_facilities" TEXT,
  "cab_available" TEXT,
  "hotel_url" TEXT,
  "destination_url" TEXT[],
  "cab_url" TEXT,
  "popular_package" VARCHAR
);



-- Done
CREATE TABLE "gallery" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar,
  "description" text,
  "image_url" text
);



--Done
CREATE TABLE "reviews" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "occupation" text,
  "review" text,
  "star_number" integer,
  "url" text
);


-- Done
CREATE TABLE "blog" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar,
  "description" text,
  "url" text
);



CREATE TABLE "offer" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar,
  "description" text,

  "title1" text,
  "url1" text,
  "description1" text,

  "title2" text,
  "url2" text,
  "description2" text,
  
  "title3" text,
  "url3" text,
  "description3" text,
);