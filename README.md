# Addis Spare Part Platform

## Preface

The Addis Spare Part platform was conceived in response to the growing need for a centralized, efficient, and reliable solution in the automotive spare parts industry in Ethiopia. Traditionally, finding the right spare part for a specific vehicle has been a time-consuming and uncertain process. This project aims to change that by creating a digital marketplace that prioritizes accuracy, trust, and convenience for both buyers and sellers.

## Introduction

The Addis Spare Parts E-Commerce Platform is a web-based marketplace designed to revolutionize the automotive spare parts industry by connecting buyers (car owners, mechanics) with sellers (suppliers, retailers) in a seamless, secure, and scalable digital ecosystem.

## Architecture

The platform is built using a modern, scalable architecture:

### Backend Architecture

- **Framework**: NestJS (Node.js)
- **Architecture Pattern**: Domain-Driven Design (DDD)
- **Database**: PostgreSQL with TypeORM
- **API Style**: RESTful
- **Authentication**: JWT-based authentication
- **Event Handling**: CQRS (Command Query Responsibility Segregation)

### Key Components

1. **Domain Layer**

   - Entities
   - Value Objects
   - Domain Events
   - Domain Services

2. **Application Layer**

   - Use Cases
   - DTOs
   - Command/Query Handlers

3. **Infrastructure Layer**

   - Repositories
   - External Services
   - Database Connections

4. **Interface Layer**
   - Controllers
   - Middleware
   - API Documentation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm
- Docker and Docker Compose
- PostgreSQL

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd addis-spare-api
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
# Development mode
pnpm run start:dev

# Production mode
pnpm run start:prod
```

### Docker Setup

Build and run the application using Docker:

```bash
# Build the image
docker build -t addis-spare-api .

# Run the container
docker run -p 3000:3000 addis-spare-api
```

Or use Docker Compose:

```bash
docker-compose up -d
```

## Development

### Available Scripts

```bash
# Development
pnpm run start:dev

# Production
pnpm run start:prod

# Testing
pnpm run test
pnpm run test:e2e
pnpm run test:cov

# Linting
pnpm run lint
```

### Code Style

The project uses:

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

## API Documentation

API documentation is available at `/api` when running the server.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
