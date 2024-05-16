import React, { useEffect, useState } from "react";
import ChartBox from "./../../components/chartBox/ChartBox";
import TopBox from "./../../components/topBox/TopBox";
import { boxesData, chartBoxLoans } from "../../../data";
import { invoke } from "@tauri-apps/api/tauri";
import "./home.scss";
import BigChartBox from "../../components/bigChartBox/BigChartBox";
import PieChartBox from "../../components/pieChartBox/PieChartBox";

import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../../../data";

import BarChartBox from "../../components/barChartBox/BarChartBox";

const Home: React.FC = () => {
  const [boxes, setBoxes] = useState(boxesData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        for (let i = 0; i < boxes.length; i++) {
          if ([1, 2, 4, 5].includes(i)) {
            const growth = await invoke<number>(`get_growth_for_box_${i}`);
            boxes[i].percentage = growth;

            const chartData = await invoke<object[]>(
              `fetch_chart_data_for_box_${i}`
            );
            boxes[i].chartData = chartData;
          }
        }
        setBoxes([...boxes]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox {...chartBoxUser} />
      </div>
      <div className="box box3">
        <ChartBox
          {...chartBoxLoans}
        />
      </div>
      <div className="box box4">
        <PieChartBox></PieChartBox>
      </div>
      <div className="box box5">
        <ChartBox
          {...chartBoxConversion}
        />
      </div>
      <div className="box box6">
        <ChartBox
          {...chartBoxRevenue}
        />
      </div>
      <div className="box box7">
        <BigChartBox></BigChartBox>
      </div>
      <div className="box box8">
        <BarChartBox {...barChartBoxVisit}></BarChartBox>
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBoxRevenue}></BarChartBox>
      </div>
    </div>
  );
};

export default Home;
