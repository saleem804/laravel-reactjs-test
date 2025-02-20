##Docker Setup Documentation for Backend and Frontend

##Prerequisites
- Docker Compose installed

##Clone project from below github repository: 
git clone https://github.com/saleem804/laravel-reactjs-test.git

##Backend Setup (Laravel) with docker

- Open terminal at this folder: laravel-reactjs-test
- Run command : cd backend
- Run below command to setup laravel API environment: 
	docker-compose up -d --build

##Frontend Setup (reactjs/typscript) with docker
- Open terminal at this folder: laravel-reactjs-test
- Run command : cd frontend
- Run below command to setup reactjs/typscript app: 
	docker-compose up -d --build
- Open the url in browser: http://localhost:3000

##Testing
- Signup new user.
- Login that user.
- Go to preferences menu and Save Preferences.
- Check News feed and News Article filtering.
