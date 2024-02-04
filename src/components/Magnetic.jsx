import React, { useEffect } from "react";
import { useRef } from "react";
import gsap from "gsap";

const Magnetic = ({ children }) => {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const xTo = gsap.quickTo(ref.current, "x", {
      duration: 1,
      ease: "elastic.out(2, 0.4)",
    });
    const yTo = gsap.quickTo(ref.current, "y", {
      duration: 1,
      ease: "elastic.out(2, 0.4)",
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();

      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      xTo(x * 0.1);
      yTo(y * 0.1);
    };

    const handleMouseLeave = (e) => {
      xTo(0);
      yTo(0);
    };

    ref.current.addEventListener("mousemove", handleMouseMove);
    ref.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      ref.current.removeEventListener("mousemove", handleMouseMove);
      ref.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
};
export default Magnetic;
