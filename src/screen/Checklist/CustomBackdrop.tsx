import React, { useMemo } from "react";
import { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
    // animated variables
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animatedIndex.value,
            [0, 1],
            [0, 1],
            Extrapolate.CLAMP
        ),
    }));

    // styles
    const containerStyle = useMemo(
        () => [
            style,
            {
                backgroundColor: "#5050506d"
            },
            containerAnimatedStyle,
        ],
        [style, containerAnimatedStyle]
    );
    
    return <BottomSheetBackdrop animatedIndex={animatedIndex} animatedPosition={animatedIndex} style={style}>
        <Animated.View style={containerStyle} />
    </BottomSheetBackdrop>;
};

export { CustomBackdrop };