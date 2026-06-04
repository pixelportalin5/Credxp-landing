import Image from "next/image";

export const CREDXP_LOGO_URL =
  "http://credxp.com/wp-content/uploads/2026/05/cropped-cropped-Untitled-design-58-1.png";

type CredxpLogoProps = {
  className?: string;
  priority?: boolean;
};

export function CredxpLogo({
  className = "h-9 w-auto object-contain",
  priority = false,
}: CredxpLogoProps) {
  return (
    <Image
      src={CREDXP_LOGO_URL}
      alt="Credxp"
      width={160}
      height={40}
      className={className}
      priority={priority}
    />
  );
}
