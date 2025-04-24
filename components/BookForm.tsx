'use client';

import { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { IBook } from '@/lib/models/Book';

interface BookFormProps {
  book?: IBook;
  isEditing?: boolean;
}

export default function BookForm({ book, isEditing = false }: BookFormProps) {
  const [formData, setFormData] = useState<IBook>({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    price: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // If editing, populate form with book data
  useEffect(() => {
    if (isEditing && book) {
      setFormData(book);
    }
  }, [book, isEditing]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = isEditing ? `/api/books/${book?._id}` : '/api/books';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? 'update' : 'create'} book`);
      }

      toast.success(`Book ${isEditing ? 'updated' : 'added'} successfully!`);
      router.push('/books');
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Failed to ${isEditing ? 'update' : 'add'} book`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="my-4">
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Genre</Form.Label>
        <Form.Control
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>ISBN</Form.Label>
        <Form.Control
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button 
          variant="primary" 
          type="submit" 
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              {isEditing ? 'Updating...' : 'Saving...'}
            </>
          ) : (
            isEditing ? 'Update Book' : 'Add Book'
          )}
        </Button>
        <Button 
          variant="secondary" 
          onClick={() => router.push('/books')}
          disabled={submitting}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
}