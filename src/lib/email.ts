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
    // Using EmailJS service for client-side email sending
    // You'll need to set up EmailJS account and get your service ID, template ID, and public key
    
    const emailData = {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
      to_email: "mdhabibullahmahmudncs13@gmail.com",
    };

    // For now, we'll simulate the email sending
    // In production, you would integrate with EmailJS or another email service
    console.log("Email data:", emailData);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demonstration, we'll always return true
    // In real implementation, this would make an actual API call
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}