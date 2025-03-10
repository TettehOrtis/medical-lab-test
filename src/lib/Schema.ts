import { z } from "zod";

export const diagnosticTestSchema = z.object({
  id: z.string().optional(),
  patientName: z.string().min(2, "Patient name is required"),
  testType: z.string().min(2, "Test type is required"),
  result: z.string().min(1, "Result is required"),
  testDate: z.string(),
  notes: z.string().optional(),
});

export type DiagnosticTest = z.infer<typeof diagnosticTestSchema>;
