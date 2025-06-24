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

export const ContactSection = (): JSX.Element => {
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

  const contactMethods = [
    {
      icon: "/email.svg",
      text: "mdhabibullahmahmudncs13@gmail.com",
      alt: "Email",
    },
    {
      icon: "/discord.svg",
      text: "habibullah_dev",
      alt: "Discord",
    },
  ];

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
            I&apos;m interested in full-time opportunities and freelance projects. 
            If you have any questions or would like to discuss potential collaborations, 
            don&apos;t hesitate to contact me
          </p>

          <Card className="border border-solid border-[#abb2bf] bg-transparent w-[280px]">
            <CardContent className="p-4 space-y-4">
              <h3 className="[font-family:'Fira_Code',Helvetica] font-semibold text-white text-base mt-[-1.00px]">
                Message me here
              </h3>

              <div className="space-y-2">
                {contactMethods.map((method, index) => (
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="[font-family:'Fira_Code',Helvetica] text-gray">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            className="bg-transparent border-gray text-white [font-family:'Fira_Code',Helvetica] focus:border-app-primary rounded-none"
                            {...field}
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
                        <FormLabel className="[font-family:'Fira_Code',Helvetica] text-gray">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            className="bg-transparent border-gray text-white [font-family:'Fira_Code',Helvetica] focus:border-app-primary rounded-none"
                            {...field}
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
                        <FormLabel className="[font-family:'Fira_Code',Helvetica] text-gray">
                          Subject
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What's this about?"
                            className="bg-transparent border-gray text-white [font-family:'Fira_Code',Helvetica] focus:border-app-primary rounded-none"
                            {...field}
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
                        <FormLabel className="[font-family:'Fira_Code',Helvetica] text-gray">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your project or question..."
                            className="bg-transparent border-gray text-white [font-family:'Fira_Code',Helvetica] focus:border-app-primary rounded-none min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="[font-family:'Fira_Code',Helvetica]" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-transparent border border-app-primary text-white hover:bg-app-primary/10 [font-family:'Fira_Code',Helvetica] rounded-none"
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