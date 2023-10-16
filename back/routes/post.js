const path = require('path');
const express = require('express');
const router = express.Router();

// const postController = require('../controller/createpost/createpost');
// // 
// router.get("/addpost",postController.getAddPost)
const postController=  require("../controller/post");

router.get('/posts',postController.getNewpost);
router.post("/posts",postController.postNewpost);
router.delete("/posts/:id",postController.deletePost);
router.post("/posts/like/:id",postController.postLikepost);
router.post("/posts/unlike/:id",postController.postunLikepost);
router.post("/posts/comment/:id",postController.postCommentpost);
router.get('/:id',postController.getPost);
router.get("/all_posts",postController.getAllpost);



module.exports = router;