'use client';

import { useAuth, UserButton, SignInButton } from '@clerk/nextjs';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/">Book Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              href="/" 
              className={pathname === '/' ? 'active' : ''}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              href="/books" 
              className={pathname === '/books' ? 'active' : ''}
            >
              Books
            </Nav.Link>
            {isSignedIn && (
              <Nav.Link 
                as={Link} 
                href="/books/add" 
                className={pathname === '/books/add' ? 'active' : ''}
              >
                Add Book
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <button className="btn btn-outline-light">Sign In</button>
              </SignInButton>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}