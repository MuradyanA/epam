import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ICar } from "../pages/ICar";
import { Winner } from "../pages/Garage";

type PageNum = {
  _page:string
}

interface PaginationProps {
  pageNumber: URLSearchParams;
  setPageNumber: (page: PageNum) => void;
}

export default function Pagination({ pageNumber, setPageNumber }: PaginationProps) {


  function switchPage(direction: string) {
    let pageNum: number = Number(pageNumber.get("_page"));
    if(pageNum === 0){
      pageNum = 1;
    }
    if (direction === "back" && pageNum !== null) {
      pageNum--;
      if (pageNum > 0) setPageNumber({ _page: pageNum.toString()});
    } else {
      pageNum++;
      setPageNumber({ _page: pageNum.toString() });
    }
  }


  return (
    <div className="flex justify-around w-[50%]">
      <button onClick={() => switchPage("back")} className="bg-gray-500 text-sm p-1 px-3 rounded-md">
        Prev
      </button>
      <button onClick={() => switchPage("forward")} className="bg-green-500 text-sm p-1 px-3 rounded-md">
        Next
      </button>
    </div>
  );
}
