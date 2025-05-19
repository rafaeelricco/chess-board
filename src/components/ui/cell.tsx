import React from "react";

interface CellProps {
  isDark: boolean;
  isActive: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Cell: React.FC<CellProps> = ({
  isDark,
  isActive,
  onClick,
  children,
  className = "",
  style,
}) => {
  let backgroundImage = "";

  if (isDark) {
    backgroundImage = isActive
      ? 'url("/bg-dark-active.svg")'
      : 'url("/bg-dark-active-off.svg")';
  } else {
    backgroundImage = isActive
      ? 'url("/bg-light-active.svg")'
      : 'url("/bg-light-active-off.svg")';
  }

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        ...style,
      }}
      onClick={onClick}
      role="button"
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => (e.key === "Enter" || e.key === " ") && onClick()
          : undefined
      }
    >
      {children}
    </div>
  );
};

export default Cell;
