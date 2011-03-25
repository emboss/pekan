
CREATE TABLE tasks
(
	id 		INTEGER PRIMARY KEY, 
	title 		VARCHAR(20) NOT NULL,
	description 	TEXT, 
	column		VARCHAR(20) NOT NULL,
	created     DATETIME,
	closed      DATETIME,
	archived    BOOLEAN NOT NULL,
	project_id  INTEGER NOT NULL,
	FOREIGN KEY(project_id) REFERENCES projects(id)
);

CREATE TABLE projects
(
    id       INTEGER PRIMARY KEY,
    name     VARCHAR(15) UNIQUE NOT NULL
);




