"use client";

import { useState } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import ItemImage from "./item-image";
import { CanvasItemOption } from "@/app/_common/types/item";

const Canvas = (props: any) => {
  const [crab] = useImage(
    "https://4.bp.blogspot.com/-sdhuHWjgfCo/UYOsrFBf5RI/AAAAAAAARKs/THaabR1hDq4/s600/umi_kani.png",
    "anonymous"
  );

  return (
    <Stage
      width={props.dimensions.width}
      height={props.dimensions.height}
      className="bg-white"
      ref={props.stageRef}
    >
      <Layer>
        <ItemImage image={props.me.crab.image_url} />
        {props.selectedItems.map((item: CanvasItemOption, index: number) => (
          <ItemImage key={index} image={item.url} />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
