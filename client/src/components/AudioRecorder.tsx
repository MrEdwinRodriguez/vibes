
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { toast } from 'sonner';

const AudioRecorder = ({ onRecordingComplete }: { onRecordingComplete: (blob: Blob) => void }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        onRecordingComplete(audioBlob);
        
        // Stop all tracks on the stream to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);
      
      // Start timer
      const intervalId = setInterval(() => {
        setDuration(prev => {
          // Auto-stop at 60 seconds
          if (prev >= 60) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
      
      setTimer(intervalId);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Cannot access microphone. Please check permissions.');
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
    }
  };
  
  const formatTime = (seconds: number) => {
    return `${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  return (
    <div className="bg-custom-darkGray rounded-xl p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-white">Record Your Freestyle</h2>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isRecording ? (
            <>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-custom-red animate-pulse-recording mr-2"></div>
                <span className="text-custom-red font-medium">Recording: {formatTime(duration)}s</span>
              </div>
              
              <div className="waveform">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className="waveform-bar" 
                    style={{ 
                      height: `${Math.random() * 100}%`,
                      '--delay': i
                    } as React.CSSProperties}
                  ></div>
                ))}
              </div>
            </>
          ) : (
            <span className="text-white opacity-75">30-60 second freestyle</span>
          )}
        </div>
        
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          className={isRecording ? "bg-custom-red/80 hover:bg-custom-red/90" : "bg-custom-red hover:bg-custom-red/90"}
        >
          {isRecording ? (
            <>
              <MicOff className="mr-2 h-4 w-4" /> Stop Recording
            </>
          ) : (
            <>
              <Mic className="mr-2 h-4 w-4" /> Start Recording
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AudioRecorder;
