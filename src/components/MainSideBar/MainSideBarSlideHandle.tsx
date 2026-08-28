import { Grip } from "@gravity-ui/icons";
import { Button } from "@heroui/react/button";
import { motion, PanInfo } from "framer-motion";

type panEvent = ((event: PointerEvent, info: PanInfo) => void) | undefined;

export default function MainSideBarSlideHandle({ onPanStart, onPan, onPanEnd }:
    { onPanStart?: panEvent, onPan: panEvent, onPanEnd: panEvent }) {

    return (
        <motion.div
            className={dragAreaClassName}
            onPanStart={onPanStart}
            onPan={onPan}
            onPanEnd={onPanEnd}
        >
            <div className={dragLineClassName} />
            <Button variant="secondary" isIconOnly className={dragChipClassName}>
                <Grip />
            </Button>
        </motion.div>
    )
}

const dragAreaClassName = `
    group
    absolute -right-4 top-0 z-20
    h-full w-8
    cursor-ew-resize touch-none select-none
`;

const dragLineClassName = `
    pointer-events-none
    absolute left-1/2 top-0
    h-full w-0.5
    -translate-x-1/2 
    bg-(--inverse-accent)/80
    transition-all duration-400
    group-hover:h-full
    group-hover:w-1
    group-hover:bg-(--inverse-accent)
`;

const dragChipClassName = `
    absolute left-1/2 top-3/4
    flex h-14 w-8
    -translate-x-1/2 -translate-y-1/2
    items-center justify-center
    scale-90
    rounded-full border-3
    transition-all duration-200
    group-hover:scale-100
    active:border-(--inverse-accent)
`;