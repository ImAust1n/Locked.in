
import { EventItem } from "../components/events/EventRegistrationModal";

export const useEventUtils = () => {
  // Function to determine if an event is virtual based on location
  const isVirtual = (event: EventItem) => {
    return event.location.toLowerCase().includes('online') || 
           event.location.toLowerCase().includes('zoom');
  };

  return {
    isVirtual
  };
};
