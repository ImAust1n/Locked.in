
import { Star } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Yoga Instructor",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      quote: "Locked.in helped me enhance my yoga practice with AI form correction. The personalized recommendations integrate perfectly with my traditional Surya Namaskar routines!",
      stars: 5
    },
    {
      name: "Rajesh Patel",
      role: "IT Professional",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      quote: "As someone with a busy schedule, the AI workout generator gives me effective 20-minute routines. The app suggests when to take chai breaks between meetings for stretching!",
      stars: 5
    },
    {
      name: "Ananya Desai",
      role: "Medical Student",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      quote: "The Indian meal suggestions have made healthy eating enjoyable. It's helped me balance my macros while still enjoying the foods I grew up with. Highly recommended!",
      stars: 4
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-black/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">What Our </span>
            <span className="text-glow-green">Community Says</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of Indians transforming their fitness journey with our AI-powered platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl border border-glow-green/20"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover border border-glow-green/50"
                />
                <div className="ml-4">
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.stars ? "text-glow-green fill-glow-green" : "text-gray-500"}
                  />
                ))}
              </div>
              
              <p className="text-gray-300 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <button className="btn-glow">View All Success Stories</button>
        </div>
      </div>
    </section>
  );
};
