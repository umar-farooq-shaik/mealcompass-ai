
import { Heart, Users, Globe, Shield } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Heart className="text-meal-primary" size={48} />,
      title: "Health First",
      description: "We believe that good nutrition is the foundation of a healthy life. Every meal plan we create prioritizes your wellbeing."
    },
    {
      icon: <Users className="text-meal-primary" size={48} />,
      title: "Accessibility for All",
      description: "Healthy eating shouldn't be a luxury. We make nutritious meal planning affordable and accessible to families worldwide."
    },
    {
      icon: <Globe className="text-meal-primary" size={48} />,
      title: "Global Perspective",
      description: "Food is universal, but preferences are personal. We celebrate cultural diversity while promoting healthy eating habits."
    },
    {
      icon: <Shield className="text-meal-primary" size={48} />,
      title: "Trust & Transparency",
      description: "Our AI recommendations are based on scientifically-backed nutrition principles and real-world affordability data."
    }
  ];

  return (
    <div className="min-h-screen bg-meal-light-bg">
      {/* Hero Section */}
      <section className="bg-meal-green-light py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins text-meal-text-dark mb-6">
            About MealCompass
          </h1>
          <p className="text-xl font-roboto text-meal-subtext leading-relaxed">
            We're on a mission to make healthy, affordable meal planning accessible to everyone, 
            everywhere. Powered by advanced AI technology, we're transforming how families approach nutrition.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-poppins text-meal-primary mb-6">
                Our Mission
              </h2>
              <p className="text-lg font-roboto text-meal-subtext leading-relaxed mb-6">
                At MealCompass, we believe that everyone deserves access to personalized, nutritious, 
                and affordable meal planning. Our advanced AI technology, powered by Gemini AI, 
                analyzes your unique dietary needs, health goals, budget constraints, and local food 
                availability to create meal plans that actually work for your life.
              </p>
              <p className="text-lg font-roboto text-meal-subtext leading-relaxed">
                We're not just another meal planning app – we're your compass to better health, 
                helping you navigate the complex world of nutrition with confidence and ease.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-meal-green-light p-3 rounded-full">
                    <Heart className="text-meal-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-meal-text-dark">Personalized Nutrition</h3>
                    <p className="text-meal-subtext text-sm">Tailored to your health needs</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-meal-green-light p-3 rounded-full">
                    <Users className="text-meal-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-meal-text-dark">Family-Friendly</h3>
                    <p className="text-meal-subtext text-sm">Plans that work for everyone</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-meal-green-light p-3 rounded-full">
                    <Globe className="text-meal-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-meal-text-dark">Globally Accessible</h3>
                    <p className="text-meal-subtext text-sm">Available worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-poppins text-meal-text-dark mb-4">
              Our Values
            </h2>
            <p className="text-xl font-roboto text-meal-subtext max-w-2xl mx-auto">
              These core principles guide everything we do at MealCompass
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-8 bg-meal-light-bg rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold font-poppins text-meal-text-dark mb-4 text-center">
                  {value.title}
                </h3>
                <p className="text-meal-subtext font-roboto text-center leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-4 bg-meal-green-light">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-poppins text-meal-text-dark mb-6">
            Powered by Advanced AI
          </h2>
          <p className="text-lg font-roboto text-meal-subtext leading-relaxed mb-8">
            MealCompass leverages Google's Gemini AI technology to provide intelligent, 
            personalized meal planning recommendations. Our AI considers hundreds of factors 
            including nutritional requirements, dietary restrictions, local food prices, 
            seasonal availability, and cultural preferences to create plans that are both 
            healthy and practical.
          </p>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold font-poppins text-meal-primary mb-4">
              Key AI Capabilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <ul className="space-y-2 text-meal-subtext">
                <li>• Real-time nutritional analysis</li>
                <li>• Budget optimization algorithms</li>
                <li>• Cultural cuisine adaptation</li>
                <li>• Seasonal ingredient recommendations</li>
              </ul>
              <ul className="space-y-2 text-meal-subtext">
                <li>• Health condition-specific planning</li>
                <li>• Local market price integration</li>
                <li>• Recipe customization and swapping</li>
                <li>• Continuous learning from user feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-poppins text-meal-text-dark mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl font-roboto text-meal-subtext mb-8">
            Join the thousands of families who have transformed their eating habits with MealCompass.
          </p>
          <a
            href="/create-plan"
            className="inline-block bg-meal-accent hover:bg-orange-600 text-white text-lg font-medium px-8 py-4 rounded-lg transition-colors duration-200 transform hover:scale-105"
          >
            Create Your First Plan
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
