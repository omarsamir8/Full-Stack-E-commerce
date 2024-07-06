import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Login from "./Login";
test("login with correct credentials", () => {
  expect.assertions(2); // Declare 2 assertions

  // Mocking the fetch function to return a successful response
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ role: "user" }), // assuming user role for testing
  });

  render(<Login />);

  fireEvent.change(screen.getByLabelText("E-mail"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "password123" },
  });

  fireEvent.click(screen.getByText("Submit"));

  expect(localStorage.getItem("token")).toBeTruthy();

  expect(localStorage.getItem("refreshToken")).toBeTruthy();

  // Assertion outside of waitFor
  expect(screen.getByText("Welcom To Our Website")).toBeInTheDocument();
});
