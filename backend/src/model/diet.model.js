import mongoose from 'mongoose';

const dietPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mealPlans: [
    {
      mealType: { type: String, required: true }, 
      foods: [
        {
          name: { type: String, required: true },
          quantity: { type: String }, 
          calories: { type: Number },
          protein: { type: Number },
          carbs: { type: Number },
          fat: { type: Number },
        }
      ],
    }
  ],
  goal: { 
    type: String, 
    required: true,  
  },
  dateCreated: { type: Date, default: Date.now },
});

const DietPlan = mongoose.model('DietPlan', dietPlanSchema);

export default DietPlan;