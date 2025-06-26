// src/models/Tour.js
import mongoose from "mongoose";

const stepSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  position: Number,
});

const tourSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    isPublic: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    steps: [stepSchema],
  },
  { timestamps: true }
);

const Tour = mongoose.model("Tour", tourSchema);
export default Tour;
