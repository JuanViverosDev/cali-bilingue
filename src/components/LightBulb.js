import React from "react";

function LightBulb(props) {
  return (
    <mesh {...props} >
      <pointLight castShadow />
      <sphereBufferGeometry args={[0.2, 0, 10]} />
      <meshPhongMaterial emissive={"white"}  />
    </mesh>
  );
}

export default LightBulb;