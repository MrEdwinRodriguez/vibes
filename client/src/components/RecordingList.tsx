
import React from 'react';
import AudioPlayer from './AudioPlayer';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface Recording {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  likes: number;
  dislikes: number;
}

interface RecordingListProps {
  title: string;
  recordings: Recording[];
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
}

const RecordingList = ({ title, recordings, onLike, onDislike }: RecordingListProps) => {
  return (
    <div className="bg-custom-black border border-custom-darkGray rounded-lg p-4 h-full">
      <h2 className="text-lg font-medium mb-4 text-white">{title}</h2>
      
      <ScrollArea className="h-[350px] pr-2">
        {recordings.length > 0 ? (
          recordings.map((recording) => (
            <AudioPlayer
              key={recording.id}
              title={recording.title}
              artist={recording.artist}
              audioUrl={recording.audioUrl}
              likes={recording.likes}
              dislikes={recording.dislikes}
              onLike={() => onLike(recording.id)}
              onDislike={() => onDislike(recording.id)}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No recordings available
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default RecordingList;
