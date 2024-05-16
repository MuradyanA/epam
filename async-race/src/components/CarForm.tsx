import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { ICar } from "../pages/ICar";

interface CarFormProps {
  car: ICar | undefined;
  updateCar: (newUCar: ICar) => void;
  setUpdateFlag: (updateFlag: boolean) => void;
}

export function CarForm({ car, updateCar, setUpdateFlag }: CarFormProps) {
  const [id, setId] = useState(car && car.id ? car.id : 0);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(car && car.name ? car.name : "");
  const [color, setColor] = useState(car && car.color ? car.color : "#FF0000");
  const [error, setError] = useState("");


  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let method = "";
    let url = "";
    let body = {};
    setError("");
    if (name.trim() === "") {
      setError("Name is required!");
      return;
    }
    if (id) {
      method = "PUT";
      url = `http://localhost:3000/garage/${id}`;
      body = {
        id,
        name,
        color,
      };
    } else {
      method = "POST";
      url = `http://localhost:3000/garage`;
      body = {
        name,
        color,
      };
    }
    try {
      let resp = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!resp.ok) throw resp.statusText;
      const data = await resp.json();
      setUpdateFlag(true);
    } catch (e) {
      console.error(e);
    }
  }

  function setProps(){
    setName(nameInputRef.current!.value);
    setColor(colorInputRef.current!.value);
  }

  useEffect(() => {
    setId(car && car.id ? car.id : 0);
  }, [car]);


  return (
    <form className="flex gap-3 w-[50%] justify-center" onSubmit={(e) => submitForm(e)}>
      {error && <p className="text-red-500">{error}</p>}
      <input
        ref={nameInputRef}
        className="w-[30%] rounded-sm text-gray-600 p-2 h-7 border-none outline-0"
        type="text"
      />
      <input
        ref={colorInputRef}
        className="w-[6%] text-gray-400 h-7 border-none outline-0"
        type="color"
      />
      <button
        type="submit"
        onClick={setProps}
        className={`${car === undefined ? "bg-green-600 " : "bg-blue-600 "} + "rounded-sm px-2 h-7"`}
      >
        {car === undefined ? "Create" : "Update"}
      </button>
    </form>
  );
}
