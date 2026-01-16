const mongoose = require("mongoose");

const MODELNAME = "attendee";

const Schema = new mongoose.Schema(
  {
    event_id: { type: String, required: true },
    user_id: { type: String, required: true },

    name: { type: String, required: true },
    email: { type: String, required: true },

    event_title: { type: String, required: true },
    event_start_date: { type: Date, required: true },
    event_end_date: { type: Date },
    event_city: { type: String },
    event_country: { type: String },
    event_venue: { type: String },
    event_image_url: { type: String },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "checked_in"],
      default: "confirmed",
    },

    ticket_number: { type: String, unique: true },
    qr_code: { type: String },

    payment_status: {
      type: String,
      enum: ["free", "pending", "paid", "refunded"],
      default: "free",
    },
    payment_amount: { type: Number, default: 0 },
    payment_id: { type: String },

    checked_in_at: { type: Date },

    notes: { type: String },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

Schema.index({ event_id: 1, user_id: 1 }, { unique: true });

const OBJ = mongoose.model(MODELNAME, Schema);
module.exports = OBJ;
