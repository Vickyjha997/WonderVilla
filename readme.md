# WonderVilla

WonderVilla is a web application for managing property listings and reviews. It includes user authentication and secure image uploads using Cloudinary.

## Features

- User Registration and Login
- Property Listings Management
- Reviews and Ratings for Listings
- Flash Messages for Notifications
- Secure Authentication with Passport.js
- Session Management with express-session
- Error Handling
- Image Uploads with Cloudinary

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS (Embedded JavaScript Templates)
- Passport.js (Authentication)
- express-session (Session Management)
- connect-flash (Flash Messages)
- dotenv (Environment Variables)
- Cloudinary (Image Uploads)
- Multer (File Uploads)
- Joi (Validation)

## Installation



1. **Install dependencies:**
    ```bash
    npm install
    ```

2. **Set up MongoDB:**
    - Install MongoDB from the [official website](https://www.mongodb.com/try/download/community).
    - Start the MongoDB server:
        ```bash
        mongod
        ```

3. **Create a Cloudinary account:**
    - Sign up for a Cloudinary account at [cloudinary.com](https://cloudinary.com/).
    - Obtain your Cloudinary credentials (Cloud Name, API Key, and API Secret).

4. **Create a `.env` file in the root directory and add your environment variables:**
    ```plaintext
    NODE_ENV=development
    JWT_SECRET=your_jwt_secret
    CLOUD_NAME=your_cloudinary_cloud_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_api_secret
    ```

5. **Run the application:**
    ```bash
    npm start
    ```

6. **Open your browser and navigate to `http://localhost:8080`.**

## Usage

### User Registration and Login

- Users can register and log in to the application.

### Property Listings Management

- Users can add, edit, and delete property listings.

### Reviews and Ratings

- Users can add reviews and ratings to property listings.

### Image Uploads

- Property listings can include images uploaded to Cloudinary.

## Project Structure
