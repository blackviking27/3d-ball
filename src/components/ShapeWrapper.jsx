import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";

const ShapeWrapper = ({ shape }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // window sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Scene
    const scene = new THREE.Scene();

    // Sphere
    // const geometry = new THREE.SphereGeometry(2.5, 64, 64);
    // const material = new THREE.MeshStandardMaterial({ color: "#00ff83" });
    // const mesh = new THREE.Mesh(geometry, material);
    scene.add(shape);

    //Light
    const light = new THREE.PointLight(0xffffff, 180);
    light.position.set(0, 10, 10);
    scene.add(light);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.z = 20;
    scene.add(camera);

    // Renderer
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio = 2; // increase the edge smoothness

    // continous rendering
    const animate = function () {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    // window resizing
    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.updateProjectionMatrix();
      camera.aspect = sizes.width / sizes.height;
      renderer.setSize(sizes.width, sizes.height);
    });

    // adding controls to the canvas
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 3;

    // renderer.render(scene, camera);
    animate();

    // animating the objects
    const tl = gsap.timeline({ defaults: { duration: 1 } });
    tl.fromTo(shape.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
    tl.fromTo("nav", { y: "-65%" }, { y: "0%" });
    tl.fromTo("#title", { opacity: 0 }, { opacity: 1 });

    // change color with mouse position
    let mouseDown = false;
    let rgb = [];
    window.addEventListener("mousedown", () => (mouseDown = true));
    window.addEventListener("mouseup", () => (mouseDown = false));

    window.addEventListener("mousemove", (e) => {
      if (mouseDown) {
        rgb = [
          Math.round((e.pageX / sizes.width) * 255),
          Math.round((e.pageY / sizes.width) * 255),
          150,
        ];

        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
        gsap.to(shape?.material.color, {
          r: newColor.r,
          g: newColor.g,
          b: newColor.b,
        });
      }
    });
  }, [shape]);

  return (
    <>
      <canvas ref={canvasRef} className="webgl" />
    </>
  );
};

export default ShapeWrapper;
