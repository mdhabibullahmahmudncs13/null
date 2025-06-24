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
            background: '#282c33',
            color: '#fff',
            border: '1px solid #c778dd',
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
          background: '#282c33',
          color: '#fff',
          border: '1px solid #ff6b6b',
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
    <section id="contacts" className="w-full max-w-[1023px] mx-auto py-8">
      <Toaster position="top-right" />
      
      <div className="flex items-center gap-4 mb-8">
        <div className="inline-flex items-start">
          <span className="font-medium text-[32px] [font-family:'Fira_Code',Helvetica] text-app-primary tracking-[0]">
            #
          </span>
          <span className="font-medium text-[32px] [font-family:'Fira_Code',Helvetica] text-white tracking-[0]">
            contacts
          </span>
        </div>
        <Separator className="flex-1" />
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="max-w-[505px]">
          <p className="[font-family:'Fira_Code',Helvetica] font-medium text-gray text-base mb-8">
            {personalData.contact.description}
          </p>

          <Card className="border border-solid border-[#abb2bf] bg-transparent w-[280px]">
            <CardContent className="p-4 space-y-4">
              <h3 className="[font-family:'Fira_Code',Helvetica] font-semibold text-white text-base mt-[-1.00px]">
                Message me here
              </h3>

              <div className="space-y-2">
                {personalData.contact.methods.map((method, index) => (
                  <div key={index} className="flex items-center gap-[5px]">
                    <img className="w-8 h-8" alt={method.alt} src={method.icon} />
                    <span className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-sm break-all">
                      {method.text}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="flex-1 max-w-[500px]">
          <Card className="border border-solid border-[#abb2bf] bg-transparent">
            <CardContent className="p-6">
              <h3 className="[font-family:'Fira_Code',Helvetica] font-semibold text-white text-xl mb-6">
                Send me a message
              </h3>

              <Form {...form}>
                <form
                  action={`https://formsubmit.co/${personalData.email}`}
                  method="POST"
                  className="space-y-4"
                >
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_autoresponse" value="Thank you! I'll get back to you soon." />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="[font-family:'Fira_Code',Helvetica] text-gray">Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            name="name"
                            placeholder="Your name"
                            className="bg-transparent border-gray text-white [font-family:'Fira_Code',Helvetica] focus:border-app-primary rounded-none"
                          />
                        </FormControl>
                        <FormMessage className="[font-family:'Fira_Code',Helvetica]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="[font-family:'Fira_Code',Helvetica] text-gray">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            name="email"
                            type="email"
                            placeholder="your.email@example.com"
                            className="bg-transparent border-gray text-white [font-family:'Fira_Code',Helvetica] focus:border-app-primary rounded-none"
                          />
                        </FormControl>
                        <FormMessage className="[font-family:'Fira_Code',Helvetica]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="[font-family:'Fira_Code',Helvetica] text-gray">Subject</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            name="subject"
                            placeholder="What's this about?"
                            className="bg-transparent border-gray text-white [font-family:'Fira_Code',Helvetica] focus:border-app-primary rounded-none"
                          />
                        </FormControl>
                        <FormMessage className="[font-family:'Fira_Code',Helvetica]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="[font-family:'Fira_Code',Helvetica] text-gray">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            name="message"
                            placeholder="Tell me about your project or question..."
                            className="bg-transparent border-gray text-white [font-family:'Fira_Code',Helvetica] focus:border-app-primary rounded-none min-h-[120px]"
                          />
                        </FormControl>
                        <FormMessage className="[font-family:'Fira_Code',Helvetica]" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-transparent border border-app-primary text-white hover:bg-app-primary/10 [font-family:'Fira_Code',Helvetica] rounded-none"
                  >
                    Send Message
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