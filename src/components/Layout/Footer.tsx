import logoLight from '@/assets/logo.png';

export const Footer = () => {
  return (
    <footer className="mt-auto bg-gradient-to-b from-[#323434] to-[#3a3b3b]">
      <div className="mx-auto max-w-[1280px] px-6 py-12 md:py-14 flex flex-col items-center text-center">
        <img 
          src={logoLight} 
          alt="EstateVisio" 
          className="h-5 md:h-7 w-auto object-contain mb-3 md:mb-4"
        />
        <p className="text-[#F8F9FA]/95 text-sm md:text-base tracking-wide max-w-md leading-relaxed">
          Луксозни визии, задвижвани от AI.
        </p>
      </div>
    </footer>
  );
};
