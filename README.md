# Blog App

A full-featured blog application built with [NestJS](https://nestjs.com/). This project demonstrates a modular backend architecture with authentication, posts, comments, votes, and image management.

## Features
- User authentication (with admin support)
- Create, read, update, delete (CRUD) for posts
- Commenting system
- Voting on posts
- Image upload and management
- Role-based access control
- Modular, scalable code structure

## Tech Stack
- **Backend Framework:** [NestJS](https://nestjs.com/)
- **Database:** SQLite (default, can be swapped)
- **ORM:** TypeORM
- **Authentication:** Custom guards & middleware
- **Testing:** Jest

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm (v8+ recommended)

### Installation
```bash
npm install
```

### Running the App
```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

### Running Tests
```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

## Project Structure
```
src/
  app.controller.ts      # Root controller
  app.module.ts          # Root module
  app.service.ts         # Root service
  main.ts                # Entry point
  auth/                  # Authentication & guards
  comments/              # Comments module
  images/                # Image upload/service
  posts/                 # Blog posts module
  users/                 # User management
  votes/                 # Voting system
```

## API Overview
- **/auth**: Login, register, admin guard
- **/posts**: CRUD for blog posts
- **/comments**: CRUD for comments
- **/users**: User management
- **/votes**: Upvote/downvote posts
- **/images**: Image upload and retrieval

> For detailed API usage, see controller files in `src/` or use an API tool (e.g., Postman) to explore endpoints.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License
[MIT](LICENSE)
