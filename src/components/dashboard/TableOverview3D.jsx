import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { tables3DData } from '../../data/mockData';
import { RotateCw, Info, Check, Eye } from 'lucide-react';

export default function TableOverview3D() {
  const mountRef = useRef(null);
  const [selectedTable, setSelectedTable] = useState(tables3DData[3]); // Default to Mesa 4
  const [hoveredTable, setHoveredTable] = useState(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 380;
    const height = 240;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc); // Matches erp.bg

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 7.5, 6.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 12, 6);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 25;
    scene.add(dirLight);

    // 3. Restaurant Floor Floor
    const floorGeo = new THREE.PlaneGeometry(8, 6.5);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.8,
      metalness: 0.1
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Floor Grid Helper for blueprint/ERP feel
    const grid = new THREE.GridHelper(8, 16, 0xe2e8f0, 0xe2e8f0);
    grid.position.y = 0.01;
    scene.add(grid);

    // 4. Create Tables and Chairs
    const tableMeshes = [];
    const interactiveObjects = [];

    const getTableColor = (status) => {
      switch (status) {
        case 'free': return 0x16a34a; // Green
        case 'reserved': return 0xd97706; // Amber
        case 'occupied': return 0x334155; // Dark slate
        default: return 0x94a3b8;
      }
    };

    tables3DData.forEach((table) => {
      const group = new THREE.Group();
      group.position.set(table.x, 0, table.z);
      group.userData = table;

      // Table Top (Cylinder for round tables, Box for rectangular)
      let topGeo;
      if (table.capacity >= 6) {
        topGeo = new THREE.BoxGeometry(1.2, 0.08, 0.7);
      } else {
        topGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.08, 24);
      }

      const topMat = new THREE.MeshStandardMaterial({
        color: getTableColor(table.status),
        roughness: 0.4,
        metalness: 0.1
      });

      const topMesh = new THREE.Mesh(topGeo, topMat);
      topMesh.position.y = 0.45;
      topMesh.castShadow = true;
      topMesh.receiveShadow = true;
      topMesh.userData = table;
      group.add(topMesh);
      interactiveObjects.push(topMesh);

      // Table Leg
      const legGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.45, 12);
      const legMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.4 });
      const legMesh = new THREE.Mesh(legGeo, legMat);
      legMesh.position.y = 0.225;
      legMesh.castShadow = true;
      group.add(legMesh);

      // Chairs around table
      const chairCount = Math.min(table.capacity, 4);
      for (let i = 0; i < chairCount; i++) {
        const angle = (i / chairCount) * Math.PI * 2;
        const dist = 0.55;
        const chairGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.28, 12);
        const chairMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.7 });
        const chair = new THREE.Mesh(chairGeo, chairMat);
        chair.position.set(Math.cos(angle) * dist, 0.14, Math.sin(angle) * dist);
        chair.castShadow = true;
        group.add(chair);
      }

      scene.add(group);
      tableMeshes.push(group);
    });

    // 5. Raycasting for Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveObjects);

      if (intersects.length > 0) {
        const hovered = intersects[0].object.userData;
        setHoveredTable(hovered);
        renderer.domElement.style.cursor = 'pointer';
      } else {
        setHoveredTable(null);
        renderer.domElement.style.cursor = 'default';
      }
    };

    const handleClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveObjects);

      if (intersects.length > 0) {
        setSelectedTable(intersects[0].object.userData);
      }
    };

    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('click', handleClick);

    // 6. Animation Loop (Procedural rotation with THREE.Clock)
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Subtle slow oscillating camera orbit
      camera.position.x = Math.sin(elapsed * 0.15) * 1.2;
      camera.lookAt(0, 0.2, 0);

      // Subtle pulse on occupied tables
      tableMeshes.forEach((tGroup, idx) => {
        if (tGroup.userData.status === 'occupied') {
          tGroup.children[0].position.y = 0.45 + Math.sin(elapsed * 2 + idx) * 0.015;
        }
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('click', handleClick);
      renderer.dispose();
      floorGeo.dispose();
      floorMat.dispose();
    };
  }, []);

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">
              Salão & Mesas (Vista 3D)
            </h2>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">
              Tempo Real
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Clique em uma mesa para consultar comandas e status
          </p>
        </div>

        {/* Legend */}
        <div className="hidden sm:flex items-center gap-3 text-[11px] font-medium text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            Livre
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Reservada
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-700" />
            Ocupada
          </span>
        </div>
      </div>

      {/* 3D Canvas Mount */}
      <div className="relative bg-slate-50/50">
        <div ref={mountRef} className="w-full h-[240px]" />

        {hoveredTable && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-slate-900/90 text-white rounded text-[11px] font-medium pointer-events-none shadow-sm backdrop-blur-xs">
            {hoveredTable.name} • {hoveredTable.status === 'free' ? 'Livre' : hoveredTable.status === 'reserved' ? 'Reservada' : 'Ocupada'}
          </div>
        )}
      </div>

      {/* Selected Table Detail Card */}
      <div className="p-3 bg-slate-50/80 border-t border-slate-100 text-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
            selectedTable.status === 'free'
              ? 'bg-emerald-100 text-emerald-800'
              : selectedTable.status === 'reserved'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-slate-800 text-white'
          }`}>
            {selectedTable.name}
          </div>
          <div>
            <div className="font-semibold text-slate-900">
              {selectedTable.status === 'free'
                ? 'Mesa Livre'
                : selectedTable.status === 'reserved'
                ? `Reserva: ${selectedTable.client} (${selectedTable.time})`
                : `Cliente: ${selectedTable.client}`}
            </div>
            <div className="text-[11px] text-slate-500">
              Capacidade: {selectedTable.capacity} lugares {selectedTable.bill && `• Conta atual: ${selectedTable.bill}`}
            </div>
          </div>
        </div>

        <button
          onClick={() => alert(`Ação rápida para ${selectedTable.name}: ${selectedTable.status === 'free' ? 'Abrir comanda' : 'Ver comanda aberta'}`)}
          className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-md transition-colors shadow-2xs shrink-0"
        >
          {selectedTable.status === 'free' ? 'Ocupar mesa' : 'Ver comanda'}
        </button>
      </div>
    </div>
  );
}
