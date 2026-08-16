#!/bin/sh
set -e

echo "Running database migrations..."
npm run migrate:deploy

echo "Seeding database (idempotent — skips content that already exists)..."
npm run seed || echo "Seed step failed or already applied, continuing."

echo "Starting app..."
exec "$@"
