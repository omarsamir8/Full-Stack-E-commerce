import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Category from "./Category";

describe("Category component", () => {
  it("should create category with valid data", async () => {
    render(<Category />);

    // Fill in the create category form
    fireEvent.change(screen.getByLabelText("Category Name"), {
      target: { value: "Test Category" },
    });
    // For file input, you may need to mock the file object and pass it to the input field
    fireEvent.change(screen.getByLabelText("Category Image"), {
      target: { files: [new File(["test"], "test.png")] },
    });

    fireEvent.click(screen.getByText("Add Category"));

    // Wait for the success message to appear
    await waitFor(() => {
      expect(
        screen.getByText("Category Added Successful!")
      ).toBeInTheDocument();
    });
  });
});

// delete category
