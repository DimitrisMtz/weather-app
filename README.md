# Assigment

A weather information app made with Flask and React.


## Run Locally

Clone the project

```bash
  git clone https://github.com/DimitrisMtz/weather-app
```

Go to the project directory

```bash
  cd weather-app
```

### Backend setup
Go to the backend directory

```bash
  cd backend
```

Create a virtual environment and activate it

```bash
  python -m venv venv
```
Unix
```bash
  source /venv/bin/activate
```
Install dependencies
```bash
  pip install -r requirements.txt
```
### Database and migrations
Go to the api directory
```bash
  cd api
```
Create an Sqlite database file
```bash
  touch db.sqlite3
```
Make migrations
```bash
  flask db init
```
```bash
  flask db migrate
```
```bash
  flask db upgrade
```
### Start Flask server
Change directory to backend
```bash
  cd ..
```
Run server
```
  python app.py
```

### Frontend setup
Go to the Frontend directory
```bash
  cd ../frontend
```
Install dependencies
```bash
  npm Install
```
Run frontend server
```bash
  npm run start
```