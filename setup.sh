#!/bin/bash

cd frontend
npm install

cd ../backend
npm install

#docker client should be installed
docker build -t user-env .