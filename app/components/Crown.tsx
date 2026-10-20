// The Britannia Crown mark, drawn in the brand burgundy and champagne.
export default function Crown({ light = false }: { light?: boolean }) {
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M20,120 L35,50 L70,90 L100,30 L130,90 L165,50 L180,120 Z" fill={light ? "#E8C89C" : "#6B1E3D"} />
      <rect x="15" y="120" width="170" height="26" rx="3" fill={light ? "#E8C89C" : "#6B1E3D"} />
      <circle cx="100" cy="40" r="10" fill={light ? "#4A0E29" : "#E8C89C"} />
    </svg>
  );
}
