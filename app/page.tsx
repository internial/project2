import { Button } from 'react-bootstrap';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center my-5">
      <h1>Welcome to Book Management System</h1>
      <p className="lead my-4">
        A simple application to manage your book inventory
      </p>
      <div className="d-flex justify-content-center gap-3">
        <Button as={Link} href="/books" variant="primary">
          View Books
        </Button>
        <Button as={Link} href="/sign-in" variant="outline-primary">
          Sign In
        </Button>
      </div>
    </div>
  );
}