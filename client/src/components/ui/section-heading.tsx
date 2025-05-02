import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  title: string;
  description?: string;
  alignment?: 'left' | 'center' | 'right';
};

export default function SectionHeading({ title, description, alignment = 'left' }: SectionHeadingProps) {
  return (
    <div className={cn('mb-8', {
      'text-left': alignment === 'left',
      'text-center': alignment === 'center',
      'text-right': alignment === 'right',
    })}>
      <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-primary mb-4">{title}</h2>
      {description && <p className="text-lg text-neutral-dark max-w-3xl mx-auto">{description}</p>}
    </div>
  );
}