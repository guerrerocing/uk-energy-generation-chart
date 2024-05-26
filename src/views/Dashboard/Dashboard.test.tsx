import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import Dashboard from "./Dashboard";

// Mock data to be returned by the fetch request
const mockData = {
  data: {
    from: "2019-08-12T12:30Z",
    to: "2019-08-12T13:00Z",
    generationmix: [
      { fuel: "biomass", perc: 4.8 },
      { fuel: "coal", perc: 2.5 },
      { fuel: "imports", perc: 8.7 },
      { fuel: "gas", perc: 46.5 },
      { fuel: "nuclear", perc: 16.1 },
      { fuel: "other", perc: 0.3 },
      { fuel: "hydro", perc: 0.9 },
      { fuel: "solar", perc: 14.6 },
      { fuel: "wind", perc: 5.6 },
    ],
  },
};

describe("Dashboard", () => {
  // Mock the global fetch function before each test
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    ) as unknown as typeof fetch;
  });

  it("renders without crashing", () => {
    render(<Dashboard />);
    expect(screen.getByText("UK Energy Mix")).toBeInTheDocument();
  });

  it("displays the correct heading", () => {
    render(<Dashboard />);
    expect(screen.getByText("UK Energy Mix")).toBeInTheDocument();
  });

  it("handles fetch errors properly", async () => {
    // Mock the fetch to simulate a failure
    global.fetch = vi.fn(() =>
      Promise.reject(new Error("Failed to fetch"))
    ) as unknown as typeof fetch;

    render(<Dashboard />);

    // Spy on console.error to check if the error is logged
    const consoleSpy = vi.spyOn(console, "error");

    // Wait for the component to handle the error
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching the data",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});
