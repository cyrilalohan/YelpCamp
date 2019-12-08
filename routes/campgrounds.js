var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//INDEX
router.get("/", function(req, res){
	Campground.find({}, function(err, campgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});
});

//NEW 
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

//CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var price = req.body.price;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name, image: image, description: desc, price: price, author: author};
	Campground.create(newCampground, function(err, campground){
		if(err){
			console.log(err)
		} else {
			req.flash("success", "Campground added successfully!");
			res.redirect("/campgrounds");
		}
	});
});

//SHOW
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
		if(err){
			console.log(err);
			req.flash("error", "Something went wrong");
			res.redirect("back");
		} else {
			res.render("campgrounds/show", {campground: campground});
		}
	});
});


//EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/edit", {campground: campground})
		}
	});
});

//UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
		if(err){
			req.flash("error", "Something went wrong");
			res.redirect("/campgrounds/" + req.params.id + "edit");
		} else {
			req.flash("success", "Successfully updated campground!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Campground deleted!");
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;