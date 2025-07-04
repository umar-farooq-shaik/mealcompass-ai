import { useState } from 'react';
import { Plus, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { generateMealPlan } from '@/services/geminiService';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

const CreatePlan = () => {
  const [budget, setBudget] = useState([2000]);
  const [familyMembers, setFamilyMembers] = useState('');
  const [location, setLocation] = useState('');
  const [dietType, setDietType] = useState('');
  const [allergies, setAllergies] = useState<string[]>([]);
  const [diseases, setDiseases] = useState<string[]>([]);
  const [newDisease, setNewDisease] = useState('');
  const [healthGoal, setHealthGoal] = useState('');
  const [planDuration, setPlanDuration] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const allergenOptions = [
    'Nuts', 'Dairy', 'Eggs', 'Soy', 'Gluten', 'Shellfish', 'Fish', 
    'Sesame', 'Peanuts', 'Tree Nuts', 'Nothing'
  ];

  const addDisease = () => {
    if (newDisease.trim() && !diseases.includes(newDisease.trim())) {
      setDiseases([...diseases, newDisease.trim()]);
      setNewDisease('');
    }
  };

  const removeDisease = (diseaseToRemove: string) => {
    setDiseases(diseases.filter(disease => disease !== diseaseToRemove));
  };

  const toggleAllergy = (allergy: string) => {
    if (allergy === 'Nothing') {
      setAllergies(['Nothing']);
    } else {
      const newAllergies = allergies.includes(allergy)
        ? allergies.filter(a => a !== allergy)
        : [...allergies.filter(a => a !== 'Nothing'), allergy];
      setAllergies(newAllergies);
    }
  };

  const downloadPDF = () => {
    if (!generatedPlan) return;

    const pdf = new jsPDF();
    let yPosition = 20;
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 20;

    // Title
    pdf.setFontSize(20);
    pdf.setFont(undefined, 'bold');
    pdf.text('Your Personalized Meal Plan', margin, yPosition);
    yPosition += 15;

    // Plan details
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Family Members: ${familyMembers}`, margin, yPosition);
    yPosition += 8;
    pdf.text(`Location: ${location}`, margin, yPosition);
    yPosition += 8;
    pdf.text(`Budget: ₹${budget[0]}`, margin, yPosition);
    yPosition += 8;
    pdf.text(`Diet Type: ${dietType}`, margin, yPosition);
    yPosition += 8;
    pdf.text(`Health Goal: ${healthGoal}`, margin, yPosition);
    yPosition += 15;

    // Days
    generatedPlan.days.forEach((dayPlan: any) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      pdf.text(`Day ${dayPlan.day}`, margin, yPosition);
      yPosition += 10;

      Object.entries(dayPlan.meals).forEach(([mealType, meal]: [string, any]) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.setFontSize(12);
        pdf.setFont(undefined, 'bold');
        pdf.text(`${mealType.charAt(0).toUpperCase() + mealType.slice(1)}:`, margin, yPosition);
        yPosition += 6;

        pdf.setFont(undefined, 'normal');
        pdf.text(`${meal.dish}`, margin + 5, yPosition);
        yPosition += 5;
        
        const descriptionLines = pdf.splitTextToSize(meal.description, 160);
        pdf.text(descriptionLines, margin + 5, yPosition);
        yPosition += descriptionLines.length * 5;

        pdf.text(`Calories: ${meal.nutrition.calories} | Protein: ${meal.nutrition.protein}g | Cost: ₹${meal.cost}`, margin + 5, yPosition);
        yPosition += 10;
      });

      yPosition += 5;
    });

    // Grocery List
    if (yPosition > pageHeight - 100) {
      pdf.addPage();
      yPosition = 20;
    }

    pdf.setFontSize(14);
    pdf.setFont(undefined, 'bold');
    pdf.text('Grocery List', margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    generatedPlan.groceryList.forEach((item: any) => {
      if (yPosition > pageHeight - 20) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text(`${item.item} (${item.quantity}) - ₹${item.price}`, margin, yPosition);
      yPosition += 5;
    });

    yPosition += 5;
    pdf.setFont(undefined, 'bold');
    pdf.text(`Total Cost: ₹${generatedPlan.groceryList.reduce((sum: number, item: any) => sum + item.price, 0)}`, margin, yPosition);

    pdf.save('meal-plan.pdf');
    toast.success('PDF downloaded successfully!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const mealPlanRequest = {
        familyMembers,
        location,
        budget: budget[0],
        dietType,
        allergies,
        diseases,
        healthGoal,
        planDuration
      };

      const plan = await generateMealPlan(mealPlanRequest);
      setGeneratedPlan(plan);
      toast.success('Meal plan generated successfully!');
    } catch (error) {
      console.error('Error generating meal plan:', error);
      toast.error('Failed to generate meal plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-meal-light-bg py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-poppins text-meal-text-dark mb-4">
            Create Your Personalized Meal Plan
          </h1>
          <p className="text-xl font-roboto text-meal-subtext">
            Powered by Gemini AI - Tell us about your preferences and we'll create the perfect plan for you
          </p>
        </div>

        <Card className="p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Budget Section - First */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold font-poppins text-meal-text-dark">
                Your Weekly Budget
              </Label>
              <div className="space-y-4">
                <Slider
                  value={budget}
                  onValueChange={setBudget}
                  max={5000}
                  min={500}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-meal-subtext">
                  <span>₹500</span>
                  <span className="text-lg font-semibold text-meal-primary">₹{budget[0]}</span>
                  <span>₹5000</span>
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="family" className="text-sm font-medium">Number of Family Members</Label>
                <Input
                  id="family"
                  type="number"
                  min="1"
                  max="12"
                  value={familyMembers}
                  onChange={(e) => setFamilyMembers(e.target.value)}
                  placeholder="e.g., 4"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, Country"
                  required
                />
              </div>
            </div>

            {/* Diet & Preferences */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold font-poppins text-meal-text-dark">
                Diet & Preferences
              </h3>
              
              {/* Diet Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Diet Type</Label>
                <Select value={dietType} onValueChange={setDietType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your diet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="jain">Jain</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Allergies */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Allergies</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {allergenOptions.map((allergy) => (
                    <button
                      key={allergy}
                      type="button"
                      onClick={() => toggleAllergy(allergy)}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        allergies.includes(allergy)
                          ? 'bg-meal-primary text-white border-meal-primary'
                          : 'bg-white text-meal-text-dark border-gray-200 hover:border-meal-primary'
                      }`}
                    >
                      {allergy}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Disease Section */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Health Conditions</Label>
                <div className="flex gap-2">
                  <Input
                    value={newDisease}
                    onChange={(e) => setNewDisease(e.target.value)}
                    placeholder="Add a health condition"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDisease())}
                  />
                  <Button
                    type="button"
                    onClick={addDisease}
                    variant="outline"
                    size="icon"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                {diseases.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {diseases.map((disease) => (
                      <span
                        key={disease}
                        className="bg-meal-green-light text-meal-text-dark px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {disease}
                        <button
                          type="button"
                          onClick={() => removeDisease(disease)}
                          className="text-meal-error hover:text-red-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Health Goal */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Health Goal</Label>
                <Select value={healthGoal} onValueChange={setHealthGoal} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your health goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                    <SelectItem value="weight-gain">Weight Gain</SelectItem>
                    <SelectItem value="cholesterol-control">Cholesterol Control</SelectItem>
                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                    <SelectItem value="boost-immunity">Boost Immunity</SelectItem>
                    <SelectItem value="reduce-disease-risk">Reduce Disease Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Plan Duration */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Plan Duration</Label>
                <Select value={planDuration} onValueChange={setPlanDuration} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-week">1 Week</SelectItem>
                    <SelectItem value="2-weeks">2 Weeks</SelectItem>
                    <SelectItem value="1-month">1 Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-meal-accent hover:bg-orange-600 text-white text-lg py-6 rounded-lg font-medium transition-colors"
            >
              {isLoading ? 'Generating Your Plan with Gemini AI...' : 'Generate Meal Plan'}
            </Button>
          </form>
        </Card>

        {/* Generated Plan Display */}
        {generatedPlan && (
          <Card className="mt-8 p-6 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-poppins text-meal-text-dark flex justify-between items-center">
                Your Personalized Meal Plan
                <Button 
                  onClick={downloadPDF}
                  className="bg-meal-primary hover:bg-green-600 text-white"
                >
                  <Download size={16} className="mr-2" />
                  Download PDF
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedPlan.days.map((dayPlan: any) => (
                <Collapsible key={dayPlan.day} className="border rounded-lg mb-4">
                  <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left hover:bg-meal-green-light">
                    <h3 className="text-lg font-semibold">Day {dayPlan.day}</h3>
                    <ChevronDown size={20} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 border-t space-y-4">
                    {Object.entries(dayPlan.meals).map(([mealType, meal]: [string, any]) => (
                      <div key={mealType} className="bg-white p-4 rounded-lg border">
                        <h4 className="font-semibold text-meal-primary capitalize mb-2">
                          {mealType === 'snack' ? 'Optional Snack' : mealType}
                        </h4>
                        <h5 className="font-medium text-meal-text-dark">{meal.dish}</h5>
                        <p className="text-meal-subtext text-sm mb-2">{meal.description}</p>
                        {meal.ingredients && (
                          <p className="text-xs text-meal-subtext mb-2">
                            <strong>Ingredients:</strong> {meal.ingredients.join(', ')}
                          </p>
                        )}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                          <span>Calories: {meal.nutrition.calories}</span>
                          <span>Carbs: {meal.nutrition.carbs}g</span>
                          <span>Protein: {meal.nutrition.protein}g</span>
                          <span>Fat: {meal.nutrition.fat}g</span>
                          <span className="font-medium text-meal-primary">Cost: ₹{meal.cost}</span>
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
              
              <div className="mt-6 p-4 bg-meal-green-light rounded-lg">
                <h3 className="text-lg font-semibold text-meal-text-dark mb-3">Consolidated Grocery List</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {generatedPlan.groceryList.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between border-b pb-1">
                      <span>{item.item} ({item.quantity})</span>
                      <span className="font-medium">₹{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-meal-primary">
                  <div className="flex justify-between text-lg font-semibold text-meal-text-dark">
                    <span>Total Grocery Cost:</span>
                    <span className="text-meal-primary">
                      ₹{generatedPlan.groceryList.reduce((sum: number, item: any) => sum + item.price, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-meal-subtext mt-1">
                    <span>Weekly Budget:</span>
                    <span>₹{generatedPlan.totalCost}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CreatePlan;
