import React, {useRef, useState, Suspense} from 'react';
import './App.scss';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { softShadows, OrbitControls, Float as FloatImpl } from '@react-three/drei';
import {useSpring, a} from '@react-spring/three';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';

softShadows();

const SpinningMesh = ({position, args, color, painting}) => {
    const [expand, setExpand] = useState(false);

    const mesh = useRef(null);
    // useFrame(() => (mesh.current.rotation.x = !expand ? (mesh.current.rotation.y += 0.01) : mesh.current.rotation.x));

    const props = useSpring({
        scale: expand ? [1.5, 1.5, 1.5] : [1, 1, 1],
    });

    const texture_1 = useLoader(TextureLoader, "artworks/" + painting);
    const blank = useLoader(TextureLoader, 'artworks/blank.png');

    return (
        <Suspense fallback={null}>
            <FloatImpl floatIntensity={expand ? 0 : 0.5} rotationIntensity={expand ? 0 : 1} speed={expand ? 0 : 1}>
                <a.mesh onClick={() => setExpand(!expand)} castShadow scale={props.scale} position={position} ref={mesh}>
                    <boxBufferGeometry attach='geometry' args={args} />
                    <meshStandardMaterial attachArray='material' map={texture_1} />
                    <meshStandardMaterial attachArray='material' color={color} map={blank} />
                    <meshStandardMaterial attachArray='material' color={color}map={blank}  />
                    <meshStandardMaterial attachArray='material' color={color} map={blank} />
                    <meshStandardMaterial attachArray='material' color={color} map={blank} />
                    <meshStandardMaterial attachArray='material' map={texture_1} />
                </a.mesh>
            </FloatImpl>
        </Suspense>
    ); 
}



function App() {
    return (
        <>
            <div style={{position: "absolute", zIndex: 1, backgroundColor: "rgba(241, 244, 248, 0.9)"}}>
                <h4>Rohan Agarwal - Art Gallery</h4>
                <h5>
                    An artist and computer scientist who trained under a scholarship <br/>
                    at 92NY and at the Parsons School of Design. Won several New York-<br/>
                    wide art and writing awards from Scholastic. Exhbited work in the <br/>
                    Metropolitan Museum of Art.
                    <br/><br/>
                    Has a passion for combining technology with art to create meaningful <br/>
                    and impactful experiences.
                </h5>
                <a href="https://roaga.github.io" target="_blank" rel="noreferrer">Visit Rohan's full page.</a>
                <h6>Built with &lt;3, React.js, and Three.js.</h6>
            </div>

            <Canvas shadows colorManagement camera={{position: [-5, 2, 10], fov: 60}}>
                <ambientLight intensity={0.5} color={"#fff"}/>
                <pointLight position={[-10, 5, -20]} intensity={0.1} color={"#fff"}/>
                <pointLight position={[5, -10, 20]} intensity={0.1} color={"#fff"}/>
                <directionalLight 
                    castShadow
                    position={[5, 20, 0]} 
                    intensity={1.5} 
                    color={"#fff"}
                    shadow-mapSize-width={1024} 
                    shadow-mapSize-height={1024}
                    shadow-camera-far={50}
                    shadow-camera-left={-50}
                    shadow-camera-right={50}
                    shadow-camera-top={50}
                    shadow-camera-bottom={-50}
                /> 

                <group>
                    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
                        <planeBufferGeometry attach='geometry' args={[100, 100]}/>
                        <shadowMaterial attach='material' opacity={0.3}/>
                    </mesh>

                    <SpinningMesh position={[0, 0, -8]} args={[3, 2, 0.15]} color='lightblue' painting={'abstract.jpg'}/>
                    <SpinningMesh position={[-6, 0, 2]} args={[3, 2, 0.1]} color='pink' painting={'balloonman.jpg'}/>
                    <SpinningMesh position={[0, 0, -10]} args={[3, 2, 0.05]} color='pink' painting={'blue.jpg'}/>
                    <SpinningMesh position={[-5, 0, 8]} args={[3, 2, 0.05]} color='pink' painting={'centralpark.jpg'}/>
                    <SpinningMesh position={[0, 0, -12]} args={[3, 2, 0.1]} color='pink' painting={'facebottle.jpg'}/>
                    <SpinningMesh position={[10, 0, -4]} args={[2, 3, 0.2]} color='pink' painting={'fezface.jpg'}/>
                    <SpinningMesh position={[0, 0, 5]} args={[1.8, 2, 0.05]} color='pink' painting={'gale.jpg'}/>
                    <SpinningMesh position={[10, 0, -2]} args={[3, 2, 0.02]} color='pink' painting={'greenbottles.jpg'}/>
                    <SpinningMesh position={[6, 0, 10]} args={[3, 2, 0.06]} color='pink' painting={'knifewoman.jpg'}/>
                    <SpinningMesh position={[0, 0, 10]} args={[3, 2, 0.15]} color='pink' painting={'livingroom.jpg'}/>
                    <SpinningMesh position={[10, 0, 4]} args={[3, 2, 0.1]} color='pink' painting={'moonlight.jpg'}/>
                    <SpinningMesh position={[0, 0, 0]} args={[3, 2, 0.05]} color='pink' painting={'plasticbag.jpg'}/>
                    <SpinningMesh position={[8, 0, 8]} args={[3, 2, 0.11]} color='pink' painting={'purpleguts.jpg'}/>
                    <SpinningMesh position={[6, 0, -8]} args={[2, 2, 0.05]} color='pink' painting={'refreshing.png'}/>
                    <SpinningMesh position={[-10, 0, -6]} args={[3, 2, 0.08]} color='pink' painting={'squash.jpg'}/>
                    <SpinningMesh position={[-2, 0, -2]} args={[3, 2, 0.09]} color='pink' painting={'textstilllife.png'}/>
                    <SpinningMesh position={[2, 0, -4]} args={[3, 2, 0.05]} color='pink' painting={'vangoghstilllife.jpg'}/>

                </group>

                <OrbitControls/>
            </Canvas>
        </>
    );
}

export default App;
