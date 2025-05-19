import { Navbar, Container, Form, Button, Nav } from "react-bootstrap";

export default function MyNavbar({ username = "Mika" }) {
  return (
    <Navbar
      expand="lg"
      className="px-4 py-2"
      style={{ backgroundColor: "#f1eada" }}
    >
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        {/* Logo 
        <Navbar.Brand href="#" className="fw-bold fs-4">
          NoMind
        </Navbar.Brand>
        */}

        {/* Search bar */}
        <Form className="d-flex w-75">
          <Button
            className="rounded-pill"
            size="sm"
            style={{ backgroundColor: "#b0c4e4", border: "none" }}
            disabled
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#434343"
            >
              <path d="M787.64-137.33 530.87-394.1q-29.9 25.86-69.4 40.06-39.51 14.19-81.78 14.19-102.1 0-172.82-70.68-70.71-70.68-70.71-171.84 0-101.17 70.68-171.91t171.99-70.74q101.31 0 172.03 70.69 70.73 70.7 70.73 171.9 0 42.3-14.39 81.84-14.38 39.54-40.53 70.69l257.17 256.1-36.2 36.47ZM379.28-390.1q80.41 0 136.23-55.96 55.82-55.97 55.82-136.38t-55.82-136.37q-55.82-55.96-136.23-55.96-80.75 0-136.81 55.96t-56.06 136.37q0 80.41 56.06 136.38 56.06 55.96 136.81 55.96Z" />
            </svg>
          </Button>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            style={{
              borderRadius: "20px",
              backgroundColor: "#f1eada",
              border: "1px solid #b0c4e4",
            }}
          />
        </Form>

        {/* Logged-in user */}
        <Nav className="d-flex ">
          <div
            className="d-flex align-items-center text-muted px-3 py-1 rounded-pill gap-3"
            style={{ backgroundColor: "#edd166" }}
          >
            {/* Ikonica + username */}
            <div className="d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#434343"
                className="me-2"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 
          1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 
          4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
              <span>{username}</span>
            </div>

            {/* Logout dugme */}
            <div>
              <Button
                style={{
                  color: "inherit",
                  background: "none",
                  border: "none",
                  padding: 0,
                  textDecoration: "none",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#434343"
                >
                  <path
                    d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 
              23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 
              102-102H360v-80h327L585-622l55-58 
              200 200-200 200Z"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}
