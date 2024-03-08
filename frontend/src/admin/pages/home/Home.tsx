import React, { useEffect, useState } from "react";
import ChartBox from "./../../components/chartBox/ChartBox";
import TopBox from "./../../components/topBox/TopBox";
import { boxesData } from "../../../data";
import { invoke } from "@tauri-apps/api/tauri";
import "./home.scss";

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
        <ChartBox {...boxes[1]} />
      </div>
      <div className="box box3">
        <ChartBox
          icon={""}
          dataKey={""}
          number={""}
          percentage={0}
          chartData={[]}
        />
      </div>
      <div className="box box4">
        <ChartBox
          icon={""}
          dataKey={""}
          number={""}
          percentage={0}
          chartData={[]}
        />
      </div>
      <div className="box box5">
        <ChartBox
          icon={""}
          dataKey={""}
          number={""}
          percentage={0}
          chartData={[]}
        />
      </div>
      <div className="box box6">
        <ChartBox
          icon={""}
          dataKey={""}
          number={""}
          percentage={0}
          chartData={[]}
        />
      </div>
      <div className="box box7">box7</div>
      <div className="box box8">box8</div>
      <div className="box box9">box9</div>
    </div>
  );
};

export default Home;
