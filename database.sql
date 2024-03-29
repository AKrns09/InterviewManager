DROP DATABASE IF EXISTS interview_manager;
CREATE DATABASE interview_manager;
USE interview_manager;

CREATE TABLE candidates (
		candidate_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    candidate_name VARCHAR(255),
    cv_score VARCHAR(255),
    interviewer VARCHAR(255)
);
