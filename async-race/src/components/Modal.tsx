import { RaceResult, Winner } from "../pages/Garage";

interface RaceWinnerProps {
  raceWinner: Winner | undefined;
  setRaceWinner: (raceWinner: Winner) => void;
  setRaceResults: (raceResults: RaceResult[]) => void;
}

export default function Modal({ raceWinner, setRaceWinner, setRaceResults }: RaceWinnerProps) {
  function closeModal() {
    setRaceWinner(undefined);
    setRaceResults([]);
  }

  return (
    <>
      <div className="fixed bg-gray-900 opacity-50 top-0 right-0 left-0 bottom-0" />
      <div className="w-[500px] p-5 rounded-md bg-blue-900 absolute top-10 left-1/2 -translate-x-1/2">
        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-5">
            <img className="w-12 h-12" src="./flag.png" alt="" />
            <h1 className="text-xl text-gray-300">Race Results</h1>
          </div>
          <div className="flex">
            <button onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-8 h-8 text-gray-300"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <p className="text-white">Car: {raceWinner?.carName}</p>
          <p className="text-white">Time: {raceWinner?.time} ms</p>
        </div>
      </div>
    </>
  );
}
