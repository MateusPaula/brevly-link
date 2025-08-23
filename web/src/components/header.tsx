import LogoSvg from '../assets/logo.svg';

export function Header() {
  return (
    <header className="w-full flex justify-start py-6">
      <img 
        src={LogoSvg} 
        alt="Brevly Logo" 
        className="h-11 w-auto"
      />
    </header>
  );
}
