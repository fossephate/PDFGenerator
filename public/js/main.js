$(function() {


	// 	$.fn.randomize = function(tree, childElem) {
	// 		return this.each(function() {
	// 			var $this = $(this);
	// 			if (tree) $this = $(this).find(tree);
	// 			var unsortedElems = $this.children(childElem);
	// 			var elems = unsortedElems.clone();

	// 			elems.sort(function() {
	// 				return (Math.round(Math.random()) - 0.5);
	// 			});

	// 			for (var i = 0; i < elems.length; i++)
	// 				unsortedElems.eq(i).replaceWith(elems[i]);
	// 		});
	// 	};
	$.fn.randomize = function(selector) {
		(selector ? this.find(selector) : this).parent().each(function() {
			$(this).children(selector).sort(function() {
				return Math.random() - 0.5;
			}).detach().appendTo(this);
		});

		return this;
	};




	// Multiple images preview in browser
	var imagesPreview = function(input, placeToInsertImagePreview) {

		if (input.files) {
			var filesAmount = input.files.length;

			for (i = 0; i < filesAmount; i++) {
				var reader = new FileReader();

				reader.onload = function(event) {

					var image = new Image();
					//image.height = this.height;
					//image.title = input.files[i].name;
					image.src = event.target.result;

					image.onload = function() {
						if (this.height > 210) {
							this.height = 210;
							//this.width = this.width*0.8;
							//this.height = this.height*0.8;
						}
						if (this.width > 900) {
							var r = 900 / this.width;
							this.width = this.width * r;
							this.height = this.height * r;

						}

						this.width = this.width / 1.1;
						this.height = this.height / 1.1;

					};

					var div = $("<div class='list-group-item'></div>").append(image);
					$(placeToInsertImagePreview).append(div);
					//$(placeToInsertImagePreview).append(image);




					//var br = $.parseHTML('<br>');
					//$(placeToInsertImagePreview).append(br);

				}

				reader.readAsDataURL(input.files[i]);
			}
		}

	};

	$("#add-photos").on('change', function() {
		imagesPreview(this, '#questionsList');

		var options = {
			animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
			// 			handle: ".tile__title", // Restricts sort start click/touch to the specified element
			// 			draggable: ".tile", // Specifies which items inside the element should be sortable
			// 			onUpdate: function(evt /**Event*/ ) {
			// 				var item = evt.item; // the current dragged HTMLElement
			// 			}
		};

		// Simple list
		Sortable.create($("#questionsList")[0], options);



	});
	
	
	


	$("#generatePDF").on("click", function(event) {
		var images = $("#questionsList").children().children();

		var doc = new jsPDF();
		var cHeight = 20;

		console.log(images.length);

		for (var i = 0; i < images.length; i++) {
			var im = images[i];
			if (typeof(im.width) == "undefined") {
				continue;
			}
			
			if (cHeight > 230) {
				doc.addPage();
				cHeight = 20;
			}

			var width = im.width / 5;
			var height = im.height / 5;

			//console.log(cHeight);

			//console.log(im);
			doc.addImage(im.src, 'JPEG', 15, cHeight, width, height);

			cHeight += height + 20;
// 			if (cHeight > 230) {
// 				doc.addPage();
// 				cHeight = 20;
// 			}
			console.log("test");
		}
		
		
		

		doc.save("questions.pdf");
	});

	$("#randomizeImages").on("click", function(event) {
		$("#questionsList").randomize("div");
	});



});