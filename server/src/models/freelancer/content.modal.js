import mongoose from "mongoose";
const ContentSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    whatsappNo: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Content = mongoose.model("content", ContentSchema);
export default Content;
