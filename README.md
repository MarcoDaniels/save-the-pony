# save-the-pony

_implementation of the [pony challenge](https://ponychallenge.trustpilot.com/api-docs/index.html) 
playable game with a looks of a pacman_

## demo
[save the pony](http://save-the-pony.apphb.com/)

## docker
```
$ docker build -t aspnetapp .

$ docker run -it --rm -p 8000:80 --name save-the-pony aspnetapp
```