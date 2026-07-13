interface SectionTitleProps {
    children: React.ReactNode;
  }
  
  export default function SectionTitle({
    children,
  }: SectionTitleProps) {
    return (
      <h2 className="text-center text-5xl font-extrabold tracking-tight">
        {children}
      </h2>
    );
  }