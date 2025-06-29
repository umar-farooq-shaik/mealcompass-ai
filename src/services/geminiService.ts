
interface MealPlanRequest {
  familyMembers: string;
  location: string;
  budget: number;
  dietType: string;
  allergies: string[];
  diseases: string[];
  healthGoal: string;
  planDuration: string;
}

interface MealPlan {
  days: {
    day: number;
    meals: {
      breakfast: Meal;
      lunch: Meal;
      dinner: Meal;
    };
  }[];
  totalCost: number;
  groceryList: {
    item: string;
    quantity: string;
    price: number;
  }[];
}

interface Meal {
  dish: string;
  description: string;
  nutrition: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  };
  cost: number;
}

export const generateMealPlan = async (request: MealPlanRequest): Promise<MealPlan> => {
  const prompt = `
You are a professional dietitian and nutritionist. Generate a detailed meal plan based on these user inputs:

**User Details:**
- Location: ${request.location}
- Weekly Budget: ₹${request.budget}
- Diet Type: ${request.dietType}
- Number of Family Members: ${request.familyMembers}
- Health Conditions: ${request.diseases.join(', ') || 'None'}
- Allergies: ${request.allergies.join(', ') || 'None'}
- Health Goal: ${request.healthGoal}
- Duration: ${request.planDuration}

**Instructions:**
1. Create a daily plan for ${request.planDuration === '1-week' ? '7 days' : request.planDuration === '2-weeks' ? '14 days' : '30 days'} with:
   - Breakfast, Lunch, Dinner
   - Nutrition per meal (Calories, Protein, Carbs, Fat)
   - Estimated cost per meal in INR
   - Use foods common to ${request.location}

2. Respect diet type, allergies, and health conditions
3. Support the health goal: ${request.healthGoal}
4. Stay within budget of ₹${request.budget} per week
5. Provide a grocery list with costs

Return ONLY a valid JSON object in this exact format:
{
  "days": [
    {
      "day": 1,
      "meals": {
        "breakfast": {
          "dish": "Dish Name",
          "description": "Brief description",
          "nutrition": {"calories": 300, "carbs": 45, "protein": 12, "fat": 8},
          "cost": 25
        },
        "lunch": {
          "dish": "Dish Name",
          "description": "Brief description", 
          "nutrition": {"calories": 450, "carbs": 65, "protein": 18, "fat": 12},
          "cost": 40
        },
        "dinner": {
          "dish": "Dish Name",
          "description": "Brief description",
          "nutrition": {"calories": 400, "carbs": 50, "protein": 20, "fat": 15},
          "cost": 50
        }
      }
    }
  ],
  "totalCost": ${request.budget},
  "groceryList": [
    {"item": "Rice", "quantity": "2kg", "price": 120},
    {"item": "Lentils", "quantity": "1kg", "price": 180}
  ]
}
`;

  try {
    // For now, we'll use a mock response since we don't have Gemini API key
    // In production, you would make the actual API call here
    const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${GEMINI_API_KEY}` // You would need to add this
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate meal plan');
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Parse the JSON response
    const cleanedText = generatedText.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanedText);
    
  } catch (error) {
    console.error('Error generating meal plan:', error);
    
    // Return a fallback meal plan
    const daysCount = request.planDuration === '1-week' ? 7 : request.planDuration === '2-weeks' ? 14 : 30;
    const days = Array.from({ length: daysCount }, (_, i) => ({
      day: i + 1,
      meals: {
        breakfast: {
          dish: request.location.toLowerCase().includes('india') ? "Vegetable Poha" : "Oatmeal with Fruits",
          description: "Nutritious breakfast with local ingredients",
          nutrition: { calories: 320, carbs: 45, protein: 8, fat: 12 },
          cost: Math.round(request.budget * 0.15 / 7)
        },
        lunch: {
          dish: request.location.toLowerCase().includes('india') ? "Dal Rice with Vegetables" : "Grilled Chicken with Rice",
          description: "Balanced lunch with protein and carbs",
          nutrition: { calories: 450, carbs: 65, protein: 18, fat: 8 },
          cost: Math.round(request.budget * 0.4 / 7)
        },
        dinner: {
          dish: request.location.toLowerCase().includes('india') ? "Roti with Paneer Curry" : "Pasta with Vegetables",
          description: "Healthy dinner option",
          nutrition: { calories: 520, carbs: 48, protein: 25, fat: 22 },
          cost: Math.round(request.budget * 0.45 / 7)
        }
      }
    }));

    return {
      days,
      totalCost: request.budget,
      groceryList: [
        { item: "Rice", quantity: "2kg", price: 120 },
        { item: "Lentils", quantity: "1kg", price: 180 },
        { item: "Vegetables", quantity: "3kg", price: 200 },
        { item: "Cooking Oil", quantity: "1L", price: 150 },
        { item: "Spices", quantity: "Mixed", price: 100 }
      ]
    };
  }
};
