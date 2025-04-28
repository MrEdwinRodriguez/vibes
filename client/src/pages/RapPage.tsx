
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AudioRecorder from '@/components/AudioRecorder';
import RecordingList, { Recording } from '@/components/RecordingList';
import { toast } from 'sonner';

// Mock data - In a real app, this would come from a database
const mockRecordings = [
  {
    id: '1',
    title: 'City Lights Freestyle',
    artist: 'MC Shadow',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-621.mp3',
    likes: 42,
    dislikes: 5
  },
  {
    id: '2',
    title: 'Midnight Flow',
    artist: 'Lyrical Storm',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-621.mp3',
    likes: 37,
    dislikes: 3
  },
  {
    id: '3',
    title: 'Street Corner Cypher',
    artist: 'Urban Poet',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-621.mp3',
    likes: 28,
    dislikes: 2
  },
  {
    id: '4',
    title: 'Concrete Dreams',
    artist: 'Word Smith',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-621.mp3',
    likes: 19,
    dislikes: 1
  },
  {
    id: '5',
    title: 'Rhythm & Poetry',
    artist: 'Flow Master',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-621.mp3',
    likes: 24,
    dislikes: 2
  }
];

const RapPage = () => {
  const [topRecordings, setTopRecordings] = useState<Recording[]>([]);
  const [unreleased, setUnreleased] = useState<Recording[]>([]);
  const [following, setFollowing] = useState<Recording[]>([]);
  const [recommended, setRecommended] = useState<Recording[]>([]);
  const [nextId, setNextId] = useState(100);
  
  useEffect(() => {
    // In a real app, these would be separate API calls
    setTopRecordings(mockRecordings.slice(0, 4));
    setUnreleased([]);
    setFollowing(mockRecordings.slice(0, 3));
    setRecommended(mockRecordings.slice(1, 5));
  }, []);
  
  const handleRecordingComplete = (audioBlob: Blob) => {
    // In a real app, this would upload to a server
    const audioUrl = URL.createObjectURL(audioBlob);
    
    const newRecording: Recording = {
      id: String(nextId),
      title: `My Freestyle #${nextId - 99}`,
      artist: 'You',
      audioUrl,
      likes: 0,
      dislikes: 0
    };
    
    setNextId(nextId + 1);
    setUnreleased(prev => [newRecording, ...prev]);
    
    toast.success('Recording saved successfully!');
  };
  
  const handleLike = (id: string) => {
    const updateLikes = (recordings: Recording[]) => 
      recordings.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r);
    
    setTopRecordings(updateLikes);
    setUnreleased(updateLikes);
    setFollowing(updateLikes);
    setRecommended(updateLikes);
  };
  
  const handleDislike = (id: string) => {
    const updateDislikes = (recordings: Recording[]) => 
      recordings.map(r => r.id === id ? { ...r, dislikes: r.dislikes + 1 } : r);
    
    setTopRecordings(updateDislikes);
    setUnreleased(updateDislikes);
    setFollowing(updateDislikes);
    setRecommended(updateDislikes);
  };

  return (
    <div className="min-h-screen bg-custom-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-white">Freestyle Rap</h1>
        
        <AudioRecorder onRecordingComplete={handleRecordingComplete} />
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <RecordingList
            title="Your Top Recordings"
            recordings={topRecordings}
            onLike={handleLike}
            onDislike={handleDislike}
          />
          
          <RecordingList
            title="Your Unreleased"
            recordings={unreleased}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <RecordingList
            title="People You Follow"
            recordings={following}
            onLike={handleLike}
            onDislike={handleDislike}
          />
          
          <RecordingList
            title="Recommended For You"
            recordings={recommended}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        </div>
      </div>
    </div>
  );
};

export default RapPage;
