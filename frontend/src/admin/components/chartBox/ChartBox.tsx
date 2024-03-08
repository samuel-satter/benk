import "./chartBox.scss";
import image from "../../../assets/logo-only.png";
import { Link } from "react-router-dom";
import Home from "./../../../user/pages/home/Home";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

type Props = {
  icon: string;
  dataKey: string;
  number: number | string;
  percentage: number;
  chartData: object[];
};

const ChartBox: React.FC<Props> = (props) => {
  const dataPoints = [
    { x: 1, y: 10 },
    { x: 2, y: 150 },
    { x: 3, y: 100 },
    { x: 4, y: 201 },
  ];
  const [userGrowth, setUserGrowth] = useState<number | null>(null);
  const [chartData, setChartData] = useState<object[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const growth = await invoke<number>("get_user_growth");
        setUserGrowth(growth);
      } catch (error) {
        console.error("failed to fetch user growth", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          <img src={image} alt="" height={30} />
          <span>Total users</span>
        </div>
        <h1>{props.number}</h1>
        <Link to="/admin">View all</Link>
      </div>
      <div className="chartInfo">
        <div className="chart">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={dataPoints}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 40, y: 90 }}
              />
              <Line
                type="monotone"
                dataKey="y"
                stroke="#7439db"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          <span
            className="percentage"
            style={{
              color:
                userGrowth !== null && userGrowth < 0 ? "tomato" : "limegreen",
            }}
          >
            {userGrowth !== null && `${userGrowth}`}
          </span>
          <span className="duration">This month</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
