
CREATE TABLE tasks
(
	id 		INTEGER PRIMARY KEY, 
	title 		VARCHAR(20), 
	description 	TEXT, 
	column		VARCHAR(20),
	created     DATETIME,
	closed      DATETIME,
	archived    BOOLEAN
);




