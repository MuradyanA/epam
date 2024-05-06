import React, { useEffect, useState } from "react";
import { Nav } from "../components/Nav";
import { Car } from "../components/Car";
import { ICar } from "./ICar";
import { useSearchParams } from "react-router-dom";
import { CarManagement } from "../components/CarManagement";
import { EngineManagement } from "../components/EngineManagement";
import Modal from "../components/Modal";
import { url } from "inspector";
import Pagination from "../components/Pagination";
import CarsGenerator from "../components/CarsGenerator";

export interface RaceResult {
  id: number;
  time: number;
}

export interface CarProps {
  data: ICar;
  raceFlag: number;
  raceResults: RaceResult[] | [];
  setRaceResults: (raceResults: RaceResult[] | []) => void;
  addResult: (res: RaceResult) => void;
  setRaceFlag: (raceFlag: number) => void;
  setCar: (car: ICar) => void;
  setUpdateFlag: (updateFlag: boolean) => void;
}

export type Winner = (RaceResult & { carName: string }) | undefined;

export function Garage() {
  const [cars, setCars] = useState<ICar[]>([]);
  const [car, setCar] = useState<ICar>({ name: "", color: "", id: 0 });
  const [updateFlag, setUpdateFlag] = useState(false);
  const [raceFlag, setRaceFlag] = useState(0);
  const [raceResults, setRaceResults] = useState<RaceResult[]>([]);
  const [raceWinner, setRaceWinner] = useState<Winner>();
  const [pageNumber, setPageNumber] = useSearchParams();
  const [totalCarsNumber, setTotalCarsNumber] = useState(0)

  async function fetchData(url: string, page: number = 1, limit: number = 7) {
    try {
      const resp = await fetch(url + `?_page=${page}&_limit=${limit}`);
      if (!resp.ok) throw resp.statusText;
      setTotalCarsNumber(Number(resp.headers.get("X-Total-Count")))
      const data = await resp.json();
      setCars(data);
    } catch (e) {
      console.error(e);
    }
  }

  function addResult(res: RaceResult) {
    setRaceResults((prev: RaceResult[]) => {
      if (prev.length) {
        return [...prev, res];
      } else {
        return [res];
      }
    });
  }

  async function setWinner(winner: RaceResult) {
    const winnerResp = await fetch(`http://localhost:3000/winners/${winner.id}`);
    const winnerData = await winnerResp.json();

    try {
      if (winnerResp.status === 404) {
        const body = JSON.stringify({
          id: winner.id,
          wins: 1,
          time: winner.time,
        });
        const res = await fetch(`http://localhost:3000/winners`, {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: body,
        });
      } else {
        const winsCount = winnerData.wins + 1;
        const winTime = winner.time < winnerData.time ? winner.time : winnerData.time;
        console.log(winner.time, winnerData.time);
        console.log(winsCount, winTime);
        const res = await fetch(`http://localhost:3000/winners/${winner.id}`, {
          method: "PUT",
          body: JSON.stringify({
            wins: winsCount,
            time: winTime,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        console.log(winnerResp.status);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData("http://localhost:3000/garage");
  }, []);

  useEffect(() => {
    if (updateFlag) {
      fetchData("http://localhost:3000/garage");
    }
  }, [updateFlag]);

  useEffect(() => {
    // pageNumber.get('_page')
    fetchData("http://localhost:3000/garage", Number(pageNumber.get("_page")));
  }, [pageNumber]);

  useEffect(() => {
    let smallestTimeResult: RaceResult = raceResults[0];
    if (cars.length === raceResults.length) {
      raceResults.forEach((element) => {
        if (element.time < smallestTimeResult.time) {
          smallestTimeResult = element;
        }
      });
      let carName = cars.find((elem) => elem.id === smallestTimeResult.id)?.name;
      if (raceResults.length) {
        setRaceWinner({ ...smallestTimeResult, carName: carName ? carName : "" });
        setWinner(smallestTimeResult);
      }
    }
  }, [raceResults]);

  return (
    <div>
      <Nav />
      <div>
        <CarManagement car={car} setCar={setCar} setUpdateFlag={setUpdateFlag} />
        <p className="ml-[1%] rounded-md text-white w-fit bg-gray-600 opacity-90 p-2 text-xl">Total Cars Count: {totalCarsNumber}</p>
        <div className="flex flex-rows items-center">
          <EngineManagement setRaceFlag={setRaceFlag} />
          <CarsGenerator setUpdateFlag={setUpdateFlag} />
        </div>
      </div>
      <div className="absolute flex flex-col items-start justify-start gap-2">
        {cars.map((el) => (
          <Car
            setCar={setCar}
            setRaceFlag={setRaceFlag}
            addResult={addResult}
            setRaceResults={setRaceResults}
            raceResults={raceResults}
            raceFlag={raceFlag}
            key={el.id}
            data={el}
            setUpdateFlag={setUpdateFlag}
          />
        ))}
      </div>
      <div className="w-full bg-gray-700 flex">
        <div className="bg-gray-700 flex flex-col">
          <div className={"w-40 h-[" + cars.length * 50 + "px]"}></div>
        </div>
        <div className="bg-blue-400 text-sm [writing-mode:vertical-lr] text-center w-fit">
          <div className="font-bold">START</div>
        </div>
        <div className="flex w-[85%] flex-col">
          {cars.map((el) => (
            <div
              key={el.id}
              className="border-t-2 border-b-2 border-dashed border-gray-300 flex items-center justify-center h-full"
            >
              <p className="text-xl text-white opacity-40 tracking-widest">{el.name}</p>
            </div>
          ))}
        </div>
        <div className="bg-green-500 w-fit text-sm [writing-mode:vertical-lr] text-center">
          <div className="font-bold">FINISH</div>
        </div>
      </div>
      {raceWinner && <Modal setRaceResults={setRaceResults} setRaceWinner={setRaceWinner} raceWinner={raceWinner} />}
      <div className="flex justify-around mt-[2%]">
        <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </div>
    </div>
  );
}
