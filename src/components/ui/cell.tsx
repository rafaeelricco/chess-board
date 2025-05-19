import React from "react";

interface CellProps {
  isDark: boolean;
  isActive: boolean;
  isLastMove?: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Cell: React.FC<CellProps> = ({
  isDark,
  isActive,
  isLastMove,
  onClick,
  children,
  className = "",
  style,
}) => {
  const renderSvgBackground = () => {
    if (isDark) {
      if (isLastMove) return <DarkLastMoveSvg />;
      return isActive ? <DarkActiveSvg /> : <DarkActiveOffSvg />;
    } else {
      if (isLastMove) return <LightLastMoveSvg />;
      return isActive ? <LightActiveSvg /> : <LightActiveOffSvg />;
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{
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
      {renderSvgBackground()}
      {children}
    </div>
  );
};

const DarkActiveOffSvg: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 ${className || ""}`}
      {...props}
    >
      <path fill="url(#darkActiveOffGradient)" d="M0 0H72V72H0z" />
      <defs>
        <linearGradient
          id="darkActiveOffGradient"
          x1={0}
          y1={0}
          x2={36}
          y2={72}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFAFA" stopOpacity={0.15} />
          <stop offset={1} stopColor="#fff" stopOpacity={0.05} />
        </linearGradient>
      </defs>
    </svg>
  );
};

const DarkActiveSvg: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 ${className || ""}`}
      {...props}
    >
      <g clipPath="url(#clipDarkActive)">
        <path fill="url(#darkActiveGradient)" d="M0 0H72V72H0z" />
        <path
          opacity={0.5}
          fill="#FF8B1F"
          fillOpacity={0.15}
          d="M0 0H72V72H0z"
        />
      </g>
      <defs>
        <linearGradient
          id="darkActiveGradient"
          x1={0}
          y1={0}
          x2={36}
          y2={72}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFAFA" stopOpacity={0.15} />
          <stop offset={1} stopColor="#fff" stopOpacity={0.05} />
        </linearGradient>
        <clipPath id="clipDarkActive">
          <path fill="#fff" d="M0 0H72V72H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

const DarkLastMoveSvg: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 ${className || ""}`}
      {...props}
    >
      <g clipPath="url(#clipDarkLastMove)">
        <path fill="url(#darkLastMoveGradient)" d="M0 0H72V72H0z" />
        <path
          opacity={0.6}
          fill="#FF9F47"
          fillOpacity={0.25}
          d="M0 0H72V72H0z"
        />
      </g>
      <defs>
        <linearGradient
          id="darkLastMoveGradient"
          x1={0}
          y1={0}
          x2={36}
          y2={72}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFAFA" stopOpacity={0.15} />
          <stop offset={1} stopColor="#fff" stopOpacity={0.05} />
        </linearGradient>
        <clipPath id="clipDarkLastMove">
          <path fill="#fff" d="M0 0H72V72H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

const LightActiveOffSvg: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 ${className || ""}`}
      {...props}
    >
      <path
        fill="url(#lightActiveOffGradient)"
        fillOpacity={0.5}
        d="M0 0H72V72H0z"
      />
      <defs>
        <linearGradient
          id="lightActiveOffGradient"
          x1={0}
          y1={0}
          x2={36}
          y2={72}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFAFA" stopOpacity={0.6} />
          <stop offset={1} stopColor="#fff" stopOpacity={0.3} />
        </linearGradient>
      </defs>
    </svg>
  );
};

const LightActiveSvg: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 ${className || ""}`}
      {...props}
    >
      <g clipPath="url(#clipLightActive)">
        <path
          fill="url(#lightActiveGradient)"
          fillOpacity={0.5}
          d="M0 0H72V72H0z"
        />
        <path
          opacity={0.5}
          fill="#FF8B1F"
          fillOpacity={0.3}
          d="M0 0H72V72H0z"
        />
      </g>
      <defs>
        <linearGradient
          id="lightActiveGradient"
          x1={0}
          y1={0}
          x2={36}
          y2={72}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFAFA" stopOpacity={0.6} />
          <stop offset={1} stopColor="#fff" stopOpacity={0.3} />
        </linearGradient>
        <clipPath id="clipLightActive">
          <path fill="#fff" d="M0 0H72V72H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

const LightLastMoveSvg: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 ${className || ""}`}
      {...props}
    >
      <g clipPath="url(#clipLightLastMove)">
        <path
          fill="url(#lightLastMoveGradient)"
          fillOpacity={0.5}
          d="M0 0H72V72H0z"
        />
        <path
          opacity={0.6}
          fill="#FF9F47"
          fillOpacity={0.3}
          d="M0 0H72V72H0z"
        />
      </g>
      <defs>
        <linearGradient
          id="lightLastMoveGradient"
          x1={0}
          y1={0}
          x2={36}
          y2={72}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFAFA" stopOpacity={0.6} />
          <stop offset={1} stopColor="#fff" stopOpacity={0.3} />
        </linearGradient>
        <clipPath id="clipLightLastMove">
          <path fill="#fff" d="M0 0H72V72H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Cell;
