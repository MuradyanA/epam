import React, { useEffect, useState } from "react";
import { Nav } from "../components/Nav";
import { ICar } from "./ICar";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

export interface Winner {
  id: number;
  time: number;
  wins: number;
}

type WinnerDetails = { id: number; name: string; color: string; wins: number; time: number };

export function Winners() {
  const [winners, setWinners] = useState<WinnerDetails[]>([]);
  const [queryParams, setQueryParams] = useSearchParams();
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  const upChevron = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
    </svg>
  );

  const downChevron = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
    </svg>
  );

  let winnerDetails: WinnerDetails[] = [];

  async function getWinners(limit: number = 10) {
    const pageNum = queryParams.get("_page") ? queryParams.get("_page") : "1";
    const sort = queryParams.get("_sort") ? `&_sort=${queryParams.get("_sort")}` : ''
    const order = queryParams.get("_order") ? `&_order=${queryParams.get("_order")}` : ''
    const resp = await fetch(`http://localhost:3000/winners?_page=${pageNum}&_limit=${limit}${sort}${order}`);
    const winnersData = await resp.json();

    const winnerPromises = winnersData.map(async (elem: Winner) => {
      const carProps = await getCarNameAndColor(elem.id);
      return {
        id: elem.id,
        name: carProps[1],
        color: carProps[2],
        wins: elem.wins,
        time: elem.time,
      };
    });

    const winnerDetails = await Promise.all(winnerPromises);
    setWinners(winnerDetails);
  }

  async function getCarNameAndColor(id: number) {
    const cars = await fetch(`http://localhost:3000/garage/${id}`);
    const carsData = await cars.json();
    return [carsData.id, carsData.name, carsData.color];
  }

  function getColoredCar(color: string) {
    return (
      <svg
        xmlnsXlink="<http://www.w3.org/2000/svg>"
        width="90px"
        height="60px"
        viewBox="0 0 512 512"
        className={`stroke-[${color}] stroke-1`}
      >
        <g xmlns="http://www.w3.org/2000/svg" transform="matrix(0 1 -1 0 512 -0)">
          <path
            d="m 256.95703,47.001953 a 5.0005,5.0005 0 1 0 -0.20508,9.996094 c 25.14257,0.516551 44.45491,1.577388 57.75782,3.136719 6.65145,0.779665 11.81113,1.69501 15.29101,2.648437 3.47988,0.953427 5.11,2.434424 4.59961,1.740235 -0.6284,-0.854619 0.51134,1.328125 1.125,4.179687 0.61366,2.851562 1.25459,6.756066 1.87695,11.304687 1.24474,9.097244 2.42785,20.804438 3.42578,32.609378 0.99794,11.80494 1.81392,23.72273 2.3418,33.29883 0.52789,9.57609 0.72407,17.23808 0.625,18.9375 -0.2701,4.63366 -1.79638,17.76579 -3.18359,31.65234 -1.38721,13.88655 -2.66495,28.61228 -2.39844,38.09961 0.26067,9.28 2.36477,44.86506 2.76172,87.2793 0.38679,41.3288 -0.93962,88.83837 -7.00977,123.21093 -17.2392,6.38695 -43.00573,9.86133 -77.11132,9.86133 a 5.0005,5.0005 0 1 0 0,10 c 36.46446,0 64.13248,-3.65249 83.46093,-11.52344 a 5.0005,5.0005 0 0 0 3.0293,-3.70898 c 6.75641,-35.9682 8.02846,-85.24058 7.62891,-127.93359 -0.39956,-42.69302 -2.52635,-79.01781 -2.76368,-87.4668 -0.23149,-8.24067 0.97723,-23.04702 2.35352,-36.82422 1.37629,-13.7772 2.88889,-26.43912 3.2168,-32.06445 0.19993,-3.42959 -0.091,-10.38404 -0.625,-20.07032 -0.53396,-9.68627 -1.35439,-21.67828 -2.36133,-33.58984 -1.00695,-11.911557 -2.19707,-23.728915 -3.48242,-33.123046 -0.64268,-4.697066 -1.30542,-8.77975 -2.00977,-12.052735 -0.70435,-3.272984 -0.8966,-5.351881 -2.84375,-8 -2.47272,-3.363189 -5.71447,-4.283031 -10.01367,-5.460937 -4.2992,-1.177906 -9.82515,-2.123499 -16.76953,-2.9375 -13.88876,-1.628003 -33.40069,-2.679103 -58.7168,-3.199219 z"
            color="#000"
            fontFamily="sans-serif"
            fontWeight="400"
            overflow="visible"
            vectorEffect="non-scaling-stroke"
            fill="#34a853"
            className="color000000 svgShape"
          ></path>
          <path
            d="M256.85352 161.16211a5.0005 5.0005 0 1 0 0 10c5.32584 0 15.83828.85227 22.54882 1.86133 13.81488 2.07608 24.34022 5.11523 31.81641 8.72656-3.00327 15.97324-7.79191 30.39156-14.33398 43.31055-13.41744-2.94448-26.77089-4.5-40.03125-4.5a5.0005 5.0005 0 1 0 0 10c13.75151 0 27.6277 1.67931 41.65625 5.05664a5.0005 5.0005 0 0 0 5.57031-2.48438c8.51771-15.77543 14.42039-33.58455 17.74804-53.34765a5.0005 5.0005 0 0 0-2.43359-5.16211c-9.26133-5.33908-22.01934-9.01071-38.50586-11.48828-7.36146-1.10694-17.725-1.97266-24.03515-1.97266zM327.89062 207.39258a5.0005 5.0005 0 0 0-4.42578 2.78125c-5.21183 10.5402-9.3411 19.31753-12.40234 26.375a5.0005 5.0005 0 0 0-.40625 1.70703c-1.41927 25.19425-1.99105 40.59449-1.5918 47.51758.55338 9.61279 2.85402 30.36775 17.22461 50.19336a5.0005 5.0005 0 0 0 9.04492-3.09961l-2.95703-89.77539.56836-30.60742a5.0005 5.0005 0 0 0-5.05469-5.0918zm-5.3789 28.29687l-.13672 7.34375a5.0005 5.0005 0 0 0 .002.25782l2.25977 68.59375c-4.18645-11.0348-5.25822-20.92567-5.58984-26.6875-.30531-5.294.18462-21.00068 1.54882-45.43555.47518-1.08875 1.38611-2.8932 1.91602-4.07227zM305.05078 324.28516a5.0005 5.0005 0 0 0-.98437.0742c-13.79859 2.41052-29.51068 3.46217-47.11329 3.11328a5.0005 5.0005 0 1 0-.19726 9.99804c16.21601.32142 30.92357-.57313 44.30273-2.57617 3.85284 16.48093 6.38627 34.02318 7.57813 52.64063-11.60159 2.83824-28.79264 4.47656-51.7832 4.47656a5.0005 5.0005 0 1 0 0 10c25.94644 0 45.25856-1.79635 58.52734-5.79102a5.0005 5.0005 0 0 0 3.55273-5.05078c-1.18312-22.41929-4.22895-43.45615-9.15625-63.10156a5.0005 5.0005 0 0 0-4.72656-3.7832zM347.30859 104.36914a5.0005 5.0005 0 1 0 0 10h1.375v28.33789a5.0005 5.0005 0 0 0 1.01563 9.9082c5.09274 0 8.98437-4.37792 8.98437-9.25976v-29.72656c0-5.05765-4.20211-9.25977-9.25976-9.25977zM346.39648 351.37305a5.0005 5.0005 0 0 0-1.01562 9.90625v28.43164a5.0005 5.0005 0 0 0 1.01562 9.9082c5.09123 0 8.98438-4.37597 8.98438-9.25781v-29.72656c0-4.88184-3.89164-9.26172-8.98438-9.26172zM314.37109 50.353516a5.0005 5.0005 0 0 0-2.24804 9.568359c-.3953-.181709.48597.337668 1.44726 2.214844.50733.990695 1.08734 3.058956 1.64453 4.644531-.25862.03488-.56393.141443-.76953.150391.50771-.02209-.71161-.0487-2.21679-.257813-1.50519-.209107-3.61783-.546749-6.29102-1.005859-4.7462-.815144-11.93971-2.163442-20.21875-3.75v-3.939453a5.0005 5.0005 0 1 0-10 0v6.564453c0 3.498077 2.11081 6.055724 5.54687 6.71875 9.86178 1.90356 17.50856 3.322273 22.97852 4.261719 2.73498.469722 4.92203.820544 6.60742 1.054687 1.6854.234143 2.54859.408173 4.0293.34375 2.08739-.09085 4.05196-.514716 5.83594-1.109375.89199-.297329 1.71597-.618161 2.60937-1.140625.8934-.522464 2.63489-.799728 3.13867-4.322266a5.0005 5.0005 0 0 0-.12109-2.001953c-1.16832-4.356333-2.39967-7.892374-3.87305-10.769531-1.47337-2.877157-3.13124-5.344478-6.17187-6.742187a5.0005 5.0005 0 0 0-1.92774-.482422zM357.5293 196.86133c-.9705-.0507-1.99525.0169-3.21094.32617-3.37808.85908-6.9069 2.71442-11.45508 5.5293a5.0005 5.0005 0 1 0 5.26172 8.50195c4.14249-2.56379 7.31762-3.99892 8.6582-4.33984-.66237.16849.56559-.005 1.95703.23242 1.39145.23695 3.16593.68066 4.875 1.2207 1.70908.54005 3.37481 1.18398 4.55665 1.74805.57343.27369 1.03535.64789 1.27929.83594.1432.33648 1.17545 2.47246 1.74219 4.4746.10261.36249.11707.56101.19726.89844-1.40776.44111-3.20564.92071-5.36523 1.22852-4.71401.67189-10.52952.51699-15.43359-1.74219a5.0005 5.0005 0 1 0-4.1836 9.08203c7.36493 3.39283 15.04536 3.41316 21.02735 2.56055 2.99099-.42631 5.57234-1.08125 7.58398-1.74609 1.00582-.33243 1.86332-.66439 2.61914-1.01172.75582-.34734 1.13571-.18687 2.56836-1.71485 1.52155-1.62279 1.49987-2.86446 1.57422-3.73828.0743-.87382.0201-1.56722-.0625-2.27148-.16514-1.40854-.49182-2.81733-.90234-4.26758-.82088-2.89994-1.61187-5.51261-3.41993-8.01563-1.71186-2.37163-3.15144-2.75547-4.91601-3.59765-1.76457-.84219-3.77446-1.60086-5.85352-2.25781-2.07905-.65696-4.20477-1.20363-6.20898-1.54493-1.00211-.17065-1.91818-.33997-2.88867-.39062z"
            color="#000"
            fontFamily="sans-serif"
            fontWeight="400"
            overflow="visible"
            vectorEffect="non-scaling-stroke"
            fill="#34a853"
            className="color000000 svgShape"
          ></path>
          <path
            d="m 255.04297,47.001953 c -25.31611,0.520116 -44.82804,1.571216 -58.7168,3.199219 -6.94438,0.814001 -12.47033,1.759594 -16.76953,2.9375 -4.2992,1.177906 -7.54095,2.097748 -10.01367,5.460937 -1.94715,2.648119 -2.1394,4.727016 -2.84375,8 -0.70435,3.272985 -1.36709,7.355669 -2.00977,12.052735 -1.28535,9.394131 -2.47547,21.211489 -3.48242,33.123046 -1.00694,11.91156 -1.82737,23.90357 -2.36133,33.58984 -0.53396,9.68628 -0.82493,16.64073 -0.625,20.07032 0.32791,5.62533 1.84051,18.28725 3.2168,32.06445 1.37629,13.7772 2.58501,28.58355 2.35352,36.82422 -0.23733,8.44899 -2.36412,44.77378 -2.76368,87.4668 -0.39955,42.69301 0.8725,91.96539 7.62891,127.93359 a 5.0005,5.0005 0 0 0 3.0293,3.70898 c 19.32845,7.87095 46.99647,11.52344 83.46093,11.52344 a 5.0005,5.0005 0 1 0 0,-10 c -34.10559,0 -59.87212,-3.47438 -77.11132,-9.86133 -6.07015,-34.37256 -7.39656,-81.88213 -7.00977,-123.21093 0.39695,-42.41424 2.50105,-77.9993 2.76172,-87.2793 0.26651,-9.48733 -1.01123,-24.21306 -2.39844,-38.09961 -1.38721,-13.88655 -2.91349,-27.01868 -3.18359,-31.65234 -0.0991,-1.69942 0.0971,-9.36141 0.625,-18.9375 0.52788,-9.5761 1.34386,-21.49389 2.3418,-33.29883 0.99793,-11.80494 2.18104,-23.512134 3.42578,-32.609378 0.62236,-4.548621 1.26329,-8.453125 1.87695,-11.304687 0.61366,-2.851562 1.7534,-5.034306 1.125,-4.179687 -0.51039,0.694189 1.11973,-0.786808 4.59961,-1.740235 3.47988,-0.953427 8.63956,-1.868772 15.29101,-2.648437 13.30291,-1.559331 32.61525,-2.620168 57.75782,-3.136719 a 5.0005,5.0005 0 1 0 -0.20508,-9.996094 z"
            color="#000"
            fontFamily="sans-serif"
            fontWeight="400"
            overflow="visible"
            vectorEffect="non-scaling-stroke"
            fill="#34a853"
            className="color000000 svgShape"
          ></path>
          <path
            d="M255.14648 161.16211c-6.31015 0-16.67369.86572-24.03515 1.97266-16.48652 2.47757-29.24453 6.1492-38.50586 11.48828a5.0005 5.0005 0 0 0-2.43359 5.16211c3.32765 19.7631 9.23033 37.57222 17.74804 53.34765a5.0005 5.0005 0 0 0 5.57031 2.48438c14.02855-3.37733 27.90474-5.05664 41.65625-5.05664a5.0005 5.0005 0 1 0 0-10c-13.26036 0-26.61381 1.55552-40.03125 4.5-6.54207-12.91899-11.33071-27.33731-14.33398-43.31055 7.47619-3.61133 18.00153-6.65048 31.81641-8.72656 6.71054-1.00906 17.22298-1.86133 22.54882-1.86133a5.0005 5.0005 0 1 0 0-10zM184.10938 207.39258a5.0005 5.0005 0 0 0-5.05469 5.0918l.56836 30.60742-2.95703 89.77539a5.0005 5.0005 0 0 0 9.04492 3.09961c14.37059-19.82561 16.67123-40.58057 17.22461-50.19336v-.002c.39911-6.92366-.17261-22.32283-1.5918-47.51562a5.0005 5.0005 0 0 0-.40625-1.70703c-3.06124-7.05747-7.19051-15.8348-12.40234-26.375a5.0005 5.0005 0 0 0-4.42578-2.78125zm5.3789 28.29687c.52991 1.17907 1.44084 2.98352 1.91602 4.07227 1.3642 24.43487 1.85413 40.14155 1.54882 45.43555-.33162 5.76183-1.40339 15.6527-5.58984 26.6875l2.25977-68.59375a5.0005 5.0005 0 0 0 .002-.25782zM206.9375 324.28516a5.0005 5.0005 0 0 0-4.71484 3.7832c-4.9273 19.64541-7.97313 40.68227-9.15625 63.10156a5.0005 5.0005 0 0 0 3.55273 5.05078c13.26878 3.99467 32.5809 5.79102 58.52734 5.79102a5.0005 5.0005 0 1 0 0-10c-22.99056 0-40.18161-1.63832-51.7832-4.47656 1.19186-18.61745 3.72529-36.1597 7.57813-52.64063 13.37916 2.00304 28.08672 2.89759 44.30273 2.57617a5.0005 5.0005 0 1 0-.19726-9.99804c-17.60261.34889-33.3147-.70276-47.11329-3.11328a5.0005 5.0005 0 0 0-.99609-.0742zM162.57617 104.36914c-5.05765 0-9.25976 4.20212-9.25976 9.25977v29.72656c0 4.88184 3.89163 9.25976 8.98437 9.25976a5.0005 5.0005 0 0 0 1.01563-9.90429v-28.3418h1.375a5.0005 5.0005 0 1 0 0-10zM165.60352 351.37305c-5.09274 0-8.98438 4.37988-8.98438 9.26172v29.72656c0 4.88184 3.89315 9.25781 8.98438 9.25781a5.0005 5.0005 0 0 0 1.01562-9.9043V361.2832a5.0005 5.0005 0 0 0-1.01562-9.91015zM197.97852 50.349609a5.0005 5.0005 0 0 0-2.27735.486329c-3.04063 1.397709-4.6985 3.86503-6.17187 6.742187-1.47338 2.877157-2.70473 6.413198-3.87305 10.769531a5.0005 5.0005 0 0 0-.12109 2.001953c.50378 3.522538 2.24527 3.799802 3.13867 4.322266.8934.522464 1.71738.843296 2.60937 1.140625 1.78398.594659 3.74855 1.018526 5.83594 1.109375 1.48071.06442 2.3439-.109607 4.0293-.34375 1.68539-.234143 3.87244-.584965 6.60742-1.054687 5.46951-.939369 13.11596-2.358395 22.97656-4.261719 3.4372-.662442 5.54883-3.22002 5.54883-6.71875v-6.564453a5.0005 5.0005 0 1 0-10 0v3.939453c-8.27904 1.586558-15.47255 2.934856-20.21875 3.75-2.67319.45911-4.78583.796752-6.29102 1.005859-1.50518.209108-2.7245.235723-2.21679.257813-.2056-.0089-.51091-.115514-.76953-.150391.55719-1.585575 1.1372-3.653836 1.64453-4.644531.96129-1.877176 1.84256-2.396553 1.44726-2.214844a5.0005 5.0005 0 0 0-1.89843-9.572266zM154.4707 196.86133c-.97049.0506-1.88656.21997-2.88867.39062-2.00421.3413-4.12993.88797-6.20898 1.54493-2.07906.65695-4.08895 1.41562-5.85352 2.25781-1.76457.84218-3.20415 1.22602-4.91601 3.59765-1.80806 2.50302-2.59905 5.11569-3.41993 8.01563-.41052 1.45025-.7372 2.85904-.90234 4.26758-.0826.70426-.13685 1.39766-.0625 2.27148.0744.87382.0527 2.11549 1.57422 3.73828 1.43265 1.52798 1.81254 1.36751 2.56836 1.71485.75582.34733 1.61332.67929 2.61914 1.01172 2.01164.66484 4.59299 1.31978 7.58398 1.74609 5.98199.85261 13.66242.83228 21.02735-2.56055a5.0005 5.0005 0 1 0-4.1836-9.08203c-4.90407 2.25918-10.71958 2.41408-15.43359 1.74219-2.15959-.30781-3.95747-.78741-5.36523-1.22852.0802-.33743.0947-.53595.19726-.89844.56674-2.00214 1.59899-4.13812 1.74219-4.4746.24394-.18805.70586-.56225 1.27929-.83594 1.18184-.56407 2.84757-1.208 4.55665-1.74805 1.70907-.54004 3.48355-.98375 4.875-1.2207 1.39144-.23695 2.6194-.0639 1.95703-.23242 1.34058.34092 4.51571 1.77605 8.6582 4.33984a5.0005 5.0005 0 1 0 5.26172-8.50195c-4.54818-2.81488-8.077-4.67022-11.45508-5.5293-1.21569-.30925-2.24044-.37682-3.21094-.32617z"
            color="#000"
            fontFamily="sans-serif"
            fontWeight="400"
            overflow="visible"
            vectorEffect="non-scaling-stroke"
            fill="#34a853"
            className="color000000 svgShape"
          ></path>
        </g>
      </svg>
    );
  }

  function setOrdering(fieldName: string) {
    if (!queryParams.get("_sort") || fieldName !== queryParams.get("_sort")) {
      queryParams.set("_sort", fieldName);
      queryParams.set("_order", "ASC");
      setQueryParams(queryParams);
    } else if (queryParams.get("_sort") === fieldName && queryParams.get("_order") === "ASC") {
      queryParams.set("_sort", fieldName);
      queryParams.set("_order", "DESC");
      setQueryParams(queryParams);
    } else if (queryParams.get("_sort") === fieldName && queryParams.get("_order") === "DESC") {
      queryParams.set("_sort", "");
      queryParams.set("_order", "");
      setQueryParams(queryParams);
    }
  }

  useEffect(() => {
    if (!queryParams.get("_page")) {
      setQueryParams({ _page: "1" });
    }
    getWinners();
  }, []);

  useEffect(() => {
    getWinners();
  }, [queryParams]);

  return (
    <div className="">
      <Nav />
      {winners.length && (
        <div className="mt-[10%] mx-auto w-fit p-2 flex justify-center text-white bg-blue-900 border-2 border-gray-500">
          <table className="">
            <tr className="border-b-2">
              <th>Id</th>
              <th>Model</th>
              <th>Car</th>
              <th>
                <button className="flex" onClick={() => setOrdering("wins")}>
                  Wins
                  {queryParams.get("_sort") === "wins" && queryParams.get("_order") === "ASC" ? upChevron : ""}
                  {queryParams.get("_sort") === "wins" && queryParams.get("_order") === "DESC" ? downChevron : ""}
                </button>
              </th>
              <th>
                <button onClick={() => setOrdering("time")} className="flex">
                  Best Time
                  {queryParams.get("_sort") === "time" && queryParams.get("_order") === "ASC" ? upChevron : ""}
                  {queryParams.get("_sort") === "time" && queryParams.get("_order") === "DESC" ? downChevron : ""}
                </button>
              </th>
            </tr>
            {winners.map((trEl) => {
              return (
                <tr key={trEl.id}>
                  {Object.entries(trEl).map(([key, value]) => {
                    if (typeof value === "string" && value.startsWith("#")) {
                      return <td key={key + "-" + trEl.id}>{getColoredCar(value)}</td>;
                    }
                    return <td className="px-10" key={key}>{value}</td>;
                  })}
                </tr>
              );
            })}
          </table>
        </div>
      )}
      <div className="flex justify-around mt-[2%]">
        <Pagination pageNumber={queryParams} setPageNumber={setQueryParams} />
      </div>
    </div>
  );
}
