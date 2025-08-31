// 'use client';

// import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { ArrowLeft, Check, Download, Edit, Loader2 } from 'lucide-react';
// import Image from 'next/image';
// import { format } from 'date-fns';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';
// import { useRef, useState } from 'react';
// import { useToast } from '@/hooks/use-toast';

// export function ConfirmationStep({ formData, prevStep, nextStep }) {
//   const summaryRef = useRef(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();

//   const handleDownloadPdf = () => {
//     // PDF download logic remains the same
//     const input = summaryRef.current;
//     if (input) {
//       html2canvas(input, { scale: 2 }).then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'px', 'a4');
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = pdf.internal.pageSize.getHeight();
//         const canvasWidth = canvas.width;
//         const canvasHeight = canvas.height;
//         const ratio = canvasWidth / canvasHeight;
//         const width = pdfWidth;
//         const height = width / ratio;
//         let finalHeight = height > pdfHeight ? pdfHeight : height;
//         pdf.addImage(imgData, 'PNG', 0, 0, width, finalHeight);
//         pdf.save('registration-summary.pdf');
//       });
//     }
//   };
  
//   const handleSubmit = async () => {
//     setIsSubmitting(true);

//     try {
//       const response = await fetch('http://localhost:5000/api/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       // THIS IS THE KEY CHANGE. We now read the specific error from the backend.
//       if (!response.ok) {
//         throw new Error(result.error || 'Something went wrong on the server.');
//       }

//       toast({
//         title: "Submission Sent!",
//         description: "Your registration has been processed.",
//       });
//       nextStep();

//     } catch (error) {
//       // This will now display the detailed error.
//       console.error('Submission failed:', error);
//       toast({
//         variant: 'destructive',
//         title: 'Submission Failed',
//         description: error.message,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

//   return (
//     <Card className="w-full shadow-2xl shadow-primary/10">
//       <CardHeader>
//         <CardTitle className="font-headline text-3xl text-center">Confirm Your Details</CardTitle>
//         <CardDescription className="text-center">Please review your registration summary below.</CardDescription>
//       </CardHeader>
//       <CardContent ref={summaryRef} className="p-6 space-y-6 bg-card">
//         <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
//             <Image
//               src={formData.photo}
//               alt="User photo"
//               width={150}
//               height={200}
//               className="rounded-lg object-cover border-4 border-white shadow-lg"
//             />
//           <div className="flex-1 space-y-4 text-center sm:text-left">
//             <h2 className="text-2xl font-bold font-headline text-primary">{formData.fullName}</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
//               <p><strong>Email:</strong> {formData.email}</p>
//               <p><strong>Phone:</strong> {formData.phoneNumber}</p>
//               <p><strong>Date of Birth:</strong> {formData.dateOfBirth ? format(formData.dateOfBirth, 'MMMM d, yyyy') : 'N/A'}</p>
//               <p><strong>Gender:</strong> {capitalize(formData.gender)}</p>
//               <p className="md:col-span-2"><strong>University:</strong> {formData.university}</p>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter className="flex flex-col-reverse sm:flex-row justify-between gap-4">
//         <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
//           <Edit className="mr-2 h-4 w-4" />
//           Edit Details
//         </Button>
//         <div className="flex gap-4">
//             <Button variant="secondary" onClick={handleDownloadPdf} disabled={isSubmitting}>
//                 <Download className="mr-2 h-4 w-4" />
//                 Download PDF
//             </Button>
//             <Button onClick={handleSubmit} disabled={isSubmitting}>
//                 {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="ml-2 h-4 w-4" />}
//                 {isSubmitting ? 'Submitting...' : 'Confirm & Submit'}
//             </Button>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }

// 'use client';

// import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { ArrowLeft, Check, Download, Edit, Loader2 } from 'lucide-react';
// import Image from 'next/image';
// import { format } from 'date-fns';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';
// import { useRef, useState } from 'react';
// import { useToast } from '@/hooks/use-toast';

// export function ConfirmationStep({ formData, prevStep, nextStep }) {
//   const summaryRef = useRef(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();

//   const handleDownloadPdf = () => {
//     const input = summaryRef.current;
//     if (input) {
//       // Temporarily add a print-friendly class
//       input.classList.add('bg-white', 'p-6');

//       html2canvas(input, {
//         scale: 2, // Increase scale for better resolution
//         backgroundColor: '#ffffff', // Explicitly set a white background
//         useCORS: true, // Helps with loading images correctly
//       }).then((canvas) => {
//         // Remove the temporary class after canvas is created
//         input.classList.remove('bg-white', 'p-6');

//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF({
//           orientation: 'portrait',
//           unit: 'px',
//           format: 'a4',
//         });
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = pdf.internal.pageSize.getHeight();
//         const canvasWidth = canvas.width;
//         const canvasHeight = canvas.height;
//         const ratio = canvasWidth / canvasHeight;
        
//         // Calculate the height based on the PDF width to maintain aspect ratio
//         let imgWidth = pdfWidth;
//         let imgHeight = imgWidth / ratio;
        
