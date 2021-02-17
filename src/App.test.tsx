import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders zero", () => {
  render(<App />);
  const spanElement = screen.getByText(/0/i);
  expect(spanElement).toBeInTheDocument();
});
