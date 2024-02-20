"use client"

import { Stage, Layer, Circle } from 'react-konva';

function Canvas(props: any) {
  return (
    <Stage width={300} height={300}>
      <Layer>
        <Circle x={200} y={100} radius={50} fill="green" />
      </Layer>
    </Stage>
  );
}

export default Canvas;