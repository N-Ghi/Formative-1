#!/bin/sh
set -e

echo "Waiting for PostgreSQL to be ready..."

# Wait for database to be available
until PGPASSWORD=$AZURE_DB_PASSWORD psql -h "$AZURE_DB_HOST" -U "$AZURE_DB_USER" -d "$AZURE_DB_NAME" -c '\q' 2>/dev/null; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 2
done

echo "PostgreSQL is ready!"

echo "Running database migrations..."
NODE_ENV=production npx sequelize-cli db:migrate

echo "Seeding database..."
NODE_ENV=production npx sequelize-cli db:seed:all

echo "Starting application..."
exec "$@"