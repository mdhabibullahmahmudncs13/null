# EmailJS Setup Guide

Follow these steps to set up EmailJS and enable email functionality in your contact form:

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (recommended for personal use)
4. Click "Connect Account" and authorize EmailJS to access your Gmail
5. Give your service a name (e.g., "Gmail Service")
6. Copy the **Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

### Template Content:
```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply to: {{reply_to}}
```

### Template Variables:
Make sure these variables are included in your template:
- `{{from_name}}`
- `{{from_email}}`
- `{{subject}}`
- `{{message}}`
- `{{reply_to}}`

4. Save the template and copy the **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" → "General"
2. Find your **Public Key** (also called User ID)
3. Copy this key

## Step 5: Configure Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the placeholder values with your actual IDs from EmailJS

## Step 6: Test Your Setup

1. Restart your development server: `npm run dev`
2. Go to your contact form
3. Fill out and submit a test message
4. Check your Gmail inbox for the message

## Important Notes:

### Free Plan Limits:
- 200 emails per month
- EmailJS branding in emails
- Perfect for portfolio websites

### Security:
- Your Public Key is safe to expose in client-side code
- Never expose your Private Key
- EmailJS handles all the security

### Troubleshooting:

**If emails aren't sending:**
1. Check browser console for errors
2. Verify all environment variables are set correctly
3. Make sure your Gmail service is connected in EmailJS
4. Check EmailJS dashboard for any error logs

**If emails go to spam:**
1. This is normal for new EmailJS accounts
2. Ask recipients to mark as "Not Spam"
3. Consider upgrading to a paid plan for better deliverability

### Alternative Email Services:
If you prefer not to use Gmail, EmailJS also supports:
- Outlook/Hotmail
- Yahoo Mail
- Custom SMTP servers

## Next Steps:

Once everything is working:
1. Customize the email template to match your branding
2. Consider upgrading to a paid plan for more features
3. Add email notifications for form submissions
4. Set up auto-reply messages for users

Your contact form is now fully functional and will send emails directly to your Gmail inbox!