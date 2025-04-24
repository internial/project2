'use client';

import { useEffect, useState } from 'react';
import { Container, Table, Button, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import toast from 'react-hot-toast';
import { IBook } from '@/lib/models/Book';

export default function Books() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);
  const { isSignedIn } = useAuth();

  // Fetch all books on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books');
        
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Handle book deletion
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this book?')) {
      return;
    }

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete book');
      }

      // Remove deleted book from state
      setBooks(books.filter(book => book._id !== id));
      toast.success('Book deleted successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete book');
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Books</h1>
        {isSignedIn && (
          <Button as={Link} href="/books/add" variant="success">
            Add New Book
          </Button>
        )}
      </div>

      {books.length === 0 ? (
        <div className="text-center my-5">
          <p>No books found. Add some books to get started.</p>
          {isSignedIn && (
            <Button as={Link} href="/books/add" variant="primary">
              Add Book
            </Button>
          )}
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Price</th>
              {isSignedIn && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.isbn}</td>
                <td>${book.price.toFixed(2)}</td>
                {isSignedIn && (
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        as={Link}
                        href={`/books/edit/${book._id}`}
                        variant="warning"
                        size="sm"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(book._id!)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}