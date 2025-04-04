import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },

    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: 0,
      max: 1000,
    },

    currency: {
      type: String,
      enum: ["USD", "INR", "EUR"],
      default: "INR",
    },

    frequency: { type: String, enum: ["daily", "weekly", "monthly", "yearly"] },

    category: {
      type: String,
      enum: ["sports", "news", "entertainment", "lifestyle"],
      required: true,
    },

    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },

    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          value > this.startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    // This piece of code just updates the number of days the the renewal date will come in
    // So if a subscription was bought on Jan 1, and it's frequency is monthly-> 30 days, then:
    // This piece of code will keep on increasing and adding up the days
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});
const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
