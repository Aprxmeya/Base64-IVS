// In src/components/registration/ConfirmationStep.jsx

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Download, Edit, Loader2 } from 'lucide-react'; // Import Loader2
import Image from 'next/image';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef, useState } from 'react'; // Import useState
import { useToast } from '@/hooks/use-toast'; // Import useToast

export function ConfirmationStep({ formData, prevStep, nextStep }) {
  const summaryRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
  const { toast } = useToast(); // Initialize toast

  const handleDownloadPdf = () => {
    // ... (your existing PDF download logic remains the same)
  };

  const handleSubmit = async () => {
    setIsSubmitting(true); // Set loading state to true

    try {
      const response = await fetch('http://localhost:5000/api/register', { // The API endpoint URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle server-side errors
        throw new Error(result.message || 'Something went wrong');
      }

      // If submission is successful, show a success toast and move to the next step
      toast({
        title: "Submission Sent!",
        description: "Your registration has been processed.",
      });
      nextStep(); // This will show the SuccessStep component

    } catch (error) {
      // Handle network errors or errors from the server
      console.error('Submission failed:', error);
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: error.message,
      });
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <Card className="w-full shadow-2xl shadow-primary/10">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-center">Confirm Your Details</CardTitle>
        <CardDescription className="text-center">Please review your registration summary below.</CardDescription>
      </CardHeader>
      <CardContent ref={summaryRef} className="p-6 space-y-6 bg-card">
        {/* ... (Your existing JSX for displaying form data remains the same) ... */}
      </CardContent>
      <CardFooter className="flex flex-col-reverse sm:flex-row justify-between gap-4">
        <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Details
        </Button>
        <div className="flex gap-4">
            <Button variant="secondary" onClick={handleDownloadPdf} disabled={isSubmitting}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Check className="ml-2 h-4 w-4" />
                )}
                {isSubmitting ? 'Submitting...' : 'Confirm & Submit'}
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}