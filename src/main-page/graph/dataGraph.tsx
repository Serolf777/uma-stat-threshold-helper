import { FC } from "react";
import Plot from "react-plotly.js";

export interface DataGraphProps {
    probabilities: number[];
    expectedAttempts: number[];
}

const DataGraph: FC<DataGraphProps> = ( {probabilities, expectedAttempts }) => {
    const values = Array.from({length: 10}, (_, i) => (i + 1) * 100);

    const chartData = [
        {
            x: values,
            y: probabilities,
            type: "scatter",
            mode: "lines+markers",
            customdata: values.map((_, i) => [
                expectedAttempts[i]
            ]),
            hovertemplate: "<b>Target Value:</b> %{x}<br>" +
            "<b>Chance to Reach:</b> %{y:.2%}<br>" +
            "<b>Expected Attempts:</b> %{customdata[0]}<br>" +
            "<extra></extra>"
        }
    ];
    
    const layout = {
        title: { text:"Probability" },
        xaxis: { title: { text: "Target Value" } },
        yaxis: {
            title: { text: "Probability" },
            tickformat: ".0%",
            range: [0, 1]
        }
    };

    return (
        <div>
            <Plot 
                data={chartData}
                layout={layout}
            />
        </div>
    )
}

export default DataGraph;