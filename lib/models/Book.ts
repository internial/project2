import mongoose, { Schema, models, model } from 'mongoose';

// Define the book schema with required fields
export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    isbn: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

// Check if the model already exists to prevent recompilation
const Book = models.Book || model<IBook>('Book', bookSchema);

export default Book;