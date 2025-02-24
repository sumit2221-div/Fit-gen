import mongoose from 'mongoose';

const nutritionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  meal: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Nutrition = mongoose.model('Nutrition', nutritionSchema);

export default Nutrition;