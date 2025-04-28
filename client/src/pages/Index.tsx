import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { Mic } from 'lucide-react';

const Index = () => {
  const genres = [
    {
      title: 'Rap',
      description: 'Showcase your freestyle skills and battle with the best',
      path: '/rap',
      bgImage: 'https://images.unsplash.com/photo-1578445779142-dbe919fcd39c?ixlib=rb-4.0.3&auto=format&fit=crop&q=80',
      icon: <Mic size={48} className="text-custom-red mb-4" />
    },
    {
      title: 'Guitar',
      description: 'Strum your way to stardom with your unique sound',
      path: '/guitar',
      bgImage: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-4.0.3&auto=format&fit=crop&q=80',
    },
    {
      title: 'Piano',
      description: 'Compose beautiful melodies and share your piano passion',
      path: '/piano',
      bgImage: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&auto=format&fit=crop&q=80',
    }
  ];

  return (
    <div className="min-h-screen bg-custom-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-custom-red to-custom-lightGray">
            Discover Raw Talent
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Record, share, and discover amazing musical talent from around the world.
            Start your journey today and let your creativity shine.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {genres.map((genre) => (
            <Link 
              key={genre.title} 
              to={genre.path}
              className="genre-card"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${genre.bgImage})` }}
              />
              <div className="genre-card-overlay" />
              <div className="genre-card-content">
                {genre.icon}
                <h2 className="text-3xl font-bold text-white mb-2">{genre.title}</h2>
                <p className="text-gray-300 mb-6">{genre.description}</p>
                <Button className="bg-custom-red hover:bg-custom-red/90">
                  Explore
                </Button>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-custom-darkGray p-6 rounded-lg">
              <div className="w-12 h-12 bg-custom-red rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-xl font-medium mb-2 text-white">Create</h3>
              <p className="text-gray-400">Record your performances in 30-60 second clips to showcase your unique talent.</p>
            </div>
            
            <div className="bg-custom-darkGray p-6 rounded-lg">
              <div className="w-12 h-12 bg-custom-red rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-xl font-medium mb-2 text-white">Share</h3>
              <p className="text-gray-400">Upload your recordings and share them with the community to gather feedback.</p>
            </div>
            
            <div className="bg-custom-darkGray p-6 rounded-lg">
              <div className="w-12 h-12 bg-custom-red rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-xl font-medium mb-2 text-white">Discover</h3>
              <p className="text-gray-400">Explore performances from other artists and connect with like-minded creators.</p>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-custom-darkGray py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 Vibes and Talent. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
