'use client';

import { useState, useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import BookForm from '@/components/BookForm';
import { IBook } from '@/lib/models/Book';

export default function EditBook({ params }: { params: { id: string } }) {
  const [book, setBook] = useState<IBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch book data on component mount
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch book');
        }
        
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load book data');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [params.id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Edit Book</h1>
      {book && <BookForm book={book} isEditing={true} />}
    </Container>
  );
}