var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/", (req, res) => {
	Campground.find({}, (err, campgrounds) => {
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});
});

router.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

router.post("/", middleware.isLoggedIn, (req, res) => {
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var price = req.body.price;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name, image: image, description: desc, price: price, author: author};
	Campground.create(newCampground, (err, campground) => {
		if(err){
			console.log(err)
		} else {
			req.flash("success", "Campground added successfully!");
			res.redirect("/campgrounds");
		}
	});
});

router.get("/:id", (req, res) => {
	Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
		if(err){
			console.log(err);
			req.flash("error", "Something went wrong");
			res.redirect("back");
		} else {
			res.render("campgrounds/show", {campground: campground});
		}
	});
});



router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/edit", {campground: campground})
		}
	});
});

router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
		if(err){
			req.flash("error", "Something went wrong");
			res.redirect("/campgrounds/" + req.params.id + "edit");
		} else {
			req.flash("success", "Successfully updated campground!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, err => {
		if(err){
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Campground deleted!");
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;