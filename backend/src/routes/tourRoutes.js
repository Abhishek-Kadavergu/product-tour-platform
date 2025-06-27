// src/routes/tourRoutes.js
import express from "express";
import Tour from "../models/Tour.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create new tour
router.post("/", protect, async (req, res) => {
  const { title, steps, isPublic } = req.body;

  try {
    const newTour = new Tour({
      user: req.user._id,
      title,
      isPublic,
      steps,
    });

    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all tours by logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const tours = await Tour.find({ user: req.user._id });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single tour by ID (public or owner)
router.get("/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    // If private and not owner
    if (
      !tour.isPublic &&
      (!req.user || tour.user.toString() !== req.user._id.toString())
    ) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // Increase view count
    tour.views += 1;
    await tour.save();

    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a tour
router.delete("/:id", protect, async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    if (tour.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await tour.deleteOne();
    res.json({ message: "Tour deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a tour
router.put("/:id", protect, async (req, res) => {
  const { title, steps, isPublic } = req.body;

  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    if (tour.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    tour.title = title || tour.title;
    tour.isPublic = isPublic !== undefined ? isPublic : tour.isPublic;
    tour.steps = steps || tour.steps;

    const updatedTour = await tour.save();
    res.json(updatedTour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
