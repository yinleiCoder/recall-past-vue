module.exports = (app) => {
  const express = require("express");
  const router = express.Router({
    mergeParams: true,
  });
  const jwt = require("jsonwebtoken");
  const assert = require("http-assert");
  require("express-async-errors");
  const User = require("../models/User");
  const Post = require("../models/Post");
  const Comment = require("../models/Comment");

  router.get("/", async (req, res) => {
    const { per_page = 10 } = req.query;
    const page = Math.max(req.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    const fuzzyMatch = new RegExp(req.query.q);
    const items = await req.Model.find({
      $or: [
        { title: fuzzyMatch },
        { name: fuzzyMatch },
        { description: fuzzyMatch },
      ],
    })
      .limit(perPage)
      .skip(page * perPage);
    res.send(items);
  });

  router.get("/:id", async (req, res) => {
    const { fields } = req.query;
    const selectFields = fields
      .split(";")
      .filter((f) => f)
      .map((f) => ` +${f}`)
      .join("");
    const items = await req.Model.findById(req.params.id).select(selectFields);
    res.send(items);
  });

  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });

  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id);
    res.send(model);
  });

  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
    });
  });

  const authMiddleware = require("../middleware/auth");

  const resourceMiddleware = require("../middleware/resource");

  app.use("/api/rest/:resource", authMiddleware(), resourceMiddleware(), router);

  const multer = require("multer");
  const upload = multer({ dest: __dirname + "/../uploads" });
  //https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
  app.post(
    "/api/upload",
    authMiddleware(),
    upload.single("file"),
    async (req, res) => {
      const file = req.file;
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    }
  );

  app.post("/api/login", async (req, res) => {
    const { name, password } = req.body;
    const user = await User.findOne({ name }).select("+password");
    assert(user, 422, "用户不存在");
    const isValid = require("bcrypt").compareSync(password, user.password);
    assert(isValid, 422, "密码错误");
    const token = jwt.sign(
      {
        id: user._id,
      },
      app.get("secret")
    );
    res.send({ token });
  });

  app.post("/api/signup", async (req, res) => {
    const model = await User.create(req.body);
    res.send(model);
  })

  // 某个用户的关注列表
  app.get("/api/:id/following", async (req, res) => {
    const user = await User.findById(req.params.id)
      .select("+following")
      .populate("following");
    assert(user, 422, "用户不存在");
    res.send(user.following);
  });

  // 当前登录的用户关注某人
  app.put("/api/following/:id", authMiddleware(), async (req, res) => {
    const me = await User.findById(req.user._id).select("+following");
    if (!me.following.map((id) => id.toString()).includes(req.params.id)) {
      me.following.push(req.params.id);
      me.save();
    }
    res.send({
      success: true,
    });
  });

  // 当前登录的用户取消关注某人
  app.delete("/api/unfollowing/:id", authMiddleware(), async (req, res) => {
    const me = await User.findById(req.user._id).select("+following");
    const index = me.following
      .map((id) => id.toString())
      .indexOf(req.params.id);
    if (index > -1) {
      me.following.splice(index, 1);
      me.save();
    }
    res.send({
      success: true,
    });
  });

  // 某个用户的粉丝列表
  app.get("/api/:id/followers", async (req, res) => {
    const users = await User.find({ following: req.params.id });
    res.send(users);
  });

  // 某个用户喜欢的帖子列表
  app.get("/api/:id/likingPosts", async (req, res) => {
    const user = await User.findById(req.params.id)
      .select("+likingPosts")
      .populate("likingPosts");
    assert(user, 422, "用户不存在");
    res.send(user.likingPosts);
  });

  // 当前登录的用户赞帖子
  app.put("/api/likingPosts/:id", authMiddleware(), async (req, res) => {
    const me = await User.findById(req.user._id).select("+likingPosts");
    if (!me.likingPosts.map((id) => id.toString()).includes(req.params.id)) {
      me.likingPosts.push(req.params.id);
      me.save();
      await Post.findByIdAndUpdate(req.params.id, { $inc: { voteCount: 1 } });
    }
    res.send({
      success: true,
    });
  });

  // 当前登录的用户取消赞帖子
  app.delete("/api/unlikingPosts/:id", authMiddleware(), async (req, res) => {
    const me = await User.findById(req.user._id).select("+likingPosts");
    const index = me.likingPosts
      .map((id) => id.toString())
      .indexOf(req.params.id);
    if (index > -1) {
      me.likingPosts.splice(index, 1);
      me.save();
      await Post.findByIdAndUpdate(req.params.id, { $inc: { voteCount: -1 } });
    }
    res.send({
      success: true,
    });
  });

  // 创建评论
  app.post("/api/post/:postId/comment", authMiddleware(), async (req, res) => {
    const commentator = req.user._id;
    const { postId } = req.params;
    const comment = await new Comment({
      ...req.body,
      commentator,
      postId,
    }).save();
    res.send(comment);
  });

  // 查询某条帖子下的评论
  app.get("/api/post/:postId/comment", async (req, res) => {
    const { postId } = req.params;
    const { rootCommentId } = req.query;
    const comment = await Comment.find({
      postId,
      rootCommentId
    }).populate("commentator replyTo");
    res.send(comment);
  });

  app.use(async (err, req, res, next) => {
    // console.error(err.stack);
    res.status(err.statusCode || 500).send({
      message: err.message,
    });
  });
};
