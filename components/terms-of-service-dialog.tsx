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
import { FileText } from 'lucide-react';

interface TermsOfServiceDialogProps {
  children: React.ReactNode;
}

export default function TermsOfServiceDialog({ children }: TermsOfServiceDialogProps) {
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
              <FileText className="h-5 w-5 text-brand-teal" />
            </div>
            <DialogTitle className="text-2xl font-bold text-brand-teal">
              Terms of Service
            </DialogTitle>
          </div>
          <DialogDescription className="text-brand-teal/70">
            Please review our terms and conditions for booking tours with us.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="prose prose-brand max-w-none">
            <div className="space-y-4 text-brand-teal/90 leading-relaxed">
              <p>
                By booking a tour with us, you agree to the following terms:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-brand-teal mb-2">Booking and Payment:</h4>
                  <p>Full payment is required to confirm your reservation. We accept payments via approved methods listed at checkout.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-brand-teal mb-2">Cancellations and Refunds:</h4>
                  <p>Cancellations made at least 30 days before the tour receive a full refund. No refunds for cancellations after this period, except in the case of weather-related cancellations, where a full refund or rescheduling option will be provided.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-brand-teal mb-2">Tour Conduct:</h4>
                  <p>Guests must follow all safety instructions and respect crew and equipment. Failure to comply may result in termination of the tour without refund.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-brand-teal mb-2">Liability:</h4>
                  <p>We are not responsible for any personal injury, loss, or damage during the tour except as required by law.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-brand-teal mb-2">Weather Policy:</h4>
                  <p>Tours may be canceled or rescheduled due to unsafe weather conditions to ensure passenger safety.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-brand-teal mb-2">Changes:</h4>
                  <p>We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of any updates.</p>
                </div>
              </div>
              
              <p className="text-brand-accent font-medium">
                Thank you for choosing us for your adventure!
              </p>
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-brand-pink/30">
            <Button 
              onClick={() => setOpen(false)}
              className="px-6"
            >
              I Understand
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}