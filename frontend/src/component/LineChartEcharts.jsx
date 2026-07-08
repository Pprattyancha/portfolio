import React from "react";
import ReactECharts from "echarts-for-react";

const LineChartEcharts = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>Loading chart...</p>;
    }
    const categories = data.map(item => item.category);
    const counts = data.map(item => Number(item.count));

    const option = {
        xAxis: {
            type: 'category',
            data: categories
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: counts,
                type: 'line'
            }
        ]
    };

    return (
        <ReactECharts
            option={option}
            style={{ height: "350px", width: "100%" }}
            notMerge={true}
            lazyUpdate={true}
        />
    );
};

export default LineChartEcharts;