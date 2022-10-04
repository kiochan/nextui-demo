import { MouseEventHandler, useState } from "react";

type VoidFunction = () => void

export default function useAnchorOpenHandle<T extends HTMLElement>(): [T, MouseEventHandler<T>, VoidFunction] {
    const [element, setElement] = useState<null | T>(null);
    const handleOpen: MouseEventHandler<T> = (event) => {
        if (element === null) {
            setElement(event.currentTarget);
            return
        }
        setElement(null)
    };
    const handleClose: VoidFunction = () => {
        setElement(null);
    };
    return [element, handleOpen, handleClose]
}