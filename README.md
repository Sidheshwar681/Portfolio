# Portfolio

A full-stack developer portfolio built with a React + Vite frontend and an Express backend. The project includes animated sections, a contact form API, and GitHub-powered project/profile endpoints.

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS
- Framer Motion
- Three.js / React Three Fiber
- Node.js + Express
- MongoDB + Mongoose
- Nodemailer

## Project Structure

```text
Portfolio/
|- client/   # Vite + React frontend
|- server/   # Express API
|- README.md
```

## Prerequisites

- Node.js `20.19+` or `22.12+`
- npm
- MongoDB (optional, only needed if you want to store contact messages)

## Setup

1. Clone the repository:

```bash
git clone https://github.com/Sidheshwar681/Portfolio.git
cd Portfolio
```

2. Install frontend dependencies:

```bash
cd client
npm install
```

3. Install backend dependencies:

```bash
cd ../server
npm install
```

4. Create the backend environment file:

```bash
cp .env.example .env
```

If you are using Windows PowerShell, use:

```powershell
Copy-Item .env.example .env
```

5. Update `server/.env` with your values.

## Environment Variables

Create `server/.env` from `server/.env.example` and configure these values:

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | No | Backend port. Defaults to `5000`. |
| `MONGO_URI` | No | MongoDB connection string for saving contact form submissions. |
| `EMAIL_USER` | No | Gmail address used to send contact form emails. |
| `EMAIL_PASS` | No | Gmail app password for `EMAIL_USER`. |
| `GITHUB_USERNAME` | Recommended | GitHub username used by the portfolio API. |
| `GITHUB_TOKEN` | No | Optional GitHub token to avoid API rate limits. |

## Run Locally

Start the backend in one terminal:

```bash
cd server
npm run dev
```

Start the frontend in a second terminal:

```bash
cd client
npm run dev
```

Open `http://localhost:5173`.

During development, Vite proxies `/api/*` requests from the frontend to `http://localhost:5000`.

## Available Scripts

### Frontend (`client`)

- `npm run dev` - start the Vite dev server
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint

### Backend (`server`)

- `npm run dev` - start the API with Nodemon
- `npm run start` - start the API with Node.js

## API Endpoints

- `GET /api/health` - health check
- `POST /api/contact` - submit a contact form message
- `GET /api/github/user` - fetch GitHub profile data
- `GET /api/github/repos` - fetch recent public repositories

## Customization

- Update personal details, skills, and project data in `client/src/data/index.js`.
- Update the contact section UI and displayed contact details in `client/src/components/sections/Contact.jsx`.
- Replace assets inside `client/src/assets/` as needed.

## Build for Production

Build the frontend:

```bash
cd client
npm run build
```

Run the backend in production mode:

```bash
cd server
npm run start
```

## GitHub Pages

The frontend can be published to GitHub Pages at `https://sidheshwar681.github.io/Portfolio/`.

- GitHub Pages hosts the static React app only.
- The Express backend is not deployed on GitHub Pages.
- On the GitHub Pages version, the contact form opens the visitor's email app by default.
- If you later deploy the backend elsewhere, you can point the frontend at it with `VITE_CONTACT_API_URL`.

## Notes

- If `MONGO_URI` is not set, the backend skips database storage.
- If `EMAIL_USER` and `EMAIL_PASS` are not set, the contact route will not send email notifications.
- If `GITHUB_TOKEN` is not set, GitHub API requests may hit stricter rate limits.
