'use client'
import Image from "next/image";
import React, {useRef} from "react";
import {gsap} from "gsap";



export default function Home() {

  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  const speed = 0.1;
  const easing: number = 0.8;

  let xForce = 0;
  let yForce = 0;
  let requestAnimationFrameId: number | null = null;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, {x: `+=${xForce * 0.45}`, y:`+=${yForce * 0.45}`})
    gsap.set(plane2.current, {x: `+=${xForce* 0.95}`, y:`+=${yForce * 0.95}`})
    gsap.set(plane3.current, {x: `+=${xForce * 0.7}`, y:`+=${yForce * 0.7}`})
    requestAnimationFrame(animate)

    if(Math.abs(xForce) < 0.01)xForce = 0;
    if(Math.abs(yForce) < 0.01)yForce = 0;
  }

  const manageMouseMove = (e: any) => {
    const {movementX, movementY} = e;
    xForce += movementX * speed;
    yForce += movementY * speed;

    if(!requestAnimationFrameId){
      requestAnimationFrameId = requestAnimationFrame(animate)
     
    } else{
      cancelAnimationFrame(requestAnimationFrameId)
      requestAnimationFrameId = null
    }


  }

  const lerp = (start:any, end:any, amount:any) => start * (1 - amount) + end * amount;
  return (
    <main onMouseMove={(e) => manageMouseMove(e)} className="h-[100vh] bg-black w-[100vw] flex justify-center items-center overflow-hidden relative">
      <div className=" flex flex-col justify-center items-center text-white font-mainFont text-2xl">Floating Gallery
      <div className="text-slate-500 ">Made with Next.js and GSAP</div></div>
     <div ref={plane1} className="w-full h-full absolute">
        <Image className="absolute brightness-20 right-[5%] top-[65%]" src='/image1.jpg' alt="plane1" width={200} height={200}  />
        <Image  className="absolute brightness-75 left-[25%] top-[15%]"  src='/image2.jpg' alt="plane2" width={200} height={200}  />
        <Image  className="absolute  right-[5%] top-[05%]"  src='/image3.jpg' alt="plane3" width={200} height={200}  />

     </div>
     <div ref={plane2} className="w-full h-full absolute">
        <Image  className="absolute brightness-50 left-[25%] top-[65%]"  src='/image4.jpg' alt="plane4" width={200} height={200} />
        <Image  className="absolute brightness-50 left-[5%] top-[45%]"  src='/images5.jpg' alt="plane5" width={200} height={200} />
        <Image  className="absolute brightness-75 left-[65%] top-[55%]"  src='/images6.jpg' alt="plane6" width={200} height={200} />
     </div>
     <div ref={plane3} className="w-full h-full absolute">
        <Image  className="absolute brightness-75 left-[45%] top-[65%]"  src='/images7.jpg' alt="plane7" width={200} height={200} />
        <Image  className="absolute brightness-50 left-[55%] top-[5%]"  src='/images8.jpg' alt="plane8" width={200} height={200} />
        <Image  className="absolute  left-[5%] top-[5%]"  src='/images9.jpg' alt="plane9" width={200} height={200} />
     </div>
    </main>
  );
}
