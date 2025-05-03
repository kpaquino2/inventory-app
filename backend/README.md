# Inventory Backend

This is a backend REST API for managing products and categories in an inventory system. It uses NestJS, Prisma, and PostgreSQL, and includes basic authentication and role-based access.

## Dev Setup

1. Set up your .env file

```bash
cp .env-example .env
# now edit the .env file
```

2. Run in development mode

```bash
docker-compose up --build
```

3. Populate the database (only if needed)

```bash
docker-compose exec backend npx prisma db seed
```

## API Reference

Once the server is running, open:

```bash
http://localhost:3000/api
```
