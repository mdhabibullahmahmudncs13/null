import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export async function sendEmail(data: ContactFormData): Promise<boolean> {
  try {
    // For now, we'll simulate email sending
    // This will be replaced with actual EmailJS implementation once configured
    console.log('Email data:', data);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For development, always return success
    // In production, you would integrate with EmailJS or another email service
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}