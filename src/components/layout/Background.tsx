import { motion, useScroll, useTransform } from "framer-motion";
import { useMotion } from "../../hooks/useMotion";

export default function Background() {
  const { reduced } = useMotion();
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 4000], reduced ? [0, 0] : [0, -240]);
  const y2 = useTransform(scrollY, [0, 4000], reduced ? [0, 0] : [0, -560]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-[20%] left-[15%] w-[700px] h-[700px] rounded-full bg-accent/[0.07] blur-[140px]"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[55%] right-[5%] w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[120px]"
      />
    </div>
  );
}
