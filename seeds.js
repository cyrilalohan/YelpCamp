var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Camp Omaha",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF-0U-oPd2PJn8BdCi3MjZCr-H85U2YgHJh96-sF9Laq503QTF_w&s",
		description: "Beautiful, austere, serene."
	},
	
	{
		name: "Gothos' Folly",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDl0ptzAB--J05dR4NQPAmuqIH6P3ZkAjC1p-SyQSgM7xNG4NYag&s",
		description: "Final resting place of the great Jaghut."
	},
	
	{
		name: "Fineshade Wood",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREqvXUeOM6rex_e8kozCBGzmLB-y-7l9I8NTTvWTE_5c607F5X7Q&s",
		description: "Cheapest campsite this side of sanity."
	}
];

function seedDB(){
	Campground.deleteMany({}, function(err){
		if(err){
			console.log(err);
		} else {
			console.log("removed campgrounds!");
			// data.forEach(data => {
			// 	Campground.create(data, (err, camp) => {
			// 		if(err){
			// 			console.log(err);
			// 		} else {
			// 			console.log("added a new campground!");
			// 			Comment.create({
			// 				text: "Camping sucks balls",
			// 				author: "Daria"
			// 			}, (err, comment) => {
			// 				if(err){
			// 					console.log(err);
			// 				} else {
			// 					camp.comments.push(comment);
			// 					camp.save((err, camp) => {
			// 						if(err){
			// 							console.log(err);
			// 						}
			// 					});
			// 				}
			// 			});
			// 		}
			// 	});
			// });
		}
	});
}

module.exports = seedDB;

