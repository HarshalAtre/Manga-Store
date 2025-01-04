import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import { currentBookAtom, books } from "./components/UI";
import { useAtom } from "jotai";
// import coverImage from '../public/textures/book-back.jpg';

function App() {
  const [currentBook] = useAtom(currentBookAtom);

  return (
    <>
      <UI />
      <Loader />
      {/* <img src={coverImage} alt="cover" style={{zIndex: -1, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 1, mixBlendMode: 'multiply'}}/> */}
      <video 
        className="videoContainer" 
        muted 
        loop 
        autoPlay 
        style={{position:"absolute", opacity: 1, zIndex: -1}}
        key={books[currentBook].video}
      >
        <source src={books[currentBook].video} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <Canvas shadows camera={{
          position: [-0.5, 1, window.innerWidth > 800 ? 4 : 9],
          fov: 45,
        }}>
         
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas>
    </>
  );
}

export default App;
