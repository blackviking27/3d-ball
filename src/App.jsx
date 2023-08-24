import React, { useEffect, useState } from "react";
import ShapeWrapper from "./components/ShapeWrapper";
import { SphereGeometry, BoxGeometry, MeshStandardMaterial, Mesh } from "three";

const App = () => {
  // Sphere - initial shape
  const sphereGeo = new SphereGeometry(2.5, 64, 64);
  const sphereMat = new MeshStandardMaterial({ color: "#00ff83" });
  const sphereMesh = new Mesh(sphereGeo, sphereMat);

  return (
    <div>
      <nav>
        <p className="navLogo">Sphere</p>
      </nav>
      <h1 id="title">Give it a spin!!</h1>
      <ShapeWrapper shape={sphereMesh} />
    </div>
  );
};

export default App;
