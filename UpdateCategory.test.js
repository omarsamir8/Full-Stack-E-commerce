import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Category from "./Category";
import updateCategory from "/src/components/Category/Category";
describe("Category component", () => {
  it("should update category with valid data and categoryId", async () => {
    render(<Category />);

    const categoryId = "mocked-category-id";

    fireEvent.change(screen.getByLabelText("Category Name"), {
      target: { value: "Updated Test Category" },
    });

    fireEvent.change(screen.getByLabelText("Category Image"), {
      target: { files: [new File(["test"], "test.png")] },
    });

    // Invoke the update function
    updateCategory(categoryId);

    // Wait for the success message to appear
    await waitFor(() => {
      expect(
        screen.getByText("Category updated successfully")
      ).toBeInTheDocument();
    });
  });
});
