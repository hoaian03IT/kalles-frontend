import { useEffect, useState } from "react";
import { DeviceType } from "~/types";

export default function useMediaQueries(): DeviceType {
    const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
    const detectDeviceType = () => {
        if (window.matchMedia("(max-width: 767px)").matches) setDeviceType("mobile");
        else if (window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches) setDeviceType("tablet");
        else setDeviceType("desktop");
    };

    useEffect(() => {
        const handler = () => {
            window.addEventListener("resize", detectDeviceType);
        };
        handler();
        return () => window.removeEventListener("resize", detectDeviceType);
    }, []);
    return deviceType;
}
