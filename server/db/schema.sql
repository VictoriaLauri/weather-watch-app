
-- Drops existing tables if they exist to reset the database schema.
DROP TABLE IF EXISTS genre_weather_mapping;
DROP TABLE IF EXISTS watchlists;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS recommendations;
DROP TABLE IF EXISTS weather_logs;

-- Creates the database 'weather_watch_app' if it doesn't exist, and sets it as the active database.
CREATE DATABASE IF NOT EXISTS weather_watch_app;
USE weather_watch_app;

-- creates tables
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tmdb_id VARCHAR(50) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100),
  release_year YEAR,
  poster_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE watchlists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

CREATE TABLE genre_weather_mapping (
  id INT AUTO_INCREMENT PRIMARY KEY,
  weather_condition VARCHAR(50) NOT NULL,
  genre VARCHAR(100) NOT NULL
);
--inserting into tables
INSERT INTO genre_weather_mapping (weather_condition, genre) VALUES
('Rainy', 'Drama'),
('Rainy', 'Mystery'),
('Sunny', 'Comedy'),
('Sunny', 'Adventure'),
('Cloudy', 'Romance'),
('Snowy', 'Fantasy');

CREATE TABLE recommendations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  movie_title VARCHAR(255) NOT NULL,
  tmdb_id INT,
  genre_ids VARCHAR(100),
  weather_condition VARCHAR(50),
  certification VARCHAR(10),
  recommended_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE weather_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  condition VARCHAR(50),
  temperature DECIMAL(5,2),
  humidity INT,
  logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
