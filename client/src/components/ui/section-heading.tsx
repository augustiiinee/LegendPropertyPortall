type SectionHeadingProps = {
  title: string;
  description?: string;
  alignment?: 'left' | 'center' | 'right';
};

export default function SectionHeading({ 
  title, 
  description = "",
  alignment = 'center'
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 text-${alignment}`}>
      <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-primary mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-neutral-dark max-w-3xl mx-auto">
          {description}
        </p>
      )}
      <div className={`w-24 h-1 bg-secondary ${alignment === 'center' ? 'mx-auto' : ''} mt-4`}></div>
    </div>
  );
}
