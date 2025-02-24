import mongoose from "mongoose";

const WorkoutPlanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    planName: { type: String, required: true },
    goal: { type: String, required: true },
    planDetails: [
        {
            day: { type: Number, required: true },
            title: { type: String, required: true },
            exercises: [
                {
                    name: { type: String, required: true },
                    sets: { type: Number, required: true },
                    reps: { type: String, required: true }
                }
            ]
        }
    ]
}, { timestamps: true });

export default mongoose.model("WorkoutPlan", WorkoutPlanSchema);
