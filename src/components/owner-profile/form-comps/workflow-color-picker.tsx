import React, { useEffect, useMemo, useState } from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";

const WorkFlowColorPicker = ({
  defaultColor,
  isDisabled = true,
  onSelectColor,
}: {
  defaultColor: string;
  isDisabled: boolean;
  // eslint-disable-next-line no-unused-vars
  onSelectColor: (color: string) => void;
}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState({ r: "", g: "", b: "", a: "" });

  //   const [color, setColor] = useState(defaultColor);

  const handleClick = () => {
    if (!isDisabled) {
      setDisplayColorPicker(!displayColorPicker);
    }
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (newColor: any) => {
    setColor(newColor.rgb);
  };

  let displayColor = useMemo(() => {
    let colorValue = color.r
      ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
      : `${defaultColor}`;

    return colorValue;
  }, [color, defaultColor]);

  useEffect(() => {
    onSelectColor(displayColor);
  }, [displayColor]);

  const styles = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `${displayColor}`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  return (
    <div>
      <div style={styles.swatch as React.CSSProperties} onClick={handleClick}>
        <div style={styles.color as React.CSSProperties} />
      </div>
      {displayColorPicker ? (
        <div style={styles.popover as React.CSSProperties}>
          <div
            style={styles.cover as React.CSSProperties}
            onClick={handleClose}
          />
          <SketchPicker color={defaultColor} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default WorkFlowColorPicker;
