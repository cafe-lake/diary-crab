"use client";
import { Image } from "react-konva";
import useImage from "use-image";

const ItemImage = (props: any) => {
  const [img] = useImage(props.image, "anonymous");

  return (
    <Image
      alt="draw a picture!"
      image={img}
      draggable
      width={100}
      height={100}
    />
  );
};

export default ItemImage;
