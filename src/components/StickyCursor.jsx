import React, { useEffect, useRef, useState } from "react";
import styles from "./StickyCursor.module.css";
import gsap from "gsap";
import { animate } from "framer-motion";

const StickyCursor = ({ stickyElement }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cursorSize = isHovered ? 60 : 20;

  const cursor = useRef(null);

  const rotate = (distance) => {
    const angle = Math.atan2(distance.y, distance.x);
    gsap.to(cursor.current, { rotation: `${angle}rad`, duration: 0 });
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      stickyElement.current.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };

    const distance = { x: clientX - center.x, y: clientY - center.y };

    const scale = {
      x: 1,
      y: 1,
    };

    if (isHovered) {
      rotate(distance);

      const absoluteDistance = Math.max(
        Math.abs(distance.x),
        Math.abs(distance.y)
      );

      const newScaleX = gsap.utils.mapRange(
        0,
        width / 2,
        1,
        1.3,
        absoluteDistance
      );

      const newScaleY = gsap.utils.mapRange(
        0,
        height / 2,
        1,
        0.8,
        absoluteDistance
      );

      scale.x = newScaleX;
      scale.y = newScaleY;

      gsap.to(cursor.current, {
        x: center.x - cursorSize / 2 + distance.x * 0.1,
        y: center.y - cursorSize / 2 + distance.y * 0.1,
        duration: 0.4,
        scaleY: scale.y,
        scaleX: scale.x,
        width: cursorSize,
        height: cursorSize,
      });
    } else {
      gsap.to(cursor.current, {
        x: clientX - cursorSize / 2,
        y: clientY - cursorSize / 2,
        width: cursorSize,
        scaleX: scale.x,
        scaleY: scale.y,
        height: cursorSize,
      });
    }
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    stickyElement.current.addEventListener("mouseover", handleMouseOver);
    stickyElement.current.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      stickyElement.current.removeEventListener("mouseover", handleMouseOver);
      stickyElement.current.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return (
    <>
      <div ref={cursor} className={styles.cursor}></div>
    </>
  );
};

export default StickyCursor;
