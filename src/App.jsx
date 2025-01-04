import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import { currentBookAtom, books } from "./components/UI";
import { useAtom } from "jotai";
import { useProgress } from "@react-three/drei";
// import coverImage from '../public/textures/book-back.jpg';

function App() {
  const [currentBook] = useAtom(currentBookAtom);
  const { progress } = useProgress();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      // Add a small delay to ensure everything is ready
      const timeout = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Loading Assets</h2>
          <p>{Math.round(progress)}%</p>
        </div>
      </div>
    );
  }

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
