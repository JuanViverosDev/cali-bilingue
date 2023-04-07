import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

function RotatingFigures(props) {
  const { rotatingValue, FigureData } = props;
  
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.y += rotatingValue;
  });

  return (
    <FigureData ref={meshRef}>
      <meshStandardMaterial color="hotpink" />
    </FigureData>
  );
}

export default RotatingFigures;
