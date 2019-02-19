CREATE TABLE profile_business(
 id serial PRIMARY KEY,
 profile_id int not null,
 legal_name VARCHAR (50) UNIQUE NOT NULL,
 business_reg_num VARCHAR (50) NOT NULL,
 ownership int NOT NULL,
 agr_start_date DATE NOT NULL,
 agr_renewal_date DATE NOT NULL,
 royalty_fee int NOT NULL,
 marketing_fee int NOT NULL,
 taxes VARCHAR (50) NOT NULL
 ),

 CREATE TABLE profile_personal(
 id serial PRIMARY KEY,
 profile_id int not null,
 first_name VARCHAR (50) NOT NULL,
 last_name VARCHAR (50) NOT NULL,
 gender VARCHAR (50) , 
 age int,
 birthday DATE,
 home_phone VARCHAR (50),
 cell_phone VARCHAR (50),
 address VARCHAR (250),
  email VARCHAR (50),
  website VARCHAR (100)
 ),

 CREATE TABLE public.profile
(
  id integer NOT NULL DEFAULT nextval('profile_id_seq'::regclass),
  user_id integer NOT NULL,
  name character varying(50) NOT NULL,
  type character varying(50) NOT NULL,
  location character varying(50) NOT NULL,
  CONSTRAINT profile_pkey PRIMARY KEY (id)
)
 