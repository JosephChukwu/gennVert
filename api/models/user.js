const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    profileimage: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png",
    },
    password: { type: String, min: 6, required: true },
    referralCode: { type: String },
    whatsapp: { type: Number, min: 14, required: true, unique: true },

    // allLodges: [{ type: mongoose.Types.ObjectId, ref: "Lodge" }],
    campus: {
      type: String,
      enum: ["UNN", "UNEC"],
      // default: "UNEC",
      required: true,
    },

    //bank details
    nameofbank: { type: String },
    bankno: { type: Number, min: 10, max: 10 },
    bankname: { type: String },

    //tasks and points
    tasksCompleted: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    referrals: { type: Number, default: 0 },
    daysActive: { type: Number, default: 0 },
    referrer: { type: String },
    // level: { type: Number, virtual: true },
  },
  { timestamps: true }
);
// UserSchema.virtual('level').get(function() {
//   // Divide points by 50, round up to the nearest whole number
//   return Math.ceil(this.points / 50);
// });

module.exports = mongoose.model("User", UserSchema);
