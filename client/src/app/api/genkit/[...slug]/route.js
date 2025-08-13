// In src/app/api/genkit/[...slug]/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.json();

    // --- Backend Processing Logic ---
    // At this point, you have the form data on the backend.
    // You can now:
    // 1. Save it to a database (e.g., MongoDB, PostgreSQL, Firebase).
    // 2. Process the photo (e.g., save it to a cloud storage like AWS S3 or Cloudinary).
    // 3. Send a confirmation email.

    console.log('Received Registration Data:', formData);

    // For now, we'll just log it and return a success message.
    return NextResponse.json({
      message: 'Registration successful!',
      data: {
        id: new Date().getTime(), // Example: generate a unique ID
        name: formData.fullName,
      },
    }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error)      ;
    return NextResponse.json({
      message: 'An error occurred during registration.',
      error: error.message
    }, { status: 500 });
  }
}

// You can keep these or remove them if you don't need GET/OPTIONS
export const GET = () => new Response('API is running. Use POST to submit data.');
export const OPTIONS = () => new Response(null, { status: 204 });