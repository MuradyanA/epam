import { CarForm } from "./CarForm";
import { ICar } from "../pages/ICar";
import { useEffect, useState } from "react";

interface CarManagementProps {
  car: ICar;
  setCar: React.Dispatch<React.SetStateAction<ICar>>;
  setUpdateFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CarManagement({ car, setCar, setUpdateFlag }: CarManagementProps) {
  const [newCar, setNewCar] = useState<ICar>();
  useEffect(() => {}, []);

  return (
    <div className="text-white flex gap-3 w-[40%] mx-auto  mt-[10%] items-center py-2">
      <CarForm car={newCar} updateCar={setNewCar} setUpdateFlag={setUpdateFlag} />
      <CarForm car={car} updateCar={setCar} setUpdateFlag={setUpdateFlag} />
    </div>
  );
}
