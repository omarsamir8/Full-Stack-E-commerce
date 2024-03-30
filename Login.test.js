import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
const React = require("react");
const {
  render,
  fireEvent,
  waitFor,
  screen,
} = require("@testing-library/react");
const Login = require("./Login").default;

describe("Login component", () => {
  it("should login successfully with correct credentials", async () => {
    render(<Login />);

    const emailInput = screen.getByLabelText("E-mail");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      if (token && refreshToken) {
        return;
      } else {
        throw new Error("Token or refreshToken not defined yet");
      }
    });
  });
});
