const CompanyLogo = () => {
  return (
    <>
      <svg width={150} height={80}>
        <text
          fill="url(#grad1)"
          x={30}
          y={60}
          fontSize={45}
          fontWeight="bold"
          fontFamily="Verdana"
        >
          YKT
        </text>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="40%"
              style={{ stopColor: "rgb(25, 0, 255)", stopOpacity: 1 }}
            />
            <stop
              offset="55%"
              style={{ stopColor: "rgb(255, 255, 255)", stopOpacity: 1 }}
            />
            <stop
              offset="65%"
              style={{ stopColor: "rgb(0, 181, 63)", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <text>YKT</text>
      </svg>
    </>
  );
};

export default CompanyLogo;
