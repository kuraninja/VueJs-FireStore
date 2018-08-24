# vuejs-CRUD-app

> A Vue.js simple product app with firestore

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build


```

``` bash
# running dockerfile
docker build -t vuecrud .

# running with docker-compose
docker-compose up

# run it in minikube
minikube start
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

#access in url
minikube service vuecrud --url


```
