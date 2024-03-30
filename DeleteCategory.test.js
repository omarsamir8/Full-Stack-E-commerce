import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Category from "./Category";
import deletecategory from "/src/components/Category/Category";
describe("Category component", () => {
  it("should delete category with valid categoryId", async () => {
    render(<Category />);

    const categoryId = "mocked-category-id";
    // Invoke the delete function
    deletecategory(categoryId);

    await waitFor(() => {
      expect(
        screen.queryByText(`Course with ID ${categoryId} deleted successfully.`)
      ).not.toBeInTheDocument();
    });
  });
});
