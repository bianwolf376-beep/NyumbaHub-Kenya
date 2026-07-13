import Link from "next/link";

interface AuthFooterProps {
  text: string;
  link: string;
  linkText: string;
}

export default function AuthFooter({
  text,
  link,
  linkText,
}: AuthFooterProps) {
  return (
    <p className="mt-8 text-center text-sm text-muted-foreground">
      {text}{" "}
      <Link
        href={link}
        className="font-semibold text-sky-600 hover:underline"
      >
        {linkText}
      </Link>
    </p>
  );
}