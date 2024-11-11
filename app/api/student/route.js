// Import necessary modules and configuration
import { NextResponse } from "next/server";
import { db } from '../../../utils/dbConfig'; // Adjust based on folder depth


import { students } from "@/utils/schema";

export async function POST(req) {
  // Parse the request body data
  const data = await req.json();

  // Insert the student data into the `students` table
  const result = await db.insert(students).values({
    name: data.name,
    email: data.email,
    batchId: data.batch, // Ensure `batch` is the selected batch ID
    enrollment: data.enrollment, // Enrollment number from the form
    createdBy: 1, // Set a fixed `createdBy` value or update as needed
  });

  // Return the inserted student data as a JSON response
  return NextResponse.json({ success: true, result });
}
export async function GET(req) {
  const result=await db.select().from(students);
  return NextResponse.json(result);
}
export async function DELETE(req) {
  const searchParams=req.nextUrl.searchParams;
  const id=searchParams.get('id');
  const result=await db.delete(students)
  .where(req(students.id,id));
  return NextResponse.json(result);
}