Theken Academy

A lightweight Moodle-like course platform built with FastAPI, PostgreSQL, React, and Docker.

Tech Stack

Backend: FastAPI (Python)
Database: PostgreSQL 15
Frontend: React + Vite
Reverse Proxy: Caddy (HTTPS + SSL)
Orchestration: Docker Compose

Project Structure

theken-academy/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   └── core/
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── .env
├── docker-compose.yml
├── docker-compose.dev.yml
├── Caddyfile
└── README.md


Getting Started

Clone the Repository

git clone git@github.com:CodingGockel/theken-academy.git
cd theken-academy


Create the Backend .env File

cp backend/.env.example backend/.env


Edit the .env file:

DATABASE\URL=postgresql://courseuser:securepassword@localhost:5432/theken\academy
SECRET\_KEY=your-secret-key-here
ENVIRONMENT=development
ACCESS\TOKEN\EXPIRE\_MINUTES=60


Generate a secure secret key:

python3 -c "import secrets; print(secrets.token\_hex(32))"


Development

In development, only the database runs in Docker. The backend runs locally with auto-reload.

Start the Database

docker compose -f docker-compose.dev.yml up -d


Start the Backend

cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000


Access the API

| URL | Description |
|---|---|
| http://localhost:8000/api/health | Health check |
| http://localhost:8000/docs | Swagger UI (interactive API docs) |
| http://localhost:8000/redoc | ReDoc API docs |

Start the Frontend

cd frontend
npm install
npm run dev


Frontend is available at http://localhost:5173

Docker Commands

Development Database

Start the database
docker compose -f docker-compose.dev.yml up -d

Stop the database
docker compose -f docker-compose.dev.yml down

View database logs
docker compose -f docker-compose.dev.yml logs db

Restart the database
docker compose -f docker-compose.dev.yml restart db


Production (All Services)

Build and start all containers
docker compose up -d --build

Stop all containers
docker compose down

Restart all containers
docker compose restart

View logs of all containers
docker compose logs

View logs of a specific container
docker compose logs backend
docker compose logs frontend
docker compose logs caddy
docker compose logs db

Follow logs in real time
docker compose logs -f

Rebuild a single container
docker compose up -d --build backend


General Docker Commands

List all running containers
docker ps

List all containers including stopped
docker ps -a

Stop a specific container
docker stop <container-name>

Start a specific container
docker start <container-name>

Remove a container
docker rm <container-name>

View resource usage
docker stats


Database Commands

Connect to PostgreSQL

docker exec -it theken-academy-db-1 psql -U courseuser -d theken\_academy


Useful PostgreSQL Commands

-- List all tables
\dt

-- Describe a table
\d users

-- View all users
SELECT * FROM users;

-- View all courses
SELECT * FROM courses;

-- Exit
\q


Backup the Database

docker exec theken-academy-db-1 pg\dump -U courseuser theken\academy > backup.sql


Restore the Database

cat backup.sql | docker exec -i theken-academy-db-1 psql -U courseuser -d theken\_academy


Backend Commands

Virtual Environment

Create virtual environment
python3 -m venv venv

Activate virtual environment
source venv/bin/activate

Deactivate virtual environment
deactivate

Install dependencies
pip install -r requirements.txt

Update requirements.txt after installing new packages
pip freeze > requirements.txt


Running the Backend

Development with auto-reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

Production
uvicorn app.main:app --host 0.0.0.0 --port 8000


DuckDNS

The project uses DuckDNS for dynamic DNS. The update script runs every 5 minutes via cron.

Manually update DuckDNS IP
~/duckdns/duck.sh

Check the result
cat ~/duckdns/duck.log  # should output "OK"

View cron jobs
crontab -l


Firewall (ufw)

Check firewall status
sudo ufw status verbose

Allow a port
sudo ufw allow 443/tcp

Deny a port
sudo ufw deny <port>

Enable firewall
sudo ufw enable


API Endpoints

Auth

| Method | URL | Description | Auth required |
|---|---|---|---|
| POST | /api/auth/register | Register a new user | No |
| POST | /api/auth/login | Login, returns JWT token | No |

Users

| Method | URL | Description | Auth required |
|---|---|---|---|
| GET | /api/users/me | Get own profile | Yes |
| GET | /api/users/ | Get all users | Admin only |

Courses

| Method | URL | Description | Auth required |
|---|---|---|---|
| GET | /api/courses/ | Get all courses | Yes |
| POST | /api/courses/ | Create a course | Instructor only |
| GET | /api/courses/{id} | Get a single course | Yes |
| POST | /api/courses/{id}/enroll | Enroll in a course | Yes |

User Roles

| Role | Permissions |
|---|---|
| student | View and enroll in courses |
| instructor | Create and manage own courses |
| admin | Full access to everything |

Git Workflow

Pull latest changes (on the Pi for deployment)
git pull

Add and commit changes
git add .
git commit -m "your commit message"
git push

Deploy on the Pi after pulling
docker compose up -d --build


Environment Variables

| Variable | Description | Example |
|---|---|---|
| DATABASE\_URL | PostgreSQL connection string | postgresql://user:pass@localhost:5432/db |
| SECRET\_KEY | JWT signing secret | a3f8c2e1b4d7... |
| ENVIRONMENT | Current environment | development or production |
| ACCESS\TOKEN\EXPIRE\_MINUTES | JWT token lifetime | 60 |
Never commit .env files to Git!