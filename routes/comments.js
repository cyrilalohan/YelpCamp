var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/new", middleware.isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

router.post("/", middleware.isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err)
		} else {
			Comment.create(req.body.comment, (err, comment) => {
				comment.author.id = req.user._id;
				comment.author.username = req.user.username;
				comment.save();
				campground.comments.push(comment);
				campground.save((err, campground) =>{
					if(err){
						console.log(err);
					} else {
						res.redirect("/campgrounds/" + req.params.id);
					}
				});
			});
		}
	});
});

router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req,res) => {
	Comment.findById(req.params.comment_id, (err, comment) => {
		if(err){
			res.redirect("back");
		} else{
			res.render("comments/edit", {campground_id: req.params.id, comment: comment});
		}
	});
});

router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, err => {
		if(err){
			res.redirect("back");
		} else {
			req.flash("error", "Deleted a comment!");
			res.redirect("back");
		}
	});
});

module.exports = router;