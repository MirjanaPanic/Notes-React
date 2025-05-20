import { Button } from "react-bootstrap";
import type { ReactNode } from "react";

type MyButtonProps = {
  children: ReactNode;
};

export default function MyButton({ children }: MyButtonProps) {
  return (
    <Button
      className="rounded-pill"
      size="sm"
      style={{ border: "none" }}
    >
      {children}
    </Button>
  );
}
