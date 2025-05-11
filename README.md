# Admin Panel

This is a responsive admin panel built with **React**, **TypeScript**, and **Vite**. The app features two main pages: **Captions** and **Countries**, along with user authentication via JWT.

## Features

### Authentication

- Register and log in using a JWT-based API.
- Logged-in users are redirected to the Captions page.
- User's name is displayed in the UI.
- Logout functionality is available.

### Captions Page

- Uses the [My External API](https://app.swaggerhub.com/apis-docs/goodwell/my-external_api/1.0.0).
- Add captions using key–value input fields.
- View all captions in a table.
- Edit and delete captions via table actions.
- Dynamic UI updates on changes.

### Countries Page

- Uses [REST Countries API](https://restcountries.com/v3.1/all).
- Display a table with:
  - Region
  - Country
  - Capital
  - Currency
  - Language
- Pagination (15 items per page).
- Filters:
  - "Independent" checkbox.
  - Currency filter (USD, EUR).

## Technologies Used

- **React 19**
- **TypeScript**
- **Vite**
- **Material UI (MUI)**
- **React Hook Form**
- **Yup** (form validation)
- **React Query (TanStack)**
- **React Router**
- **Axios**
- **JWT Decode**
- **JS Cookie**
- **React Toastify**

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/tikoration/admin-panel.git
cd admin-panel
```

### 2. Install Dependencies

After cloning the repo, you need to install the dependencies. Run the following command:

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add the following:

```ini

VITE_BASE_URL='https://lexiconapi.onrender.com'
```

### 4. Run the App

Use the following command to run the app:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Scripts

Here are the available npm scripts for the project:

- `npm run dev` – Starts the development server.
- `npm run build` – Builds the project for production.
- `npm run preview` – Previews the production build.
- `npm run lint` – Runs ESLint to check for linting errors.
