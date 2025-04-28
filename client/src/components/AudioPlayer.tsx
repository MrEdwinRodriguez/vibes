
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  artist: string;
  audioUrl: string;
  likes?: number;
  dislikes?: number;
  onLike?: () => void;
  onDislike?: () => void;
}

const AudioPlayer = ({
  title,
  artist,
  audioUrl,
  likes = 0,
  dislikes = 0,
  onLike,
  onDislike
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });
    
    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('timeupdate', () => {});
      audio.removeEventListener('ended', () => {});
    };
  }, [audioUrl]);
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const handleLike = () => {
    if (!userLiked) {
      setUserLiked(true);
      setUserDisliked(false);
      if (onLike) onLike();
    }
  };
  
  const handleDislike = () => {
    if (!userDisliked) {
      setUserDisliked(true);
      setUserLiked(false);
      if (onDislike) onDislike();
    }
  };
  
  return (
    <div className="bg-custom-darkGray rounded-lg p-4 mb-3">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-white">{title}</h3>
          <p className="text-sm text-gray-400">{artist}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLike} 
            className={userLiked ? "text-custom-red" : "text-gray-400"}
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            {likes + (userLiked ? 1 : 0)}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleDislike}
            className={userDisliked ? "text-custom-red" : "text-gray-400"}
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            {dislikes + (userDisliked ? 1 : 0)}
          </Button>
        </div>
      </div>
      
      <div className="audio-player">
        <button 
          onClick={togglePlay} 
          className={`w-8 h-8 rounded-full flex items-center justify-center ${isPlaying ? 'bg-custom-red' : 'bg-custom-red/80'}`}
        >
          {isPlaying ? (
            <span className="h-3 w-3 bg-white rounded-sm"></span>
          ) : (
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
          )}
        </button>
        
        <div className="flex-1">
          <div className="relative h-2 bg-gray-700 rounded-full">
            <div 
              className="absolute h-2 bg-custom-red rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-400">{formatTime(currentTime)}</span>
            <span className="text-gray-400">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
