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
import { Shield } from 'lucide-react';

interface PrivacyPolicyDialogProps {
  children: React.ReactNode;
}

export default function PrivacyPolicyDialog({ children }: PrivacyPolicyDialogProps) {
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
              <Shield className="h-5 w-5 text-brand-teal" />
            </div>
            <DialogTitle className="text-2xl font-bold text-brand-teal">
              Privacy Policy
            </DialogTitle>
          </div>
          <DialogDescription className="text-brand-teal/70">
            Your privacy is important to us. Here's how we handle your information.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="prose prose-brand max-w-none">
            <div className="space-y-4 text-brand-teal/90 leading-relaxed">
              <p>
                We value your privacy. Any personal information you provide—such as your name, 
                contact details, or booking information—is used solely to manage your reservation 
                and communicate with you about our services.
              </p>
              
              <p>
                We do not sell or share your data with third parties. All payment processing 
                is handled securely through trusted third-party platforms.
              </p>
              
              <p>
                By using our website and booking services, you consent to this policy.
              </p>
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-brand-pink/30">
            <Button 
              onClick={() => setOpen(false)}
              className="px-6"
            >
              Got it
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}