
import { EventItem } from "./EventRegistrationModal";
import { VirtualEventCard } from "./VirtualEventCard";

interface VirtualEventListProps {
  events: EventItem[];
  onRegister: (event: EventItem) => void;
}

export const VirtualEventList = ({ events, onRegister }: VirtualEventListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(event => (
        <VirtualEventCard 
          key={event.id}
          event={event}
          onRegister={onRegister}
        />
      ))}
    </div>
  );
};
