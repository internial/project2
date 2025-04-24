import { Container } from 'react-bootstrap';
import BookForm from '@/components/BookForm';

export default function AddBook() {
  return (
    <Container>
      <h1>Add New Book</h1>
      <BookForm />
    </Container>
  );
}