
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "./EventCard";
import { EventItem } from "./EventRegistrationModal";

interface EventListProps {
  events: EventItem[];
  subscribed: string[];
  onSubscribe: (eventId: string) => void;
  onRegister: (event: EventItem) => void;
  isVirtual: (event: EventItem) => boolean;
}

export const EventList = ({ events, subscribed, onSubscribe, onRegister, isVirtual }: EventListProps) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard 
            key={event.id}
            event={event}
            subscribed={subscribed}
            onSubscribe={onSubscribe}
            onRegister={onRegister}
            isVirtual={isVirtual}
          />
        ))}
      </div>
      
      <div className="text-center">
        <Button variant="outline" className="border-white/20 hover:border-glow-green">
          View More <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};
