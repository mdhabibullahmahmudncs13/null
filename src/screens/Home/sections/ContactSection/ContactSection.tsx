import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { contactFormSchema, type ContactFormData, sendEmail } from "../../../../lib/email";
import { usePersonalData } from "../../../../hooks/useJsonData";

export const ContactSection = (): JSX.Element => {
  const personalData = usePersonalData();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const success = await sendEmail(data);
      
      if (success) {
        toast.success("Message sent successfully! I'll get back to you soon.", {
          duration: 5000,
          style: {
            background: 'rgba(15, 23, 42, 0.9)',
            color: '#fff',
            border: '1px solid rgba(0, 255, 157, 0.5)',
            boxShadow: '0 0 20px rgba(0, 255, 157, 0.3)',
          },
        });
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again or contact me directly.", {
        duration: 5000,
        style: {
          background: 'rgba(15, 23, 42, 0.9)',
          color: '#fff',
          border: '1px solid #ff6b6b',
          boxShadow: '0 0 20px rgba(255, 107, 107, 0.3)',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!personalData) {
    return <div>Loading...</div>;
  }

  return (
    <section id="contacts" className="w-full max-w-[1023px] mx-auto py-8 relative">
      <Toaster position="top-right" />
      
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
      
      <div className="flex items-center gap-4 mb-6 sm:mb-8 relative z-10">
        <div className="inline-flex items-start">
          <span className="font-medium text-2xl sm:text-[32px] [font-family:'Fira_Code',Helvetica] text-app-primary tracking-[0] cyber-text-glow">
            #
          </span>
          <span className="font-medium text-2xl sm:text-[32px] [font-family:'Fira_Code',Helvetica] text-white tracking-[0]">
            contacts
          </span>
        </div>
        <Separator className="flex-1 bg-app-primary/30" />
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-8 relative z-10">
        <div className="w-full lg:max-w-[505px]">
          <p className="[font-family:'Fira_Code',Helvetica] font-medium text-gray text-sm sm:text-base mb-6 sm:mb-8">
            {personalData.contact.description}
          </p>

          <Card className="border-2 border-app-primary/50 bg-app-background/50 backdrop-blur-sm w-full sm:w-[280px] cyber-glow hover:border-app-primary transition-all duration-300">
            <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4">
              <h3 className="[font-family:'Fira_Code',Helvetica] font-semibold text-app-primary text-sm sm:text-base mt-[-1.00px] cyber-text-glow">
                Message me here
              </h3>

              <div className="space-y-2">
                {personalData.contact.methods.map((method, index) => (
                  <div key={index} className="flex items-center gap-[5px] group">
                    <img className="w-6 h-6 sm:w-8 sm:h-8 filter brightness-0 invert group-hover:filter-none transition-all duration-300" 
                         style={{ filter: 'brightness(0) saturate(100%) invert(64%) sepia(98%) saturate(3207%) hue-rotate(130deg) brightness(101%) contrast(101%)' }}
                         alt={method.alt} src={method.icon} />
                    <span className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-xs sm:text-sm break-all group-hover:text-app-secondary transition-colors duration-300">
                      {method.text}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="flex-1 w-full lg:max-w-[500px]">
          <Card className="border-2 border-app-primary/50 bg-app-background/50 backdrop-blur-sm cyber-glow hover:border-app-primary transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <h3 className="[font-family:'Fira_Code',Helvetica] font-semibold text-app-primary text-lg sm:text-xl mb-4 sm:mb-6 cyber-text-glow">
                Send me a message
              </h3>

              <Form {...form}>
                <form
                  action={`https://formsubmit.co/${personalData.email}`}
                  method="POST"
                  className="space-y-3 sm:space-y-4"
                >
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_autoresponse" value="Thank you! I'll get back to you soon." />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="[font-family:'Fira_Code',Helvetica] text-app-secondary text-sm sm:text-base">Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            name="name"
                            placeholder="Your name"
                            className="bg-transparent border-2 border-app-primary/30 text-white [font-family:'Fira_Code',Helvetica] focus:border-app-primary focus:cyber-glow rounded-none transition-all duration-300 text-sm sm:text-base"
                          />
                        </FormControl>
                        <FormMessage className="[font-family:'Fira_Code',Helvetica] text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="[font-family:'Fira_Code',Helvetica] text-app-secondary text-sm sm:text-base">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            name="email"
                            type="email"
                            placeholder="your.email@example.com"
                            className="bg-transparent border-2 border-app-primary/30 text-white [font-family:'Fira_Code',Helvetica] focus:border-app-primary focus:cyber-glow rounded-none transition-all duration-300 text-sm sm:text-base"
                          />
                        </FormControl>
                        <FormMessage className="[font-family:'Fira_Code',Helvetica] text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="[font-family:'Fira_Code',Helvetica] text-app-secondary text-sm sm:text-base">Subject</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            name="subject"
                            placeholder="What's this about?"
                            className="bg-transparent border-2 border-app-primary/30 text-white [font-family:'Fira_Code',Helvetica] focus:border-app-primary focus:cyber-glow rounded-none transition-all duration-300 text-sm sm:text-base"
                          />
                        </FormControl>
                        <FormMessage className="[font-family:'Fira_Code',Helvetica] text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="[font-family:'Fira_Code',Helvetica] text-app-secondary text-sm sm:text-base">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            name="message"
                            placeholder="Tell me about your project or question..."
                            className="bg-transparent border-2 border-app-primary/30 text-white [font-family:'Fira_Code',Helvetica] focus:border-app-primary focus:cyber-glow rounded-none min-h-[100px] sm:min-h-[120px] transition-all duration-300 text-sm sm:text-base"
                          />
                        </FormControl>
                        <FormMessage className="[font-family:'Fira_Code',Helvetica] text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-2 border-app-primary text-app-primary hover:bg-app-primary/20 [font-family:'Fira_Code',Helvetica] rounded-none cyber-glow cyber-scan-line transition-all duration-300 text-sm sm:text-base py-2 sm:py-3"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};