# nsk-api
Node Starter Kit for HTTP API Applications

[API Documentation](./documentation/index.md)

## Installing
Clone the repo and install dependencies
```shell
$ git clone git@github.com:jasonsites/nsk-api.git
$ cd nsk-api && npm i
```

## Development
**Prerequisites**
*[Docker Desktop](https://www.docker.com/products/docker-desktop)*

**Run the app in development mode**
```shell
$ docker compose run --rm --service-ports api
```

**Run full test suite with code coverage**
```shell
$ docker compose -f docker-coverage.yml run --rm coverage
```

## License
Copyright (c) 2022 Jason Sites

Licensed under the [MIT License](LICENSE.md)
