"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../../ui/infinite-moving-cards";

export function OurBrand({data}) {
  return (
    <div className=" rounded-md flex flex-col antialiased   items-center justify-center relative overflow-hidden ">
      <InfiniteMovingCards
        items={data}
        direction="right"
        speed="fast"
      />
    </div>
  );
}



