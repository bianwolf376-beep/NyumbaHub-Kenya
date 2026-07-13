interface SectionSubtitleProps {
    children: React.ReactNode;
  }
  
  export default function SectionSubtitle({
    children,
  }: SectionSubtitleProps) {
    return (
      <p className="mx-auto mt-5 max-w-3xl text-center text-lg text-muted-foreground">
        {children}
      </p>
    );
  }