
import Navbar from '@/components/Navbar';

const PianoPage = () => {
  return (
    <div className="min-h-screen bg-custom-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-white">Piano Page</h1>
        
        <div className="flex justify-center items-center h-[500px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-custom-red">Coming Soon</h2>
            <p className="text-gray-400">The Piano section is under development. Check back soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PianoPage;
