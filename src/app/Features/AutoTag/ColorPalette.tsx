import * as React from 'react';

import { PRESET_COLORS } from '@features/EditBlocks/Colors';
import { TwitterPicker } from 'react-color';

export type ColorPaletteProps = {
  id: string;
  onColorChange: (color: string, index: string) => void;
  defaultColor: string;
};

export const ColorPalette = ({
  id,
  onColorChange,
  defaultColor,
}: ColorPaletteProps): JSX.Element => {
  const [color, setColor] = React.useState({ hex: defaultColor });

  const handleChange = (color): void => {
    setColor(color);
    onColorChange(color, id);
  };

  return (
    <div>
      <TwitterPicker
        width="450px"
        color={color}
        colors={PRESET_COLORS}
        onChange={handleChange}
      />
    </div>
  );
};