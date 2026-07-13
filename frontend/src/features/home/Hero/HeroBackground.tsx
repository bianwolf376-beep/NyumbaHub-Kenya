export default function HeroBackground() {
    return (
      <>
        <div className="absolute inset-0 -z-30 bg-gradient-to-br from-sky-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
  
        <div className="absolute -left-40 top-0 -z-20 h-[450px] w-[450px] rounded-full bg-sky-500/20 blur-[120px]" />
  
        <div className="absolute -right-40 bottom-0 -z-20 h-[450px] w-[450px] rounded-full bg-emerald-500/20 blur-[120px]" />
      </>
    );
  }