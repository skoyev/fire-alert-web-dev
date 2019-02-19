CREATE TABLE franchaisee (
 id serial PRIMARY KEY,
 name VARCHAR (50) not null
 ),

 CREATE TABLE franchaisee_user (
 franchaisee_id int not null,
 user_id int not null not null
 )
 