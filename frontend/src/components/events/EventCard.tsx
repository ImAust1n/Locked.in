
import { useState } from 'react';
import { Calendar, MapPin, Users, Video, Bell, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventItem } from "./EventRegistrationModal";
import { toast } from "sonner";

interface EventCardProps {
  event: EventItem;
  subscribed: string[];
  onSubscribe: (eventId: string) => void;
  onRegister: (event: EventItem) => void;
  isVirtual: (event: EventItem) => boolean;
}

export const EventCard = ({ 
  event, 
  subscribed, 
  onSubscribe, 
  onRegister,
  isVirtual 
}: EventCardProps) => {
  return (
    <div className="glass-card overflow-hidden group hover:shadow-[0_0_15px_#39FF14] hover:border-glow-green/30 transition-all duration-300">
      <div className="relative h-48">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        {isVirtual(event) && (
          <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            Virtual
          </span>
        )}
        <button 
          onClick={() => onSubscribe(event.id)}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            subscribed.includes(event.id) 
              ? "bg-glow-green/20 text-glow-green" 
              : "bg-black/50 text-gray-400 hover:text-white"
          }`}
        >
          {subscribed.includes(event.id) ? <CheckCircle2 size={16} /> : <Bell size={16} />}
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{event.title}</h3>
        <p className="text-sm text-gray-400 flex items-center gap-2 mb-2">
          <Calendar size={14} />
          {event.date} • {event.time}
        </p>
        <p className="text-sm text-gray-400 flex items-center gap-2 mb-3">
          {isVirtual(event) ? (
            <>
              <Video size={14} />
              {event.location}
            </>
          ) : (
            <>
              <MapPin size={14} />
              {event.location}
            </>
          )}
        </p>
        <p className="text-sm text-gray-400 flex items-center gap-2 mb-3">
          <Users size={14} />
          {event.attendees} registered participants
        </p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-400">{event.category}</span>
          <Button 
            onClick={() => onRegister(event)}
            className="bg-glow-green hover:bg-glow-green/90 text-black"
            size="sm"
          >
            Reserve Spot
          </Button>
        </div>
      </div>
    </div>
  );
};
