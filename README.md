# CoffeeCo React Application

A modern React application for CoffeeCo, featuring coffee reservations and job applications.

## Features

- **Hero Page**: Landing page with navigation to main features
- **Coffee Reservation Form**: Customers can reserve coffee with date/time selection
- **Job Application Form**: Apply for positions like barista, waiter, supplier, etc.
- **Responsive Design**: Works on desktop and mobile devices
- **Form Validation**: Real-time validation with user-friendly error messages

## Technologies Used

- React (JavaScript)
- CSS3
- HTML5

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── Navigation.js          # Navigation bar component
│   ├── Hero.js               # Landing page component
│   ├── CoffeeReserveForm.js  # Coffee reservation form
│   └── CoffeeApplicationForm.js # Job application form
├── App.js                    # Main app component
├── App.css                   # Main styles
└── index.js                  # Entry point
```

## Design Features

- **Color Scheme**: Brown (#6F4E37) and beige (#F2E9DC) theme
- **Typography**: Roboto for body text, Courier New for headers
- **Interactive Elements**: Hover effects, smooth transitions
- **Form Validation**: Real-time feedback with visual indicators

## Original HTML Files

The original HTML files are preserved in the `old-html-files/` directory for reference.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)
