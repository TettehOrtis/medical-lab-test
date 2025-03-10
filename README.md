This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Medical Lab App

A web application for managing medical lab test results. Built with **Next.js**, **PostgreSQL**, and **Prisma ORM**. Users can add, view, edit, and delete test results.

---

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [API Documentation](#api-documentation)
   - [Get All Tests](#get-all-tests)
   - [Get a Single Test](#get-a-single-test)
   - [Add a New Test](#add-a-new-test)
   - [Update a Test](#update-a-test)
   - [Delete a Test](#delete-a-test)

---

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- PostgreSQL (installed and running)
- Prisma CLI (installed globally)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/medical-lab-app.git
   cd medical-lab-app

   npm install
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"

 Set Up Prisma

Initialize Prisma (if not already initialized):

bash
Copy
npx prisma init
Run migrations to set up the database schema:

bash
Copy
npx prisma migrate dev --name init
Generate the Prisma Client:

bash
Copy
npx prisma generate
Run the Application

Start the development server:

bash
Copy
npm run dev
Access the Application

Open your browser and navigate to http://localhost:3000.

API Documentation
The application provides a RESTful API for managing test results. Below are the available endpoints:

Base URL
Copy
http://localhost:3000/api/tests
Get All Tests
Endpoint: GET /api/tests

Description: Retrieve a list of all test results.

Response:

json
Copy
[
  {
    "id": 1,
    "patientName": "John Doe",
    "testType": "Blood Test",
    "result": "Normal",
    "testDate": "2023-10-01",
    "notes": "N/A"
  }
]
Get a Single Test
Endpoint: GET /api/tests/:id

Description: Retrieve details of a specific test result by ID.

Response:

json
Copy
{
  "id": 1,
  "patientName": "John Doe",
  "testType": "Blood Test",
  "result": "Normal",
  "testDate": "2023-10-01",
  "notes": "N/A"
}
Add a New Test
Endpoint: POST /api/tests

Description: Add a new test result.

Request Body:

json
Copy
{
  "patientName": "Jane Smith",
  "testType": "X-Ray",
  "result": "Clear",
  "testDate": "2023-10-02",
  "notes": "No issues found"
}
Response:

json
Copy
{
  "id": 2,
  "patientName": "Jane Smith",
  "testType": "X-Ray",
  "result": "Clear",
  "testDate": "2023-10-02",
  "notes": "No issues found"
}
Update a Test
Endpoint: PUT /api/tests/:id

Description: Update an existing test result by ID.

Request Body:

json
Copy
{
  "patientName": "Jane Smith",
  "testType": "X-Ray",
  "result": "Clear",
  "testDate": "2023-10-02",
  "notes": "No issues found, follow-up not required"
}
Response:

json
Copy
{
  "id": 2,
  "patientName": "Jane Smith",
  "testType": "X-Ray",
  "result": "Clear",
  "testDate": "2023-10-02",
  "notes": "No issues found, follow-up not required"
}
Delete a Test
Endpoint: DELETE /api/tests/:id

Description: Delete a test result by ID.

Response: 204 No Content

Prisma Schema
The database schema is defined in the prisma/schema.prisma file. Here's an example schema for the Test model:

prisma
Copy
model Test {
  id          Int      @id @default(autoincrement())
  patientName String
  testType    String
  result      String
  testDate    DateTime
  notes       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
Technologies Used
Frontend: Next.js, Tailwind CSS

Backend: Next.js API Routes

Database: PostgreSQL

ORM: Prisma