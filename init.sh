#!/bin/bash

echo " [+] Saas23-24"
echo " [+] Creating dist folder for microservice02 - UI"
cd ./microservice02
echo " [+] Installing dependencies"
npm install 
echo " [+] Crafting folder..."
npm run build
echo " [+] Status : Done."
cd ..

echo " [+] Creating jar file for microservice03 - client information."
cd microservice03
./gradlew build
echo " [+] Status : Done."
cd ..

echo " [+] Run docker compose up to launch the services."
echo " [i] You need a docker network named mycharts-network with ip range 10.0.1.0/24."
