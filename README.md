# Weather Watch App 🌦️🎬

## About The Project

Weather Watch is a web application that recommends movies based on current weather conditions of the user's location. It allows users to register, log in, and get personalised movie recommendations. The app uses JWT (JSON Web Token) for authentication and secure communication between the client and server. 

## 🌟 Features

* User Authentication: Register and log in with username and password. (JWT-based)
* Automatic geolocation detection and real-time weather fetch
* Weather-Based Movie Recommendations: Get movie suggestions based on the current weather and user age and selected decades.
* Profile Management: View and edit your personal profile details.

## 💻 Technologies Used 

* Frontend: React.js
* Backend: Express.js
* Database: MySQL
* Authentication: JWT (JSON Web Token)
* External APIs: TMDB (Movie Data) & Weather API (Weather Data)
* Other Libraries: Axios, CORS, bcrypt, dotenv, etc.

## 🔐 JWT Authentication

* JWT is used for secure user authentication in the app.
* When you log in, a JWT is generated and returned to the client.
* The client uses the token to access protected routes like movie recommendations.

## 📝 Setup Instructions

### ***To Run Concurrently***
### 1. Clone the Repository 

```git clone https://github.com/VictoriaLauri/weather-watch-app.git```<br/>

### 2. Install Dependencies for application root, client and server 

Install dependencies in the root first: <br/>
``` npm install```

Then install dependencies for the front-end:  <br/>
``` cd client && npm install ``` 

Then install dependencies for the back-end:  <br/>
``` cd server && npm install```

### 3. Create a configweatherwatch.env file in the backend ( server/ ) folder and add the following keys: 

* TMDB_API_KEY=your_tmdb_api_key
* WEATHER_API_KEY=your_weather_api_key
* JWT_SECRET=your_secret_key
* DB_HOST=localhost
* DB_USER=root
* DB_PASSWORD=your_db_password
* DB_NAME=weather_watch_app
* PORT=8000

You will find a configweatherwatch.env.test file with sample keys. Just remove .test to make it useable.

### 4. Set up MySQL database

Make sure your MySQL is running and the tables are set up using the schema found in **server/db/schema.sql**

### 5. Run the App

### ***To start both the React Frontend and Express backend concurrently***

#### From the root directory (weather_watch_app)

```npm run dev```

### ***To Run Front and Backend Separately***

#### To start the backend on localhost 8000:  

```cd server && npm run dev```

#### To start the frontend on localhost 3000:

```cd client && npm start```

## 👤 Usage

 * Visit http://localhost:3000
 * Register or log in (if you have previously registered and your user details are in the database)
 * Allow location access when prompted
 * View movie recommendations based on your profile and the weather conditions at your location
 * Try generating other suggestions and filter your next movie recommendation by the release date era
 * Go to Profile to update your username, email, or password
 * Log out to clear all user-related data to allow for the next user to register/login 

## 🔬 How to Test the App

### Front-end testing:

```cd client && npm test```

### Back-end testing:

```cd server && npm test```

## ❌ Common Errors
* CORS Issue: If you're running into CORS issues, ensure that the frontend and backend are running on different ports. Add "proxy": "http://localhost:8000" in the frontend's package.json to fix CORS during development.

## 🔗 Learn More
* [JWT: JWT Introduction](https://jwt.io/introduction/)
* [React: React Documentation](https://react.dev/learn)
* [Express: Express.js Documentation](https://expressjs.com/)
* [TMDB API: TMDB API Documentation](https://developer.themoviedb.org/docs/getting-started)
* [Weather API: OpenWeather API](https://openweathermap.org/api)

