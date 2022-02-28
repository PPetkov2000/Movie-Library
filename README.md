## Table of Contents

- [Installation](#installation)
- [About the Project](#about-the-project)
- [Website](#website)

## Installation

1. Clone the repo

```sh
git clone https://github.com/PPetkov2000/Movie-Library
```

2. Install NPM frontend packages

```sh
npm install
```

3. Install NPM backend packages

```sh
cd api => npm install
```

4. Create .env file in the api folder and add the following

```sh
PORT=some_port
MONGO_URI=your_mongoDB_uri
JWT_SECRET=your_jwt_secret
```

5. Run Application

```sh
run frontend: npm start
run backend: cd api => npm run server
```

6. Go to

```sh
http://localhost:3000/
```

## About The Project

The project is a movie library application where users can search for their favorite movies. Тhe home page shows the current user's favorite movies. Тhe search page shows all the searched movies by the user. Users can register and log in. Еach user can add/remove movie from favorites, create private notes about a movie, add movie rating.

## Website

![Movie-Library](https://github.com/PPetkov2000/Movie-Library/blob/main/app-view.png)
