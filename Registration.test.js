import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Registrations from "./Registrations";

describe("Registrations component", () => {
  it("should submit registration form with valid data", async () => {
    render(<Registrations />);

    // Fill in the registration form
    fireEvent.change(screen.getByLabelText("Enter First Name"), {
      target: { value: "omar" },
    });
    fireEvent.change(screen.getByLabelText("Enter Last Name"), {
      target: { value: "samir" },
    });
    fireEvent.change(screen.getByLabelText("Enter Username"), {
      target: { value: "omar samir" },
    });
    fireEvent.change(screen.getByLabelText("Enter Email"), {
      target: { value: "omarsamir@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Enter Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Gender"), {
      target: { value: "male" },
    });

    fireEvent.click(screen.getByText("Submit"));

    // Wait for the registration process to complete
    await waitFor(() => {
      expect(screen.getByText("Registration Successful!")).toBeInTheDocument();
    });
  });
});
