#!/bin/bash

# Run database migrations
php artisan migrate

sleep 10
# Start Laravel application in the background
php artisan serve --host=0.0.0.0 --port=8000 &

# Wait for the application to be fully up before running the scrape command
sleep 10

# Run the scraping command
php artisan news:scrape

# Keep the container running
wait
