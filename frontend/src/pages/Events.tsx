
import { useState } from 'react';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { PageBackground } from "../components/ui/PageBackground";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventRegistrationModal, EventItem } from "../components/events/EventRegistrationModal";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { EventsHeader } from "../components/events/EventsHeader";
import { EventSearch } from "../components/events/EventSearch";
import { EventList } from "../components/events/EventList";
import { VirtualEventList } from "../components/events/VirtualEventList";
import { useEventUtils } from "../hooks/useEventUtils";

const Events = () => {
  const navigate = useNavigate();
  const [showRegModal, setShowRegModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [subscribed, setSubscribed] = useState<string[]>([]);
  const { isVirtual } = useEventUtils();
  
  const events: EventItem[] = [
    {
      id: "1",
      title: "Morning Yoga Masterclass",
      date: "May 15, 2025",
      time: "8:00 AM",
      location: "Central Park, New York",
      description: "Start your day with an energizing yoga session led by expert instructors.",
      image: "/f6.jpg",
      category: "Yoga",
      attendees: 24,
      isFull: false
    },
    {
      id: "2",
      title: "HIIT & Run Challenge",
      date: "May 18, 2025",
      time: "6:30 PM",
      location: "Riverside Track",
      description: "Challenge yourself with high-intensity interval training followed by a group run.",
      image: "/f5.jpg",
      category: "HIIT",
      attendees: 32,
      isFull: false
    },
    {
      id: "3",
      title: "Virtual Nutrition Workshop",
      date: "May 20, 2025",
      time: "12:00 PM",
      location: "Online Zoom Session",
      description: "Learn about proper nutrition for fitness and athletic performance from expert nutritionists.",
      image: "/f9.jpg",
      category: "Nutrition",
      attendees: 56,
      isFull: false
    },
    {
      id: "4",
      title: "Strength Training Basics",
      date: "May 25, 2025",
      time: "4:00 PM",
      location: "Fitness Center Downtown",
      description: "Master the fundamentals of strength training with certified trainers.",
      image: "/f7.jpg",
      category: "Strength",
      attendees: 18,
      isFull: false
    }
  ];
  
  const handleRegister = (event: EventItem) => {
    setSelectedEvent(event);
    setShowRegModal(true);
  };
  
  const handleSubscribe = (eventId: string) => {
    if (subscribed.includes(eventId)) {
      setSubscribed(subscribed.filter(id => id !== eventId));
      toast.info("Unsubscribed from event notifications");
    } else {
      setSubscribed([...subscribed, eventId]);
      toast.success("You'll be notified about this event");
    }
  };
  
  const handleSuccessfulRegistration = () => {
    toast.success("Registration successful!", {
      description: "Your spot has been reserved.",
      action: {
        label: "View My Events",
        onClick: () => navigate("/dashboard"),
      },
    });
    setShowRegModal(false);
  };

  return (
    <PageBackground>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <EventsHeader 
          title="FITNESS EVENTS" 
          description="Join live events, connect with fitness experts, and workout with our community.
            From yoga sessions in the park to virtual nutrition workshops, there's something for everyone."
        />
        
        <EventSearch />
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="virtual">Virtual</TabsTrigger>
            <TabsTrigger value="recordings">Recordings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-8">
            <EventList 
              events={events}
              subscribed={subscribed}
              onSubscribe={handleSubscribe}
              onRegister={handleRegister}
              isVirtual={isVirtual}
            />
          </TabsContent>
          
          <TabsContent value="virtual" className="space-y-8">
            <VirtualEventList 
              events={events.filter(e => isVirtual(e))}
              onRegister={handleRegister}
            />
          </TabsContent>
          
          <TabsContent value="recordings" className="space-y-8">
            <div className="text-center text-gray-400 py-8">
              <p>No recordings available at this time.</p>
              <p className="mt-2">Check back later for recorded sessions of past events.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <div className="spotify-playlist">
      <h2 className="text-2xl font-bold text-center mb-4">Top Workout Songs</h2>
      <div className="grid gap-4 p-4 bg-black/5 rounded-lg shadow-inner">
        <iframe style={{borderRadius:"12px"}} src="https://open.spotify.com/embed/track/06KyNuuMOX1ROXRhj787tj?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <iframe style={{borderRadius:"12px"}} src="https://open.spotify.com/embed/track/6IyoLWzljeR3ldQo4KWHT6?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <iframe style={{borderRadius:"12px"}} src="https://open.spotify.com/embed/track/1s70cjkrdj9lpEeQQlmS9l?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <iframe style={{borderRadius:"12px"}} src="https://open.spotify.com/embed/track/3UmeBT1Tu6fOZQi4NMZLR8?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <iframe style={{borderRadius:"12px"}} src="https://open.spotify.com/embed/track/1BzXvBpIFWJgu0P8P6xmP4?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <iframe style={{borderRadius:"12px"}} src="https://open.spotify.com/embed/track/4xkOaSrkexMciUUogZKVTS?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <iframe style={{borderRadius:"12px"}} src="https://open.spotify.com/embed/track/36PTmAQ1RL4bKxmBitlBjY?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <iframe style={{borderRadius:"12px"}} src="https://open.spotify.com/embed/track/1EJIcDYXwSqipW5dFe4uJz?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <iframe style={{borderRadius:"12px"}} src="https://open.spotify.com/embed/track/1tF1sPrk9akJ6UOWY2GTkk?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <iframe style={{borderRadius:"12px"}} src="https://open.spotify.com/embed/track/1jEUraTEnfLfnHUZvLCzoJ?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <iframe style={{borderRadius:"12px"}} src="https://open.spotify.com/embed/track/4iMYpX0D4WBqm1etFYcoEH?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>
    </div>
      <Footer />
      
      {selectedEvent && (
        <EventRegistrationModal
          open={showRegModal}
          onClose={() => setShowRegModal(false)}
          event={selectedEvent}
          onRegister={handleSuccessfulRegistration}
        />
      )}
    </PageBackground>
  );
};

export default Events;
