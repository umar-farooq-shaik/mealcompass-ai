
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Mail className="text-meal-primary" size={24} />,
      title: "Email Us",
      content: "hello@mealcompass.com",
      description: "Send us an email anytime"
    },
    {
      icon: <Phone className="text-meal-primary" size={24} />,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri, 9AM-6PM EST"
    },
    {
      icon: <MapPin className="text-meal-primary" size={24} />,
      title: "Global Service",
      content: "Available Worldwide",
      description: "Supporting families everywhere"
    }
  ];

  return (
    <div className="min-h-screen bg-meal-light-bg py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-poppins text-meal-text-dark mb-4">
            Get in Touch
          </h1>
          <p className="text-xl font-roboto text-meal-subtext max-w-2xl mx-auto">
            Have questions about MealCompass? We're here to help you start your journey to better nutrition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-poppins text-meal-text-dark">
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-meal-accent hover:bg-orange-600 text-white py-3 text-lg"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-poppins text-meal-text-dark">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-meal-green-light p-3 rounded-full flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-meal-text-dark mb-1">
                        {info.title}
                      </h3>
                      <p className="text-meal-primary font-medium mb-1">
                        {info.content}
                      </p>
                      <p className="text-meal-subtext text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-poppins text-meal-text-dark">
                  Quick Answers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-meal-text-dark mb-2">
                    How does the AI meal planning work?
                  </h4>
                  <p className="text-meal-subtext text-sm">
                    Our Gemini AI analyzes your dietary preferences, health goals, budget, and location to create personalized meal plans with local ingredients and pricing.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-meal-text-dark mb-2">
                    Is MealCompass available in my country?
                  </h4>
                  <p className="text-meal-subtext text-sm">
                    Yes! MealCompass works globally and adapts to local cuisines, ingredients, and pricing in your area.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-meal-text-dark mb-2">
                    Can I modify my meal plans?
                  </h4>
                  <p className="text-meal-subtext text-sm">
                    Absolutely! Our platform allows recipe swapping and customization to ensure your meal plan fits your preferences perfectly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-meal-green-light p-8 rounded-xl">
          <h2 className="text-2xl font-bold font-poppins text-meal-text-dark mb-4">
            Ready to Transform Your Meals?
          </h2>
          <p className="text-meal-subtext mb-6">
            Don't wait to start eating better. Create your personalized meal plan today!
          </p>
          <a
            href="/create-plan"
            className="inline-block bg-meal-accent hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
