import React, { useState } from "react";
import SideNav from "./sideNav";
import { Outlet } from "react-router-dom";
import { MenuIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative flex flex-col lg:flex-row w-full max-h-screen">
      <div className="flex lg:hidden bg-foreground w-full py-2 px-5">
        <MenuIcon
          size={35}
          color="white"
          className="cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>
      <div className="hidden lg:block">
        <SideNav />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className=" absolute inset-0 h-screen w-screen bg-foreground/80"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0, transition: { duration: 0.3, type: "tween" } }}
              exit={{
                x: "-100%",
                transition: { duration: 0.3, ease: "easeIn" },
              }}
            >
              <SideNav setIsOpen={setIsOpen} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Outlet />
    </div>
  );
}

export default NavBar;
