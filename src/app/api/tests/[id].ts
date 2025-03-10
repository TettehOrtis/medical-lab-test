import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

// Define Zod schema for update validation
const updateTestSchema = z.object({
  patientName: z.string().optional(),
  testType: z.string().optional(),
  result: z.string().optional(),
  testDate: z.string().optional(),
  notes: z.string().optional(),
});

// GET a single test by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const test = await prisma.diagnosticTest.findUnique({ where: { id: params.id } });

    if (!test) {
      return NextResponse.json({ message: "Test not found" }, { status: 404 });
    }

    return NextResponse.json(test, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching test" }, { status: 500 });
  }
}

// UPDATE a test
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const validatedData = updateTestSchema.parse(body);

    const updatedTest = await prisma.diagnosticTest.update({
      where: { id: params.id },
      data: validatedData,
    });

    return NextResponse.json(updatedTest, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ message: "Test not found" }, { status: 404 });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation failed", errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

// DELETE a test
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.diagnosticTest.delete({ where: { id: params.id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ message: "Test not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Error deleting test" }, { status: 500 });
  }
}
