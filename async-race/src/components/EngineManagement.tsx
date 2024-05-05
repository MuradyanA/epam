import { RaceResult } from "../pages/Garage";

type SetRaceFlag = {
  setRaceFlag: (raceFlag: number) => void;
}

export function EngineManagement({setRaceFlag} : SetRaceFlag) {
  return (
    <div className="flex min-w-min my-3 mx-3">
      <button onClick={() => setRaceFlag(-999)} className="inline-flex items-center hover:bg-green-600 duration-300 bg-green-400 p-2 border-2 border-green-600 rounded-md font-semibold text-xl">
        Race
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 ml-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          />
        </svg>
      </button>
      <button onClick={()=>{setRaceFlag(0)}} className="inline-flex hover:bg-red-500 duration-300 items-center ml-4 bg-red-400 p-2 border-2 border-red-600 rounded-md font-semibold text-xl">
        Reset
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 ml-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
          />
        </svg>
      </button>
    </div>
  );
}
