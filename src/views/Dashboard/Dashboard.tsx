import { useEffect, useState } from "react";
import PolarChart from "../../components/PolarAreaChart";

interface GenerationMix {
  fuel: string;
  perc: number;
}

interface ApiResponse {
  data: {
    from: string;
    to: string;
    generationmix: GenerationMix[];
  };
}
function Dashboard() {
  const [generationMix, setGenerationMix] = useState<GenerationMix[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.carbonintensity.org.uk/generation"
        );
        const jsonResponse: ApiResponse = await response.json();
        setGenerationMix(jsonResponse.data.generationmix);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>UK Energy Mix</h1>
      <PolarChart generationMix={generationMix} />
    </div>
  );
}

export default Dashboard;
