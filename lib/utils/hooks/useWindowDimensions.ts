import {ScaledSize} from "../../../types";
import Dimensions from "../dimensions";
import {useEffect, useState} from "react";


export default function useWindowDimensions(): ScaledSize {
    const [dimensions, setDimensions] = useState(() => Dimensions.get('window'));
    useEffect(() => {
        function handleChange({window}) {
            if (
                dimensions.width !== window.width ||
                dimensions.height !== window.height ||
                dimensions.scale !== window.scale ||
                dimensions.fontScale !== window.fontScale
            ) {
                setDimensions(window);
            }
        }
        Dimensions.addEventListener('change', handleChange);
        // We might have missed an update between calling `get` in render and
        // `addEventListener` in this handler, so we set it here. If there was
        // no change, React will filter out this update as a no-op.
        handleChange({window: Dimensions.get('window')});
        return () => {
            Dimensions.removeEventListener('change', handleChange);
        };
    }, [dimensions]);
    return dimensions;
}
