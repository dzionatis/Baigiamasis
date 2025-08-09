import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question_text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Question", questionSchema);