//         // If the calculated height is too large, adjust it
//         if (imgHeight > pdfHeight) {
//           imgHeight = pdfHeight;
//           imgWidth = imgHeight * ratio;
//         }

//         pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//         pdf.save('registration-summary.pdf');
//       });
//     }
//   };
  
//   const handleSubmit = async () => {
//     setIsSubmitting(true);

//     try {
//       const response = await fetch('http://localhost:5000/api/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();
      
//       if (!response.ok) {
//         throw new Error(result.error || 'Something went wrong on the server.');
//       }

//       toast({
//         title: "Submission Sent!",
//         description: "Your registration has been processed.",
//       });
//       nextStep();

//     } catch (error) {
//       console.error('Submission failed:', error);
//       toast({
//         variant: 'destructive',
//         title: 'Submission Failed',
//         description: error.message,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

//   return (
//     <Card className="w-full shadow-2xl shadow-primary/10">
//       <CardHeader>
//         <CardTitle className="font-headline text-3xl text-center">Confirm Your Details</CardTitle>
//         <CardDescription className="text-center">Please review your registration summary below.</CardDescription>
//       </CardHeader>
//       {/* The ref is now on a div INSIDE CardContent for styling control */}
//       <CardContent className="p-6">
//         <div ref={summaryRef} className="space-y-6">
//             <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
//                 <Image
//                   src={formData.photo}
//                   alt="User photo"
//                   width={150}
//                   height={200}
//                   className="rounded-lg object-cover border-4 border-white shadow-lg"
//                 />
//               <div className="flex-1 space-y-4 text-center sm:text-left">
//                 <h2 className="text-2xl font-bold font-headline text-primary">{formData.fullName}</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
//                   <p><strong>Email:</strong> {formData.email}</p>
//                   <p><strong>Phone:</strong> {formData.phoneNumber}</p>
//                   <p><strong>Date of Birth:</strong> {formData.dateOfBirth ? format(formData.dateOfBirth, 'MMMM d, yyyy') : 'N/A'}</p>
//                   <p><strong>Gender:</strong> {capitalize(formData.gender)}</p>
//                   <p className="md:col-span-2"><strong>University:</strong> {formData.university}</p>
//                 </div>
//               </div>
//             </div>
//         </div>
//       </CardContent>
//       <CardFooter className="flex flex-col-reverse sm:flex-row justify-between gap-4">
//         <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
//           <Edit className="mr-2 h-4 w-4" />
//           Edit Details
//         </Button>
//         <div className="flex gap-4">
//             <Button variant="secondary" onClick={handleDownloadPdf} disabled={isSubmitting}>
//                 <Download className="mr-2 h-4 w-4" />
//                 Download PDF
//             </Button>
//             <Button onClick={handleSubmit} disabled={isSubmitting}>
//                 {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="ml-2 h-4 w-4" />}
//                 {isSubmitting ? 'Submitting...' : 'Confirm & Submit'}
//             </Button>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Download, Edit, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function ConfirmationStep({ formData, prevStep, nextStep }) {
  const summaryRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleDownloadPdf = () => {
    const input = summaryRef.current;
    if (input) {
      // Temporarily add print-friendly classes for background AND text color
      input.classList.add('bg-white', 'text-black', 'p-6');

      html2canvas(input, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      }).then((canvas) => {
        // IMPORTANT: Remove the temporary classes after the canvas is created
        input.classList.remove('bg-white', 'text-black', 'p-6');

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: 'a4',
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        
        let imgWidth = pdfWidth;
        let imgHeight = imgWidth / ratio;
        
        if (imgHeight > pdfHeight) {
          imgHeight = pdfHeight;
          imgWidth = imgHeight * ratio;
        }

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('registration-summary.pdf');
      });
    }
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong on the server.');
      }

      toast({
        title: "Submission Sent!",
        description: "Your registration has been processed.",
      });
      nextStep();

    } catch (error) {
      console.error('Submission failed:', error);
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

  return (
    <Card className="w-full shadow-2xl shadow-primary/10">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-center">Confirm Your Details</CardTitle>
        <CardDescription className="text-center">Please review your registration summary below.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div ref={summaryRef} className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <Image
                  src={formData.photo}
                  alt="User photo"
                  width={150}
                  height={200}
                  className="rounded-lg object-cover border-4 border-white shadow-lg"
                />
              <div className="flex-1 space-y-4 text-center sm:text-left">
                <h2 className="text-2xl font-bold font-headline text-primary">{formData.fullName}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phoneNumber}</p>
                  <p><strong>Date of Birth:</strong> {formData.dateOfBirth ? format(formData.dateOfBirth, 'MMMM d, yyyy') : 'N/A'}</p>
                  <p><strong>Gender:</strong> {capitalize(formData.gender)}</p>
                  <p className="md:col-span-2"><strong>University:</strong> {formData.university}</p>
                </div>
              </div>
            </div>
        </div>
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
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="ml-2 h-4 w-4" />}
                {isSubmitting ? 'Submitting...' : 'Confirm & Submit'}
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}