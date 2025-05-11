
interface EventsHeaderProps {
  title: string;
  description: string;
}

export const EventsHeader = ({ title, description }: EventsHeaderProps) => {
  return (
    <>
      <h1 className="text-4xl font-orbitron mb-6 text-center">
        <span className="text-glow-green">{title.split(' ')[0]} </span>
        <span>{title.split(' ').slice(1).join(' ')}</span>
      </h1>
      
      <div className="glass-card p-6 mb-12">
        <p className="text-center text-gray-300 mb-6">
          {description}
        </p>
      </div>
    </>
  );
};
