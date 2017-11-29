# save-the-pony

implement a [pony](https://ponychallenge.trustpilot.com/api-docs/index.html) playable game

## tech
* .net core
* vue.js

## TODO
* [x] make axios -> post
* [x] endpoint to create new instance of the game
* [x] use axios for all the requests to controllers
* [x] landing page when no game is loaded
* [x] controls for new game creation (name, size, dificulty)
* [x] fix maze.move method to use maze id
* [ ] use keyboard to move around
* [ ] use better naming for MazeController
* [ ] make controllers and maze pretty


## docker
```
$ docker build -t aspnetapp .

$ docker run -it --rm -p 8000:80 --name save-the-pony aspnetapp
```