
import { useState } from 'react';
import { Plus, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockPlan = {
        days: [
          {
            day: 1,
            meals: {
              breakfast: {
                dish: "Vegetable Upma",
                description: "Nutritious semolina porridge with mixed vegetables",
                nutrition: { calories: 320, carbs: 45, protein: 8, fat: 12 },
                cost: 25
              },
              lunch: {
                dish: "Dal Rice with Vegetables",
                description: "Traditional lentil curry with steamed rice and seasonal vegetables",
                nutrition: { calories: 450, carbs: 65, protein: 18, fat: 8 },
                cost: 40
              },
              dinner: {
                dish: "Roti with Paneer Curry",
                description: "Whole wheat flatbread with cottage cheese curry",
                nutrition: { calories: 520, carbs: 48, protein: 25, fat: 22 },
                cost: 60
              }
            }
          }
        ],
        totalCost: budget[0],
        groceryList: [
          { item: "Rice", quantity: "2kg", price: 120 },
          { item: "Lentils", quantity: "1kg", price: 180 },
          { item: "Vegetables", quantity: "3kg", price: 200 }
        ]
      };
      setGeneratedPlan(mockPlan);
      setIsLoading(false);
    }, 2000);
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
              {isLoading ? 'Generating Your Plan...' : 'Generate Meal Plan'}
            </Button>
          </form>
        </Card>

        {/* Generated Plan Display */}
        {generatedPlan && (
          <Card className="mt-8 p-6 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-poppins text-meal-text-dark flex justify-between items-center">
                Your Personalized Meal Plan
                <Button className="bg-meal-primary hover:bg-green-600 text-white">
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
                        <h4 className="font-semibold text-meal-primary capitalize mb-2">{mealType}</h4>
                        <h5 className="font-medium text-meal-text-dark">{meal.dish}</h5>
                        <p className="text-meal-subtext text-sm mb-2">{meal.description}</p>
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
                <h3 className="text-lg font-semibold text-meal-text-dark mb-3">Grocery List</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {generatedPlan.groceryList.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.item} ({item.quantity})</span>
                      <span className="font-medium">₹{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-meal-primary">
                  <div className="flex justify-between text-lg font-semibold text-meal-text-dark">
                    <span>Weekly Estimated Cost:</span>
                    <span className="text-meal-primary">₹{generatedPlan.totalCost}</span>
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
