import mongoose from "mongoose";

const entitySchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "Each entity must have a unique url"],
      unique: true,
    },
    burnAfterRead: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      required: [true, "Each entity must have a content String"],
      validator: {
        validate: function (content) {
          return content !== "";
        },
        message: "content cannot be empty",
      },
    },
    title: {
      type: String,
      required: [true, "Each entity must have a title string"],
      validator: {
        validate: function (title) {
          return title !== "";
        },
        message: "title cannot be empty",
      },
    },
    contentType: {
      type: String,
      required: [true, "Content type must be set to a valid value"],
      validate: {
        validator: function (contentType) {
          const validContentTypes = ["Cpp", "Java", "Go", "C", "Text"];
          return validContentTypes.includes(contentType);
        },
        message:
          "Invalid contentType, valid values are: C, Cpp, Go, Java, Text",
      },
    },
    expiresAfter: {
      type: Date,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    }
  },
  { timestamps: true, collection: "entities" },
);

entitySchema.index({ expiresAfter: 1 }, { expireAfterSeconds: 0 });

entitySchema.pre("save", function (next) {
  if (this.expiresAfter <= this.createdAt) {
    return next(new Error("expiresAfter should succeed createdAt"));
  }
  next();
});

entitySchema.method("toJSON", function () {
  const { __v, _id, ...Object } = this.toObject();
  Object.id = _id;
  return Object;
});

const Entity = mongoose.model("entity", entitySchema);
export default Entity;
