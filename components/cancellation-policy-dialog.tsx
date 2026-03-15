'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface CancellationPolicyDialogProps {
  children: React.ReactNode;
}

export default function CancellationPolicyDialog({ children }: CancellationPolicyDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-brand-mint rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-brand-teal" />
            </div>
            <DialogTitle className="text-2xl font-bold text-brand-teal">
              Cancellation Policy
            </DialogTitle>
          </div>
          <DialogDescription className="text-brand-teal/70">
            Please review our cancellation and refund policy for tour bookings.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="prose prose-brand max-w-none">
            <div className="space-y-4 text-brand-teal/90 leading-relaxed">
              <p>
                <strong>Full refunds</strong> are available for cancellations made at least 30 days before your scheduled reservation.
              </p>
              
              <p>
                <strong>No refunds</strong> are provided for cancellations made less than 30 days before the tour.
              </p>
              
              <p>
                If your tour is canceled due to weather or safety concerns, you will receive a <strong>full refund</strong> or the option to reschedule.
              </p>
              
              <p>
                To cancel, please contact us as soon as possible via phone at{' '}
                <a href="tel:+19417777465" className="text-brand-accent font-medium hover:underline">
                  941.777.7465
                </a>.
              </p>
              
              <p className="text-brand-accent font-medium">
                Thank you for your understanding.
              </p>
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-brand-pink/30">
            <Button 
              onClick={() => setOpen(false)}
              className="px-6"
            >
              Understood
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}