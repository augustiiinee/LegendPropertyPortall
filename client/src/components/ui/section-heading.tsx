import { cn } from '@/lib/utils';

export type SectionHeadingProps = {
  title: string;
  description?: string;
  alignment?: 'left' | 'center' | 'right';
  titleClass?: string;
  descriptionClass?: string;
  className?: string;
};

export default function SectionHeading({ 
  title, 
  description, 
  alignment = 'left',
  titleClass,
  descriptionClass
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-8', {
      'text-left': alignment === 'left',
      'text-center': alignment === 'center',
      'text-right': alignment === 'right',
    })}>
      <h2 className={cn("text-3xl md:text-4xl font-montserrat font-bold text-primary mb-4", titleClass)}>{title}</h2>
      {description && <p className={cn("text-lg text-neutral-dark max-w-3xl mx-auto", descriptionClass)}>{description}</p>}
    </div>
  );
}