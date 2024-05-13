import React, { useState } from "react";
import { ICar } from "../pages/ICar";

interface CarProps {
  setUpdateFlag:  React.Dispatch<React.SetStateAction<boolean>>;
}

interface Car {
  name: string;
  color: string;
}

export default function CarsGenerator({setUpdateFlag }: CarProps) {
  const brandOptions: string[] = [
    "Tesla",
    "Ford",
    "Chevrolet",
    "Toyota",
    "Honda",
    "BMW",
    "Mercedes",
    "Audi",
    "Volkswagen",
    "Nissan",
  ];
  const modelOptions: string[] = [
    "Model S",
    "Mustang",
    "Civic",
    "Corolla",
    "Camry",
    "Accord",
    "X5",
    "A4",
    "Golf",
    "Altima",
  ];
  const colors: string[] = [
    "#FF0000",
    "#0000FF",
    "#00FF00",
    "#FFFF00",
    "#000000",
    "#FFFFFF",
    "#C0C0C0",
    "#FFA500",
    "#800080",
    "#FFC0CB",
  ];

  const generateCarName = (): string => {
    const randomBrand: string = brandOptions[Math.floor(Math.random() * brandOptions.length)];
    const randomModel: string = modelOptions[Math.floor(Math.random() * modelOptions.length)];
    return `${randomBrand} ${randomModel}`;
  };

  const generateColor = (): string => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  async function generateCars() {
    const newCars: Car[] = [];
    let method = "POST";
    for (let i = 0; i < 100; i++) {
      const carName: string = generateCarName();
      const color: string = generateColor();
      newCars.push({ name: carName, color: color });
    }
    try {
      newCars.forEach(async (car) => {
        let body = {
          name: car.name,
          color: car.color,
        };

        await fetch(`http://localhost:3000/garage`, {
          method: method,
          body: JSON.stringify(body),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
      });
      setUpdateFlag(true);
    } catch(e) {
        console.log(e)
    }
  }

  return (
    <div className="flex items-center justify-end w-full mr-[15%]">
      <button onClick={() => generateCars()} className="bg-blue-700 text-white p-2 text-semibold text-xl rounded-md">
        Generate
      </button>
    </div>
  );
}
