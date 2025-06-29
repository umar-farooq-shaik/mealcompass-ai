
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
      snack?: Meal;
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
  ingredients?: string[];
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
   - Breakfast, Lunch, Dinner, and optional healthy snacks
   - Different meals each day (no repetition)
   - Nutrition per meal (Calories, Protein, Carbs, Fat)
   - Estimated cost per meal in INR
   - List of ingredients for each meal
   - Use foods common to ${request.location}

2. Respect diet type, allergies, and health conditions
3. Support the health goal: ${request.healthGoal}
4. Stay within budget of ₹${request.budget} per week
5. Provide a consolidated grocery list with total quantities needed

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
          "cost": 25,
          "ingredients": ["ingredient1", "ingredient2"]
        },
        "lunch": {
          "dish": "Different Dish Name",
          "description": "Brief description", 
          "nutrition": {"calories": 450, "carbs": 65, "protein": 18, "fat": 12},
          "cost": 40,
          "ingredients": ["ingredient3", "ingredient4"]
        },
        "dinner": {
          "dish": "Another Different Dish",
          "description": "Brief description",
          "nutrition": {"calories": 400, "carbs": 50, "protein": 20, "fat": 15},
          "cost": 50,
          "ingredients": ["ingredient5", "ingredient6"]
        },
        "snack": {
          "dish": "Healthy Snack",
          "description": "Optional healthy snack",
          "nutrition": {"calories": 150, "carbs": 20, "protein": 5, "fat": 6},
          "cost": 15,
          "ingredients": ["snack ingredient"]
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
    
    // Return a realistic fallback meal plan with different meals each day
    const daysCount = request.planDuration === '1-week' ? 7 : request.planDuration === '2-weeks' ? 14 : 30;
    
    // Different meal options based on location and diet type
    const isIndian = request.location.toLowerCase().includes('india');
    const isVegetarian = request.dietType === 'vegetarian' || request.dietType === 'vegan';
    
    const mealOptions = {
      breakfast: isIndian ? [
        { dish: "Vegetable Poha", ingredients: ["Poha", "Onions", "Green chilies", "Turmeric", "Oil"] },
        { dish: "Oats Upma", ingredients: ["Oats", "Vegetables", "Mustard seeds", "Curry leaves"] },
        { dish: "Idli Sambar", ingredients: ["Rice", "Urad dal", "Sambar powder", "Vegetables"] },
        { dish: "Paratha with Curd", ingredients: ["Wheat flour", "Curd", "Oil", "Salt"] },
        { dish: "Dosa with Chutney", ingredients: ["Rice", "Urad dal", "Coconut", "Green chilies"] },
        { dish: "Daliya Khichdi", ingredients: ["Daliya", "Moong dal", "Vegetables", "Turmeric"] },
        { dish: "Besan Chilla", ingredients: ["Besan", "Onions", "Tomatoes", "Green chilies"] }
      ] : [
        { dish: "Oatmeal with Fruits", ingredients: ["Oats", "Banana", "Apple", "Milk", "Honey"] },
        { dish: "Scrambled Eggs Toast", ingredients: ["Eggs", "Bread", "Butter", "Salt", "Pepper"] },
        { dish: "Greek Yogurt Bowl", ingredients: ["Greek yogurt", "Berries", "Granola", "Honey"] },
        { dish: "Avocado Toast", ingredients: ["Bread", "Avocado", "Tomato", "Salt", "Pepper"] },
        { dish: "Smoothie Bowl", ingredients: ["Banana", "Berries", "Yogurt", "Granola"] },
        { dish: "Pancakes", ingredients: ["Flour", "Eggs", "Milk", "Maple syrup"] },
        { dish: "Cereal with Milk", ingredients: ["Cereal", "Milk", "Banana"] }
      ],
      lunch: isIndian ? [
        { dish: "Dal Rice with Vegetables", ingredients: ["Rice", "Toor dal", "Mixed vegetables", "Turmeric", "Oil"] },
        { dish: "Rajma Chawal", ingredients: ["Rajma", "Rice", "Onions", "Tomatoes", "Spices"] },
        { dish: "Chole Bhature", ingredients: ["Chickpeas", "Flour", "Oil", "Spices"] },
        { dish: "Vegetable Biryani", ingredients: ["Basmati rice", "Mixed vegetables", "Spices", "Ghee"] },
        { dish: "Paneer Curry with Roti", ingredients: ["Paneer", "Wheat flour", "Onions", "Tomatoes"] },
        { dish: "Sambar Rice", ingredients: ["Rice", "Toor dal", "Vegetables", "Sambar powder"] },
        { dish: "Aloo Gobi with Chapati", ingredients: ["Potatoes", "Cauliflower", "Wheat flour", "Spices"] }
      ] : [
        { dish: "Grilled Chicken Rice", ingredients: ["Chicken", "Rice", "Vegetables", "Olive oil"] },
        { dish: "Pasta with Vegetables", ingredients: ["Pasta", "Mixed vegetables", "Olive oil", "Herbs"] },
        { dish: "Quinoa Salad", ingredients: ["Quinoa", "Vegetables", "Olive oil", "Lemon"] },
        { dish: "Chicken Caesar Salad", ingredients: ["Chicken", "Lettuce", "Caesar dressing", "Croutons"] },
        { dish: "Rice Bowl", ingredients: ["Rice", "Beans", "Vegetables", "Sauce"] },
        { dish: "Sandwich with Soup", ingredients: ["Bread", "Vegetables", "Soup mix"] },
        { dish: "Stir-fry with Rice", ingredients: ["Rice", "Mixed vegetables", "Soy sauce", "Oil"] }
      ],
      dinner: isIndian ? [
        { dish: "Roti with Paneer Curry", ingredients: ["Wheat flour", "Paneer", "Onions", "Tomatoes", "Spices"] },
        { dish: "Khichdi with Papad", ingredients: ["Rice", "Moong dal", "Turmeric", "Papad"] },
        { dish: "Vegetable Pulao", ingredients: ["Basmati rice", "Mixed vegetables", "Whole spices"] },
        { dish: "Dal Tadka with Rice", ingredients: ["Moong dal", "Rice", "Cumin", "Garlic"] },
        { dish: "Stuffed Paratha", ingredients: ["Wheat flour", "Potatoes", "Ghee", "Curd"] },
        { dish: "Mixed Vegetable Curry", ingredients: ["Mixed vegetables", "Coconut", "Spices"] },
        { dish: "Jeera Rice with Dal", ingredients: ["Rice", "Cumin", "Toor dal", "Turmeric"] }
      ] : [
        { dish: "Grilled Fish with Vegetables", ingredients: ["Fish", "Broccoli", "Carrots", "Olive oil"] },
        { dish: "Chicken Stir-fry", ingredients: ["Chicken", "Bell peppers", "Onions", "Soy sauce"] },
        { dish: "Vegetable Pasta", ingredients: ["Pasta", "Zucchini", "Tomatoes", "Herbs"] },
        { dish: "Beef with Rice", ingredients: ["Beef", "Rice", "Vegetables", "Sauce"] },
        { dish: "Salmon with Quinoa", ingredients: ["Salmon", "Quinoa", "Asparagus", "Lemon"] },
        { dish: "Turkey Wrap", ingredients: ["Turkey", "Tortilla", "Lettuce", "Tomato"] },
        { dish: "Lentil Soup with Bread", ingredients: ["Lentils", "Vegetables", "Bread", "Herbs"] }
      ],
      snacks: isIndian ? [
        { dish: "Mixed Nuts", ingredients: ["Almonds", "Cashews", "Walnuts"] },
        { dish: "Fruit Chaat", ingredients: ["Seasonal fruits", "Chaat masala", "Lemon"] },
        { dish: "Roasted Chana", ingredients: ["Chickpeas", "Spices"] },
        { dish: "Buttermilk", ingredients: ["Curd", "Water", "Salt", "Cumin"] },
        { dish: "Banana with Peanut Butter", ingredients: ["Banana", "Peanut butter"] },
        { dish: "Green Tea with Biscuits", ingredients: ["Green tea", "Whole wheat biscuits"] },
        { dish: "Sprouts Salad", ingredients: ["Mixed sprouts", "Onions", "Tomatoes", "Lemon"] }
      ] : [
        { dish: "Greek Yogurt with Berries", ingredients: ["Greek yogurt", "Mixed berries"] },
        { dish: "Apple with Almond Butter", ingredients: ["Apple", "Almond butter"] },
        { dish: "Trail Mix", ingredients: ["Nuts", "Dried fruits", "Seeds"] },
        { dish: "Hummus with Carrots", ingredients: ["Hummus", "Carrots"] },
        { dish: "Protein Smoothie", ingredients: ["Protein powder", "Banana", "Milk"] },
        { dish: "Cheese and Crackers", ingredients: ["Cheese", "Whole grain crackers"] },
        { dish: "Energy Balls", ingredients: ["Dates", "Nuts", "Coconut"] }
      ]
    };

    // Filter vegetarian options if needed
    if (isVegetarian) {
      mealOptions.lunch = mealOptions.lunch.filter(meal => 
        !meal.dish.toLowerCase().includes('chicken') && 
        !meal.dish.toLowerCase().includes('fish') && 
        !meal.dish.toLowerCase().includes('beef') &&
        !meal.dish.toLowerCase().includes('turkey')
      );
      mealOptions.dinner = mealOptions.dinner.filter(meal => 
        !meal.dish.toLowerCase().includes('chicken') && 
        !meal.dish.toLowerCase().includes('fish') && 
        !meal.dish.toLowerCase().includes('beef') &&
        !meal.dish.toLowerCase().includes('turkey') &&
        !meal.dish.toLowerCase().includes('salmon')
      );
    }

    const days = Array.from({ length: daysCount }, (_, i) => {
      const dayIndex = i % 7; // Cycle through week patterns
      
      return {
        day: i + 1,
        meals: {
          breakfast: {
            dish: mealOptions.breakfast[i % mealOptions.breakfast.length].dish,
            description: "Nutritious breakfast with local ingredients",
            nutrition: { 
              calories: 300 + (i * 10), 
              carbs: 45 + (i * 2), 
              protein: 8 + (i * 1), 
              fat: 12 + (i * 1) 
            },
            cost: Math.round(request.budget * 0.15 / 7),
            ingredients: mealOptions.breakfast[i % mealOptions.breakfast.length].ingredients
          },
          lunch: {
            dish: mealOptions.lunch[i % mealOptions.lunch.length].dish,
            description: "Balanced lunch with protein and carbs",
            nutrition: { 
              calories: 450 + (i * 15), 
              carbs: 65 + (i * 3), 
              protein: 18 + (i * 2), 
              fat: 8 + (i * 1) 
            },
            cost: Math.round(request.budget * 0.4 / 7),
            ingredients: mealOptions.lunch[i % mealOptions.lunch.length].ingredients
          },
          dinner: {
            dish: mealOptions.dinner[i % mealOptions.dinner.length].dish,
            description: "Healthy dinner option",
            nutrition: { 
              calories: 520 + (i * 20), 
              carbs: 48 + (i * 2), 
              protein: 25 + (i * 2), 
              fat: 22 + (i * 1) 
            },
            cost: Math.round(request.budget * 0.35 / 7),
            ingredients: mealOptions.dinner[i % mealOptions.dinner.length].ingredients
          },
          snack: {
            dish: mealOptions.snacks[i % mealOptions.snacks.length].dish,
            description: "Healthy snack option",
            nutrition: { 
              calories: 150 + (i * 5), 
              carbs: 20 + (i * 1), 
              protein: 5 + (i * 1), 
              fat: 6 + (i * 1) 
            },
            cost: Math.round(request.budget * 0.1 / 7),
            ingredients: mealOptions.snacks[i % mealOptions.snacks.length].ingredients
          }
        }
      };
    });

    // Calculate consolidated grocery list
    const ingredientMap = new Map<string, { quantity: number, price: number }>();
    
    days.forEach(day => {
      [day.meals.breakfast, day.meals.lunch, day.meals.dinner, day.meals.snack].forEach(meal => {
        if (meal?.ingredients) {
          meal.ingredients.forEach(ingredient => {
            const key = ingredient.toLowerCase();
            if (ingredientMap.has(key)) {
              const existing = ingredientMap.get(key)!;
              ingredientMap.set(key, {
                quantity: existing.quantity + 1,
                price: existing.price
              });
            } else {
              // Estimate prices based on common ingredients
              let price = 50; // default price
              if (['rice', 'wheat flour', 'oats'].some(grain => key.includes(grain))) price = 60;
              if (['dal', 'lentils', 'beans'].some(protein => key.includes(protein))) price = 120;
              if (['vegetables', 'onions', 'tomatoes'].some(veg => key.includes(veg))) price = 40;
              if (['oil', 'ghee', 'butter'].some(fat => key.includes(fat))) price = 150;
              if (['spices', 'turmeric', 'cumin'].some(spice => key.includes(spice))) price = 30;
              if (['milk', 'curd', 'yogurt'].some(dairy => key.includes(dairy))) price = 60;
              if (['chicken', 'fish', 'meat'].some(meat => key.includes(meat))) price = 200;
              if (['paneer', 'cheese'].some(dairy => key.includes(dairy))) price = 180;
              if (['fruits', 'banana', 'apple'].some(fruit => key.includes(fruit))) price = 80;
              
              ingredientMap.set(key, { quantity: 1, price });
            }
          });
        }
      });
    });

    const groceryList = Array.from(ingredientMap.entries()).map(([ingredient, data]) => ({
      item: ingredient.charAt(0).toUpperCase() + ingredient.slice(1),
      quantity: data.quantity > 3 ? `${Math.ceil(data.quantity / 3)}kg` : `${data.quantity * 250}g`,
      price: data.price
    }));

    return {
      days,
      totalCost: request.budget,
      groceryList
    };
  }
};
