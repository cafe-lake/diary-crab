"use client";
import { useState } from "react";
import { Image } from "react-konva";
import useImage from "use-image";

const ItemImage = (props: any) => {
  const [img] = useImage(props.image, "anonymous");
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [sizeIndex, setSizeIndex] = useState(1);

  const sizes = [50, 100, 200];

  const onClickImage = () => {
    let index = sizeIndex;
    if (sizeIndex + 1 == sizes.length) {
      index = 0;
      setSizeIndex(index);
    } else {
      index = sizeIndex + 1;
      setSizeIndex(index);
    }
    const size = sizes[index];
    setHeight(size);
    setWidth(size);
  };

  return (
    <Image
      alt="draw a picture!"
      image={img}
      draggable
      width={width}
      height={height}
      onClick={onClickImage}
      onTap={onClickImage}
    />
  );
};

export default ItemImage;
