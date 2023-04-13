import { Canvas } from "@react-three/fiber";
import css from "../styles/home.module.css";
import LightBulb from "@/components/LightBulb";
import OrbitControls from "@/components/OrbitControls";
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
    color: "red",
  },
  {
    name: "Sphere",
    description:
      "A sphere is a perfectly round geometrical object in three-dimensional space that is the surface of a completely round ball.",
    component: Sphere,
    sound: SphereSound,
    color: "blue",
  },
  {
    name: "Cylinder",
    description:
      "A cylinder is a three-dimensional solid shape that has two parallel circular bases connected by a curved surface, which is also called a lateral surface.",
    component: Cylinder,
    sound: CylinderSound,
    color: "green",
  },
  {
    name: "Cone",
    description:
      "A cone is a three-dimensional geometric shape that tapers smoothly from a flat base to a point called the apex or vertex.",
    component: Cone,
    sound: ConeSound,
    color: "yellow",
  },
  {
    name: "Torus",
    description:
      "A torus is a surface of revolution generated by revolving a circle in three-dimensional space about an axis that passes through the center of the circle.",
    component: Torus,
    sound: TorusSound,
    color: "purple",
  },
];

export default function Home() {
  const [rotatingValue, setRotatingValue] = useState(0.01);
  const [indexFigures, setIndexFigures] = useState(0);
  const [zoomCameraX, setZoomCameraX] = useState(4);
  const [zoomCameraY, setZoomCameraY] = useState(2);

  useEffect(() => {
    const audio = new Audio(figuresData[indexFigures].sound);
    audio.play();
  }, [indexFigures]);

  useEffect(() => {
    const handleOrientation = (event) => {
      const { beta } = event;
      let aumentar = beta > 90 && beta < 270 ? false : true;
      if (zoomCameraX > 0 && zoomCameraY > 0) {
        if (aumentar) {
          setZoomCameraX((prev) => prev + 0.01);
          setZoomCameraY((prev) => prev + 0.005);
        } else {
          setZoomCameraX((prev) => prev - 0.01);
          setZoomCameraY((prev) => prev - 0.005);
        }
      }
    };

    const handleOrientationX = (event) => {
      const { gamma, alpha, beta } = event;
      let aumentar =
        alpha < 90 &&
        alpha > 0 &&
        gamma < 0 &&
        gamma > -90 &&
        beta > 0 &&
        beta < 90
          ? false
          : true;
      console.log(aumentar);
      if (aumentar) {
        setRotatingValue((prev) => prev + 0.001);
      } else {
        setRotatingValue((prev) => prev - 0.001);
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    window.addEventListener("deviceorientation", handleOrientationX);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("deviceorientation", handleOrientationX);
    };
  }, []);

  return (
    <div className="flex flex-col justify-between h-screen items-center bg-black">
      <div className="flex justify-between w-full mx-10 bg-slate-600 p-4 items-center">
        <div className="bg-slate-900 rounded-full p-1">
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
        </div>

        <div className="flex flex-col items-center">
          <h2
            className="text-2xl text-white font-bold"
            onClick={() => {
              setZoomCameraX(4), setZoomCameraY(2);
            }}
          >
            {figuresData[indexFigures].name}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-full p-1">
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
      </div>
      <div
        className={css.scene}
        onClick={() => {
          const audio = new Audio(figuresData[indexFigures].sound);
          audio.play();
        }}
      >
        <Canvas shadows className={css.canvas}>
          <Camera position={[0, zoomCameraY, zoomCameraX]} />
          <ambientLight color={"white"} intensity={0.2} />
          <LightBulb position={[-10, 10, -10]} />
          <OrbitControls />
          <Suspense fallback={null}>
            <RotatingFigures
              position={[0, 0, 0]}
              rotatingValue={rotatingValue}
              FigureData={figuresData[indexFigures].component}
              figureColor={figuresData[indexFigures].color}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
