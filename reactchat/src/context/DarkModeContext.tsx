import React from "react";

interface ColorModeContextProps {
    toggleColor: () => void;

}

export const ColorModeContext = React.createContext<ColorModeContextProps>({
    toggleColor: () => { }
})