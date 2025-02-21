"use client";

import { useContext, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context";

interface IsProps {
  children: React.ReactNode;
}

function FrozenRouter({ children }: IsProps) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;
  console.log(frozen);

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

export function Animate({ children }: IsProps) {
  const pathname = usePathname();

  const onTheRight = { x: "100%" };
  const inTheCenter = { x: 0 };
  const onTheLeft = { x: "-100%" };

  const transition = { duration: 0.6, ease: "easeInOut" };

  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.div
        key={pathname}
        initial={onTheRight}
        animate={inTheCenter}
        exit={onTheLeft}
        transition={transition}
        style={{
          // background: "#98FC99",
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
