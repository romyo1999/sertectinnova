"use client";
import React from "react";
import { StickyScroll } from "../../ui/sticky-scroll-reveal";


export function ScrollFixedImage({content}) {
  return (
    <div className="">
      <StickyScroll content={content} />
    </div>
  );
}
