import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const Post = mongoose.model("Post", PostSchema);

export default Post;