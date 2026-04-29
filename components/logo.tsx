export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="144.0 80.0 224.0 352.0"
      fill="none"
    >
      <path
        d="M256,96L352,224L256,416L160,224Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="24"
        strokeLinejoin="round"
      />
      <path
        d="M160,224L352,224M256,96L224,224M224,224L256,416M256,96L288,224M288,224L256,416"
        fill="none"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}
