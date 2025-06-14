//za Yes, Save(type="green") i Discard(type="gray") npr.

import type React from "react";
import { Button } from "react-bootstrap";

//videti da li mogu i ostala da se iskoriste

//bukvalno su isti stil, samo boja se razlikuje, backgroundColor i color
type ButtonProps = {
  type: "secondary" | "success";
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

export default function MyButton({
  type,
  onClick,
  disabled,
  children,
}: ButtonProps) {
  return (
    <Button
      variant={type}
      disabled={disabled}
      onClick={onClick}
      style={{ borderRadius: "20px" }}
    >
      {children}
    </Button>
  );
}
