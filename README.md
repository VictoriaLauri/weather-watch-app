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

## ***To Run Concurrently***

### 1. Clone the Repository 
```git clone https://github.com/VictoriaLauri/weather-watch-app.git```<br/>
```cd weather-watch-app```

### 2. Install Dependencies for both client and server
``` npm install``` <br/>
``` cd client && npm install ``` <br/>
``` cd ../server && npm install```

### 3. Create an .env file in the backend folder and add the following keys: 

* TMDB_API_KEY=your_tmdb_api_key
* WEATHER_API_KEY=your_weather_api_key
* JWT_SECRET=your_secret_key
* DB_HOST=localhost
* DB_USER=root
* DB_PASSWORD=your_db_password
* DB_NAME=weather_watch_app
* PORT=8000

👉 *TIP: Make sure MySQL is running and the tables are set up using the schema.sql file found in server/db.js*

### 4. Run the App
#### To start both the React Frontend and Express backend concurrently:
#### From the root directory
```npm run dev```

## ***To Run Front and Backend Separately***

### 1. Clone the Repository 
```git clone https://github.com/VictoriaLauri/weather-watch-app.git```<br/>
```cd weather-watch-app```

### 2. Backend Setup
#### Navigate to the server directory and install dependencies:
```cd server```<br/>
```npm install```
  
#### 3. Create an .env file in the backend folder and add the following keys: 

* TMDB_API_KEY=your_tmdb_api_key
* WEATHER_API_KEY=your_weather_api_key
* JWT_SECRET=your_secret_key
* DB_HOST=localhost
* DB_USER=root
* DB_PASSWORD=your_db_password
* DB_NAME=weather_watch_app
* PORT=8000

#### Run the backend:   
``` npm run dev```

### 3. Frontend Setup
#### Navigate to the frontend directory and install dependencies:
```cd client```<br/>
```npm install```
 
#### Run the frontend:
``` npm start```

## 👤 Usage
 * Visit http://localhost:5173
 * Register or log in
 * Allow location access when prompted
 * View movie recommendations based on your profile and weather
 * Go to Profile to update your username, email, or password

## 🔬 How to Test the App
### Testing JWT Authentication

*In Developer Tools:*<br/>
    * After logging in, store the JWT in localStorage or sessionStorage in your browser.<br/>
    * Add the token to the Authorization header as Bearer <your-jwt> when making requests to protected routes (like movie recommendations).
    
*In Postman:*<br/>
    * First, log in to the app by sending a POST request to /api/auth/login with valid user credentials (username and password). <br/>
    * Copy the JWT from the response.<br/>
    * Send a GET request to /api/recommendation with the Authorisation header as Bearer <your-jwt>.

## ❌ Common Errors
* CORS Issue: If you're running into CORS issues, ensure that the frontend and backend are running on different ports. Add "proxy": "http://localhost:8000" in the frontend's package.json to fix CORS during development. <br/>
* JWT Errors: If the JWT is missing or invalid, the server will respond with a 401 Unauthorised or 403 Forbidden status. Make sure to include the JWT in the header correctly.

## 🔗 Learn More
* [JWT: JWT Introduction](https://jwt.io/introduction/)
* [React: React Documentation](https://react.dev/learn)
* [Express: Express.js Documentation](https://expressjs.com/)
* [TMDB API: TMDB API Documentation](https://developer.themoviedb.org/docs/getting-started)
* [Weather API: OpenWeather API](https://openweathermap.org/api)

