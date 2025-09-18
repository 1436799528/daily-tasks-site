import { CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <CheckSquare className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold font-headline">TaskFlow</span>
    </div>
  );
}
