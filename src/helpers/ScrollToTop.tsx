import {useEffect, useRef} from "react";
import { useLocation } from "react-router-dom";

const usePrevious = <T extends unknown>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

export default function ScrollToTop() {
    const { pathname } = useLocation();
    const prevPath = usePrevious(pathname);

    useEffect(() => {
        if (prevPath && prevPath.includes("project") && pathname.includes("project")) {
            return;
        }
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
        });
    }, [pathname, prevPath]);

    return null;
}
