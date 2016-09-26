#!/bin/bash

if [ "$PROD" = "true" ]
then
    echo "Starting in production environment..."
    npm run build
    exec node server.js
else
    echo "Starting in dev environment..."
    exec npm start -- --host 0.0.0.0
fi