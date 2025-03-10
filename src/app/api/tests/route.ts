import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

// Define Zod schema for validation
const testSchema = z.object({
  patientName: z.string().min(1, "Patient name is required"),
  testType: z.string().min(1, "Test type is required"),
  result: z.string().min(1, "Result is required"),
  testDate: z.string().optional(),
  notes: z.string().optional(),
});

// GET all tests
export async function GET() {
  try {
    const tests = await prisma.diagnosticTest.findMany();
    return NextResponse.json(tests, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching tests" }, { status: 500 });
  }
}

// POST new test
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = testSchema.parse(body);

    // Convert testDate safely
    const formattedData = {
      ...validatedData,
      testDate: validatedData.testDate ? new Date(validatedData.testDate) : new Date(),
    };

    const newTest = await prisma.diagnosticTest.create({ data: formattedData });

    return NextResponse.json(newTest, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation failed", errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
