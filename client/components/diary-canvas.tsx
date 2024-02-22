"use client";

import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";

export default function Canvas(props: any) {
  const [crab] = useImage(
    "https://4.bp.blogspot.com/-sdhuHWjgfCo/UYOsrFBf5RI/AAAAAAAARKs/THaabR1hDq4/s600/umi_kani.png",
    "anonymous"
  );
  const [grocery] = useImage(
    "https://3.bp.blogspot.com/-6T6YOr6aUck/UdEenstrOOI/AAAAAAAAVzw/GCMNx0MKMGI/s718/yaoya.png",
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
        <Image
          alt="draw a picture!"
          image={crab}
          draggable
          width={100}
          height={100}
        ></Image>
        <Image
          alt="draw a picture!"
          image={grocery}
          draggable
          width={100}
          height={100}
        ></Image>
      </Layer>
    </Stage>
  );
}
