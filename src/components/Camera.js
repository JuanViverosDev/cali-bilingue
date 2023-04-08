const { useThree, useFrame } = require("@react-three/fiber");
const { useRef, useEffect } = require("react");

const Camera = (props) => {
    const ref = useRef();
    const set = useThree((state) => state.set);
    useEffect(() => void set({ camera: ref.current }), []);
    useFrame(() => ref.current.updateMatrixWorld());
    return <perspectiveCamera ref={ref} {...props} />;
  };

export default Camera;