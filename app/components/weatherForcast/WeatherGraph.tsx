import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { kelvinToCelsius } from "./WeatherForcast";

type WeatherGraphProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  weatherForcastGraph: any;
};

const WeatherGraph = ({ weatherForcastGraph }: WeatherGraphProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = weatherForcastGraph.days.map((w: any) => {
    return {
      hr: w.dt_txt.split(" ")[1].slice(0, 5),
      temp: kelvinToCelsius(w.main.temp),
    };
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-200 p-2 text-slate-900 rounded">
          <p className="label">{`${label.slice(0, 2)}h, ${
            payload[0].value
          } °C`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: -30,
          bottom: 5,
        }}
      >
        <XAxis dataKey="hr" />
        <YAxis type="number" dataKey="temp" domain={[0, 15, 30, 45, 50]} />
        <Tooltip content={<CustomTooltip />} />

        <Line
          type="monotone"
          dataKey="temp"
          stroke="#8884d8"
          activeDot={{
            r: 8,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeatherGraph;
