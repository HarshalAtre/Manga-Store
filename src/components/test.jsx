import {useMemo, useRef} from "react"
import {pageAtom, pages} from "./UI"
import { BoxGeometry, Color, Float32BufferAttribute, MeshStandardMaterial, Skeleton, SkeletonHelper, SRGBColorSpace, Uint16BufferAttribute, Vector3 } from "three";
import { Bone, SkinnedMesh } from "three";
import { useHelper, useTexture } from "@react-three/drei";
import { useAtom } from "jotai";

const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = 1.71; // 4:3 aspect ratio
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

const pageGeometry = new BoxGeometry(
    PAGE_WIDTH,
    PAGE_HEIGHT,
    PAGE_DEPTH,
    PAGE_SEGMENTS,
    2
);

pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);

const position =  pageGeometry.attributes.position;
const vertex = new Vector3();
const  skinIndexes = []
const skinWeights = []

for(let i = 0; i < position.count; i++){

    vertex.fromBufferAttribute(position, i); // get the vertex position
    const x = vertex.x;

    const skinIndex = Math.floor(x / SEGMENT_WIDTH);
    const skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;

    skinIndexes.push(skinIndex, skinIndex + 1,0,0);
    skinWeights.push(1-skinWeight, skinWeight, 0, 0);
    
}
pageGeometry.setAttribute("skinIndex", new Uint16BufferAttribute(skinIndexes, 4));
pageGeometry.setAttribute("skinWeight", new Float32BufferAttribute(skinWeights, 4));

const color = new Color("white");

const whiteColor = new Color("white");
const emissiveColor = new Color("orange");

const pageMaterials = [
  new MeshStandardMaterial({
    color: whiteColor,
  }),
  new MeshStandardMaterial({
    color: "#111",
  }),
  new MeshStandardMaterial({
    color: whiteColor,
  }),
  new MeshStandardMaterial({
    color: whiteColor,
  }),
 
];

pages.forEach((page) => {
    useTexture.preload(`/textures/${page.front}.jpg`);
    useTexture.preload(`/textures/${page.back}.jpg`);
    useTexture.preload(`/textures/book-cover-roughness.jpg`);
});


//---------------------------------------------------------------------
const Page =  ({number , front , back ,page, ...props}) => {
    const [picture , picture2 , pictureRoughness]=useTexture([
        `/textures/${front}.jpg`,
        `/textures/${back}.jpg`,
        `/textures/book-cover-roughness.jpg`,
       
    ]);
    picture.colorSpace = SRGBColorSpace;
    picture2.colorSpace = SRGBColorSpace;
    pictureRoughness.colorSpace = SRGBColorSpace;
    const pageRef = useRef();
    const skinnedMeshRef = useRef();
    const manualSkinnedMesh = useMemo(() => {
        const bones = [];
        for(let i = 0; i < PAGE_SEGMENTS; i++){
            let bone = new Bone();
            bones.push(bone);
            if(i==0){
                bone.position.x = 0;
            }else{
                bone.position.x = SEGMENT_WIDTH;
            }
            if(i>0){
                bones[i-1].add(bone);
            }
        }
        const skeleton = new Skeleton(bones);
        const material = [...pageMaterials,
            new MeshStandardMaterial({
                color:"white",
                map : picture,
                ...(number === 0 ? {
                    roughnessMap : pictureRoughness,

                }:
                {
                    roughness : 0.1,
                }
            )
            }),
            new MeshStandardMaterial({
                color : "white",
                map:picture2,
                ...(number === pages.length - 1 ? {
                    roughnessMap : pictureRoughness,
                }:
                {
                    roughness : 0.1,
                }
            )
            })
        ];
    
        const mesh = new SkinnedMesh(pageGeometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = false;
        mesh.add(skeleton.bones[0]);
        mesh.bind(skeleton);
        return mesh;
    },[])
    
    // useHelper(skinnedMeshRef, SkeletonHelper, "orange", "red");
  return (
    <group {...props}>
        <mesh ref={pageRef}>
           <primitive object={manualSkinnedMesh} ref={skinnedMeshRef}
           position-z={-number * PAGE_DEPTH +page * PAGE_DEPTH}
           />
        </mesh>
    </group>
  )
}



const Book = ({...props}) => {
    const [page] = useAtom(pageAtom);
   return (

    <group {...props}>
      {
        [...pages].map((pageData, index) => (
         
            <Page
              position-x={index * 0.15}
              key={index}
              number={index}
              {...pageData} />
        
        ))
      }
    </group>
  );
};

export default Book;

