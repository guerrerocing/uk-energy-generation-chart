import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PolarAreaChart from "./PolarAreaChart";

const generationMixData = [
  { fuel: "biomass", perc: 4.8 },
  { fuel: "coal", perc: 2.5 },
  { fuel: "imports", perc: 8.7 },
  { fuel: "gas", perc: 46.5 },
  { fuel: "nuclear", perc: 16.1 },
  { fuel: "other", perc: 0.3 },
  { fuel: "hydro", perc: 0.9 },
  { fuel: "solar", perc: 14.6 },
  { fuel: "wind", perc: 5.6 },
];

describe("PolarAreaChart", () => {
  it("renders without crashing", () => {
    render(<PolarAreaChart generationMix={generationMixData} />);
  });

  it("displays the correct data in the chart", () => {
    render(<PolarAreaChart generationMix={generationMixData} />);
    const chartElement = screen.getByRole("img");
    expect(chartElement).toBeInTheDocument();
  });

  it("renders chart with correct border width", () => {
    render(<PolarAreaChart generationMix={generationMixData} />);
    const chartElement = screen.getByRole("img");
    expect(chartElement).toHaveStyle("border-width: 1");
  });
});
