
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventItem } from "./EventRegistrationModal";

interface VirtualEventCardProps {
  event: EventItem;
  onRegister: (event: EventItem) => void;
}

export const VirtualEventCard = ({ event, onRegister }: VirtualEventCardProps) => {
  return (
    <div className="glass-card overflow-hidden">
      <div className="relative h-48">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
          Virtual
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{event.title}</h3>
        <p className="text-sm text-gray-400 mb-3">
          <Calendar size={14} className="inline mr-2" />
          {event.date} • {event.time}
        </p>
        <Button 
          onClick={() => onRegister(event)}
          className="w-full bg-glow-green hover:bg-glow-green/90 text-black"
          size="sm"
        >
          Join Session
        </Button>
      </div>
    </div>
  );
};
