const express = require("express");
const router = express.Router();
const User = require("../../models/Post");

// Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.findAll({
    attributes: ["postId", "postTitle", "postTxt", "usrPseudo"],
  }).catch(errHandler);
  res.json(posts);
});

// Get single post
router.get("/:postId", async (req, res) => {
  const post = await Post.findAll({
    where: {
      postId: req.params.postId,
    },
  }).catch(errHandler);

  if (post && post.length > 0) {
    res.json(post);
  } else {
    res.status(400).json({ msg: "post not found" });
  }
});

// Create post
router.post("/", async (req, res) => {
  const newPost = {
    postTitle: req.body.postTitle,
    postTxt: req.body.postTxt,
  };

  if (!newPost.postTitle || !newPost.postTxt) {
    return res.status(400).json({ msg: "Please include a title and post content" });
  }

  const post = await Post.create(newPost).catch(errHandler);

  if (post) {
    res.json(post);
  } else {
    res.status(500).json({ msg: "internal db error occured" });
  }
});

// Update post
router.put("/:postId", async (req, res) => {
  const post = await Post.findAll({
    where: {
      postId: req.params.postId,
    },
  }).catch(errHandler);

  if (user && user.length > 0) {
    const updPost = req.body;
    const result = await Post.update(
      {
        title: updPost.postTitle ? updPost.postTitle : user[0].postTitle,
        txt: updPost.postTxt ? updPost.postTxt : user[0].postTxt,
      },
      {
        where: {
          postId: req.params.postId,
        },
      }
    ).catch(errHandler);

    res.json({ msg: "post updated", updPost });
  } else {
    res.status(400).json({ msg: "post not found" });
  }
});

// Delete post
router.delete("/:postId", async (req, res) => {
  const post = await Post.findAll({
    where: {
      postId: req.params.postId,
    },
  }).catch(errHandler);

  if (post && post.length > 0) {
    const post = Post.destroy({
      where: {
        postId: req.params.postId,
      },
    });

    res.json({
      msg: "Post deleted",
      post,
    });
  } else {
    res.status(400).json({ msg: "post not found" });
  }
});

// Get all posts with pagination
router.get("/:page/:pageSize", async (req, res) => {
  const page = parseInt(req.params.page);
  const pageSize = parseInt(req.params.pageSize);

  const posts = await Posts.findAll({
    attributes: ["postId", "postTitle", "postTxt", "usrPseudo"],
    ...paginate({ page, pageSize }),
  }).catch(errHandler);

  res.json(posts);
});

// Helpers
const errHandler = (err) => {
  console.log("Error: ", err);
};

const paginate = ({ page, pageSize }) => {
  const offset = page * pageSize;
  const limit = pageSize;

  return {
    offset,
    limit,
  };
};

module.exports = router;

console.log('backend/routes/api/posts.js 🚀');
