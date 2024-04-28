## Tender Bidding System

This project is a Tender Bidding System, consisting of both a server-side and a client-side application.

### Running the Server

1. Navigate to the server directory:
   ```
   cd tender_bidding/server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following details:
   ```
   PORT=8738
   MONGO_PASSWORD=ViDBPassword
   JWT_SECRET=viExportJWTTokens
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Running the Frontend

1. Navigate to the client directory:
   ```
   cd tender_bidding/client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend application:
   ```
   npm run dev
   ```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

### UI Flow

#### Admin Dashboard

- Admin can log in using the following credentials:
  - Email: admin@gmail.com
  - Password: 123456
- After logging in, the admin can:
  - View bids
  - Create tender
  - Tender list on homepage

#### User Interface

- Users will see the home page with tender list and a bid button after logging in.