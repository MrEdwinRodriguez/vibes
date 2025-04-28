
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-custom-black border-b border-custom-darkGray py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 bg-custom-red rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">VT</span>
          </div>
          <span className="text-white">Vibes<span className="text-custom-red">Talent</span></span>
        </Link>
        
        <div className="flex items-center space-x-1">
          <Link to="/">
            <Button 
              variant={isActive("/") ? "default" : "ghost"} 
              className={isActive("/") ? "bg-custom-red hover:bg-custom-red/90" : ""}
            >
              Home
            </Button>
          </Link>
          <Link to="/rap">
            <Button 
              variant={isActive("/rap") ? "default" : "ghost"} 
              className={isActive("/rap") ? "bg-custom-red hover:bg-custom-red/90" : ""}
            >
              Rap
            </Button>
          </Link>
          <Link to="/guitar">
            <Button 
              variant={isActive("/guitar") ? "default" : "ghost"} 
              className={isActive("/guitar") ? "bg-custom-red hover:bg-custom-red/90" : ""}
            >
              Guitar
            </Button>
          </Link>
          <Link to="/piano">
            <Button 
              variant={isActive("/piano") ? "default" : "ghost"} 
              className={isActive("/piano") ? "bg-custom-red hover:bg-custom-red/90" : ""}
            >
              Piano
            </Button>
          </Link>
        </div>

        <Button className="bg-custom-red hover:bg-custom-red/90">
          Sign In
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
