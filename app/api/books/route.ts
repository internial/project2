import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Book, { IBook } from '@/lib/models/Book';
import { auth } from '@clerk/nextjs';

/**
 * GET handler to fetch all books
 */
export async function GET() {
  try {
    await connectToDatabase();
    const books = await Book.find({}).sort({ createdAt: -1 });

    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}

/**
 * POST handler to create a new book
 * Requires authentication
 */
export async function POST(request: NextRequest) {
  const { userId } = auth();

  // Check if user is authenticated
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();
    const bookData: IBook = await request.json();
    
    const newBook = new Book(bookData);
    await newBook.save();

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json(
      { error: 'Failed to create book' },
      { status: 500 }
    );
  }
}