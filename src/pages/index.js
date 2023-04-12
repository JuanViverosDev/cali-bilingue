import Image from "next/image";
import { Inter } from "next/font/google";
import { Canvas } from "@react-three/fiber";
import css from "../styles/home.module.css";
import Floor from "@/components/Floor";
import LightBulb from "@/components/LightBulb";
import OrbitControls from "@/components/OrbitControls";
import Draggable from "@/components/Draggable";
import { Light } from "three";
import { Suspense, useEffect, useState } from "react";
import RotatingFigures from "@/components/RotatingFigures";
import { Box, Cone, Cylinder, Sphere, Torus } from "@react-three/drei";
import Camera from "@/components/Camera";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import CubeSound from "../sounds/CubeSound.mp3";
import SphereSound from "../sounds/SphereSound.mp3";
import CylinderSound from "../sounds/CylinderSound.mp3";
import ConeSound from "../sounds/ConeSound.mp3";
import TorusSound from "../sounds/TorusSound.mp3";

const figuresData = [
  {
    name: "Cube",
    description:
      "A cube is a three-dimensional object with six flat sides and straight edges.",
    component: Box,
    sound: CubeSound,
  },
  {
    name: "Sphere",
    description:
      "A sphere is a perfectly round geometrical object in three-dimensional space that is the surface of a completely round ball.",
    component: Sphere,
    sound: SphereSound,
  },
  {
    name: "Cylinder",
    description:
      "A cylinder is a three-dimensional solid shape that has two parallel circular bases connected by a curved surface, which is also called a lateral surface.",
    component: Cylinder,
    sound: CylinderSound,
  },
  {
    name: "Cone",
    description:
      "A cone is a three-dimensional geometric shape that tapers smoothly from a flat base to a point called the apex or vertex.",
    component: Cone,
    sound: ConeSound,
  },
  {
    name: "Torus",
    description:
      "A torus is a surface of revolution generated by revolving a circle in three-dimensional space about an axis that passes through the center of the circle.",
    component: Torus,
    sound: TorusSound,
  },
];

export default function Home() {
  const [rotatingValue, setRotatingValue] = useState(0.01);
  const [indexFigures, setIndexFigures] = useState(0);
  const [zoomCamera, setZoomCamera] = useState(4);

  useEffect(() => {
    const handleOrientationY = (event) => {
      if (event.gamma > 0) {
        setZoomCamera(zoomCamera + 0.001);
      } else if (event.gamma < 0) {
        setZoomCamera(zoomCamera - 0.001);
      }
    };

    window.addEventListener("deviceorientation", handleOrientationY);
  }, [zoomCamera]);

  useEffect(() => {
    const handleOrientationX = (event) => {
      if (event.alpha > 0) {
        setRotatingValue(rotatingValue + 0.0001);
      } else if (event.alpha < 0) {
        setRotatingValue(rotatingValue - 0.0001);
      }
    };

    window.addEventListener("deviceorientation", handleOrientationX);
  }, [rotatingValue]);

  useEffect(() => {
    const audio = new Audio(figuresData[indexFigures].sound);
    audio.play();
  }, [indexFigures]);

  return (
    <div className="flex flex-col justify-between h-screen items-center bg-black p-10">
      <div className="flex justify-between w-full mx-10">
        <ChevronLeftIcon
          className="h-10 w-10 text-white"
          onClick={() => {
            if (indexFigures > 0) {
              setIndexFigures(indexFigures - 1);
            } else {
              setIndexFigures(figures.length - 1);
            }
          }}
        />

        <div className="flex flex-col items-center">
          <h2
            className="text-2xl text-white font-bold"
            onClick={() => setZoomCamera(4)}
          >
            {figuresData[indexFigures].name}
          </h2>
        </div>

        <ChevronRightIcon
          className="h-10 w-10 text-white"
          onClick={() => {
            if (indexFigures < figuresData.length - 1) {
              setIndexFigures(indexFigures + 1);
            } else {
              setIndexFigures(0);
            }
          }}
        />
      </div>
      <div
        className={css.scene}
        onClick={() => {
          const audio = new Audio(figuresData[indexFigures].sound);
          audio.play();
        }}
      >
        <Canvas shadows className={css.canvas}>
          <Camera position={[0, 2, zoomCamera]} />
          <ambientLight color={"white"} intensity={0.2} />
          <LightBulb position={[-10, 10, -10]} />
          <OrbitControls />
          <Suspense fallback={null}>
            <RotatingFigures
              position={[0, 0, 0]}
              rotatingValue={rotatingValue}
              FigureData={figuresData[indexFigures].component}
            />
          </Suspense>
        </Canvas>
      </div>
      <p className="text-white text-center">
        {figuresData[indexFigures].description}
      </p>
    </div>
  );
}
