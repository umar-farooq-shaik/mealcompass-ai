
import { Link } from 'react-router-dom';
import { ChefHat, Users, Download, Heart, Globe, Shield, Utensils, Calculator, Smartphone } from 'lucide-react';

const Home = () => {
  const howItWorksSteps = [
    {
      title: "Step 1: Enter Preferences",
      description: "Tell us about your dietary needs, budget, health goals, and family size. Our smart form adapts to your location and preferences.",
      icon: <ChefHat className="text-meal-primary" size={48} />
    },
    {
      title: "Step 2: AI Designs Your Meal Plan",
      description: "Our Gemini AI analyzes your inputs and creates a personalized meal plan with recipes, nutrition info, and local pricing.",
      icon: <Users className="text-meal-primary" size={48} />
    },
    {
      title: "Step 3: Download and Follow Easily",
      description: "Get your complete meal plan with shopping lists, nutritional breakdowns, and cost estimates in an easy-to-follow format.",
      icon: <Download className="text-meal-primary" size={48} />
    }
  ];

  const features = [
    {
      title: "Seasonal Ingredient Recommendations",
      description: "Get the freshest ingredients at the best prices with our seasonal suggestions.",
      icon: <Globe className="text-meal-primary" size={32} />
    },
    {
      title: "Global Availability & Pricing",
      description: "Real-time pricing and availability data for ingredients worldwide.",
      icon: <Calculator className="text-meal-primary" size={32} />
    },
    {
      title: "Family Mode",
      description: "Plan meals for the whole family with customizable portion sizes.",
      icon: <Users className="text-meal-primary" size={32} />
    },
    {
      title: "Dynamic Disease Addition",
      description: "Add and manage multiple health conditions for personalized nutrition.",
      icon: <Heart className="text-meal-primary" size={32} />
    },
    {
      title: "Recipe Swapping",
      description: "Don't like a suggested recipe? Swap it for alternatives that fit your plan.",
      icon: <Utensils className="text-meal-primary" size={32} />
    },
    {
      title: "Allergy Filtering",
      description: "Complete allergy management with detailed ingredient filtering.",
      icon: <Shield className="text-meal-primary" size={32} />
    },
    {
      title: "Health Goals Tracking",
      description: "Monitor progress towards weight loss, muscle gain, and disease risk reduction.",
      icon: <Heart className="text-meal-primary" size={32} />
    },
    {
      title: "Nutrient Dashboard",
      description: "Comprehensive nutrition tracking with detailed macro and micronutrient analysis.",
      icon: <Calculator className="text-meal-primary" size={32} />
    },
    {
      title: "Calorie/Budget Alerts",
      description: "Stay on track with smart notifications for calories and spending limits.",
      icon: <Smartphone className="text-meal-primary" size={32} />
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-meal-primary text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6 animate-fade-in">
            Personalized, Affordable Meal Plans for Everyone.
          </h1>
          <p className="text-xl md:text-2xl font-roboto text-meal-green-lighter mb-8 max-w-3xl mx-auto">
            Eat better. Feel better. Live better.
          </p>
          <Link
            to="/create-plan"
            className="inline-block bg-meal-accent hover:bg-orange-600 text-white text-lg font-medium px-7 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-meal-light-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-meal-text-dark mb-4">
              How It Works
            </h2>
            <p className="text-xl font-roboto text-meal-subtext max-w-2xl mx-auto">
              Three simple steps to transform your meal planning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold font-poppins text-meal-text-dark mb-4 text-center">
                  {step.title}
                </h3>
                <p className="text-meal-subtext font-roboto text-center leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-meal-text-dark mb-4">
              Powerful Features
            </h2>
            <p className="text-xl font-roboto text-meal-subtext max-w-2xl mx-auto">
              Everything you need for intelligent meal planning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:bg-meal-green-light hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-lg font-semibold font-poppins text-meal-primary ml-3">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-meal-subtext font-roboto leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-meal-green-light">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-meal-text-dark mb-6">
            Ready to Transform Your Meals?
          </h2>
          <p className="text-xl font-roboto text-meal-subtext mb-8 max-w-2xl mx-auto">
            Join thousands of families who are eating healthier, spending less, and feeling better with MealCompass.
          </p>
          <Link
            to="/create-plan"
            className="inline-block bg-meal-accent hover:bg-orange-600 text-white text-lg font-medium px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Create Your Meal Plan
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
