// useHelpSystem.js
import { useRef, useState, useEffect } from "react";

export default function useHelpSystem({ helpContent }) {
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  const [isAnimated, setIsAnimated] = useState(
    () => localStorage.getItem("isAnimated") !== "false" && true
  );
  const [isOpen, setIsOpen] = useState(false);
  const [iconHeight, setIconHeight] = useState(40);
  const [iconWidth, setIconWidth] = useState(40);

  // Helper für Symbol-Start unten
  const getBottomY = () => window.innerHeight - iconHeight - 8;

  const [targetY, setTargetY] = useState(getBottomY());
  const [currentY, setCurrentY] = useState(getBottomY());

  // Helper für Mausposition
  function getCurrentMouseTargetY() {
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const mouseX = window._lastMouseX ?? winW;
    const mouseY = window._lastMouseY ?? winH / 2;
    const iconH = toggleRef.current?.offsetHeight || 40;
    const iconW = toggleRef.current?.offsetWidth || 40;
    const endZone = winW - iconW / 2;
    const startZone = winW * 0.75;
    let progress = 0;
    if (mouseX > startZone) {
      progress = Math.min(1, (mouseX - startZone) / (endZone - startZone));
    }
    const minCenter = winH - iconH / 2 - 8;
    const maxCenter = iconH / 2 + 8;
    const mouseCenterY = Math.max(maxCenter, Math.min(minCenter, mouseY));
    const interpolatedCenterY =
      minCenter + (mouseCenterY - minCenter) * progress;
    return interpolatedCenterY - iconH / 2;
  }

  // Animation-Loop für das Icon
  useEffect(() => {
    let raf;
    function animate() {
      setCurrentY((cur) => {
        const next = cur + (targetY - cur) * 0.2;
        if (toggleRef.current) {
          toggleRef.current.style.top = `${next}px`;
        }
        return next;
      });
      raf = requestAnimationFrame(animate);
    }
    if (isAnimated) animate();
    return () => raf && cancelAnimationFrame(raf);
  }, [targetY, isAnimated]);

  // Maße des Icons nach Mount/Resize messen
  useEffect(() => {
    function updateIconSize() {
      if (toggleRef.current) {
        setIconHeight(toggleRef.current.offsetHeight || 40);
        setIconWidth(toggleRef.current.offsetWidth || 40);
      }
    }
    updateIconSize();
    window.addEventListener("resize", updateIconSize);
    return () => window.removeEventListener("resize", updateIconSize);
  }, []);

  // Mousemove Handler (setzt targetY basierend auf Maus)
  useEffect(() => {
    function handleMouse(e) {
      if (isOpen) return;
      window._lastMouseX = e.clientX;
      window._lastMouseY = e.clientY;
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const endZone = winW - iconWidth / 2;
      const startZone = winW * 0.75;
      let progress = 0;
      if (e.clientX > startZone) {
        progress = Math.min(1, (e.clientX - startZone) / (endZone - startZone));
      }
      const minCenter = winH - iconHeight / 2 - 8;
      const maxCenter = iconHeight / 2 + 8;
      const mouseCenterY = Math.max(maxCenter, Math.min(minCenter, e.clientY));
      const interpolatedCenterY =
        minCenter + (mouseCenterY - minCenter) * progress;
      setTargetY(interpolatedCenterY - iconHeight / 2);
    }
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [isOpen, iconHeight, iconWidth]);

  // Sofort richtig positionieren bei Panel-Open/Close oder Animation an/aus
  useEffect(() => {
    if (!isOpen) {
      if (isAnimated) {
        // Sofort auf Mouse-Position
        const mouseY = getCurrentMouseTargetY();
        setTargetY(mouseY);
        setCurrentY(mouseY);
        if (toggleRef.current) toggleRef.current.style.top = `${mouseY}px`;
      } else {
        // Sofort nach unten
        const winH = window.innerHeight;
        const bottomY = winH - iconHeight - 8;
        setTargetY(bottomY);
        setCurrentY(bottomY);
        if (toggleRef.current) toggleRef.current.style.top = `${bottomY}px`;
      }
    } else {
      // Panel offen → Symbol bleibt oben!
      setTargetY(8);
      setCurrentY(8);
      if (toggleRef.current) toggleRef.current.style.top = `8px`;
    }
  }, [isOpen, isAnimated, iconHeight]);

  // Maus verlässt das Fenster → springt nach unten
  useEffect(() => {
    function handleMouseLeave(e) {
      if (!e.relatedTarget && !isOpen && isAnimated) {
        const winH = window.innerHeight;
        const bottomY = winH - iconHeight - 8;
        setTargetY(bottomY);
        setCurrentY(bottomY);
        if (toggleRef.current) toggleRef.current.style.top = `${bottomY}px`;
      }
    }
    window.addEventListener("mouseout", handleMouseLeave);
    return () => window.removeEventListener("mouseout", handleMouseLeave);
  }, [isOpen, isAnimated, iconHeight]);

  // Panel open/close handler
  const handleToggle = () => {
    setIsOpen((open) => {
      if (!open) {
        setTargetY(8);
        setCurrentY(8);
        if (toggleRef.current) toggleRef.current.style.top = `8px`;
      } else {
        setTargetY(getBottomY());
      }
      return !open;
    });
  };

  // Animation umschalten
  const handleToggleOption = () => {
    setIsAnimated((animated) => {
      localStorage.setItem("isAnimated", !animated);
      return !animated;
    });
  };

  // Rückgabe:
  return {
    isOpen,
    isAnimated,
    helpContent,
    panelRef,
    toggleRef,
    handleToggleOption,
    onToggle: handleToggle,
    getBottomY,
    iconHeight,
    iconWidth,
  };
}
