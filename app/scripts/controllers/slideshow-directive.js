"use strict";
var appDirectives = angular.module('appDirectives', []);

appDirectives.directive('slideshowLazy', ['$compile', function($compile) {

  return {
    restrict: 'E',
    scope: {
	  data: '=imageData'
	},
    compile: function(tElement, tAttributes) {
    
    	return function(scope, iElement, iAttributes, containerCtrl) {
    console.log('scope', scope);	
	    	var currentIndex = 0;
	    	var totalSlides = scope.data.length;
	    	var animating = false;
	    	var tpl = '<div class="slideshow-container">';
	    	tpl += '<ul class="slideshow">';
	    	
	    	angular.forEach(scope.data,function(image,index) {
		    	tpl += '<li class="slideshow-item"><div><img slideshow-src="'+image.path+'" alt="'+image.name+'" /></div></li>';
		    		
	    	})
	    	
	    	tpl += "</ul>";
	    	
	    	tpl += '<div class="slideshow-controls">' +
                '  <span class="slideshow-control slideshow-control-prev" ng-click="goToPrev()">&lsaquo;</span>' +
                '  <span class="slideshow-control slideshow-control-next" ng-click="goToNext()">&rsaquo;</span>' +
                '</div>';
            
            tpl += '</div>'
            
            iElement.append($compile(angular.element(tpl))(scope));
				    	
	    	var slides = iElement[0].querySelectorAll("li");
	    	var slides2 = angular.element(iElement[0].querySelectorAll("li"));
	    	angular.element(iElement[0].querySelector('.current'))
	    	
	    	if (slides.length > 0) {
		    	
		    	angular.element(slides[slides.length-1]).addClass("prev");
	    	
		    	var prevImage = angular.element(slides[slides.length-1]).find("img");
		    	loadImage(prevImage);
		    	
		    	angular.element(slides[0]).addClass("current");
	    	
		    	var currentImage = angular.element(slides[0]).find("img");
		    	loadImage(currentImage);
		    		    	
		    	angular.element(slides[1]).addClass("next");
		    	
		    	var nextImage = angular.element(slides[1]).find("img");
		    	loadImage(nextImage);
		    		
	    	}
	    		    				
    		scope.goToNext = function() {
	    		
	    		var index = currentIndex;
	    		
	    		//console.log("Go to next slide");
	    		if(currentIndex < totalSlides-1) {
		    		index ++;
					
	    		}
	    		else {
		    		index = 0;
	    		}
	    		
	    		goToSlide(index);	
	    		
    		}
    		
    		scope.goToPrev = function() {
	    		
	    		var index = currentIndex;
	    		
	    		//console.log("Go to previous slide");
	    		if(currentIndex > 0) {
		    		index --;	
	    		}
	    		else {
		    		index = slides.length - 1;
		    		//console.log(currentIndex)
	    		}
	    		
	    		goToSlide(index);	
    		}
    		
    		function goToSlide(index) {
    			
    			//console.log("Go to slide " + index);
    			
    			//check if the carrousel already is animating
    			if(animating) {
    				//console.error("already animating");
	    			return;
    			}
    			else {
	    			animating = true;
	    			currentIndex = index;
    			}
    			
    			    			    			
    			//TODO - find a better way to remove class names
    			angular.forEach(slides,function(slide,index){
	    				angular.element(slide).removeClass("current prev next");
    			})
    			
    			if(index < totalSlides && index >= 0) {
    				
    				angular.element(slides[index]).addClass("current");
    				
    				var current = slides[index];    				

    				angular.element(current).bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
                			transitionDone();
              			});
					
    			}
    			else {
	    			//console.error("Image index out of range");
    			}
    			
    			if(index < totalSlides-1) {
	    			angular.element(slides[index+1]).addClass("next");
	    			var image = angular.element(slides[index+1]).find("img");
					loadImage(image);
    			}
    			else {
	    			angular.element(slides[0]).addClass("next");
	    			var image = angular.element(slides[index+1]).find("img");
					loadImage(image);
    			}
    			
    			if(index > 0) {
	    			angular.element(slides[index-1]).addClass("prev");
	    			var image = angular.element(slides[index-1]).find("img");
					loadImage(image);
    			}
    			else {
	    			angular.element(slides[slides.length-1]).addClass("prev");
	    			var image = angular.element(slides[index-1]).find("img");
					loadImage(image);
    			}
    			
    		}
    		
    		function loadImage(element) {
	    		
	    		if(element.attr('src') === undefined && element.attr("slideshow-src") != undefined) {

			    	element.attr('src',element.attr("slideshow-src"));
			    	
		    	}
	    		
    		}
    		
    		function transitionDone() {
				
				animating = false;
				
				var current = slides[currentIndex];    			
				
				current.removeEventListener('webkitTransitionEnd', function(){transitionDone()});
				current.removeEventListener('oTransitionEnd', function(){transitionDone()});
				current.removeEventListener('transitionEnd', function(){transitionDone()});
				
			}
    		
    	}
    	
    }
  };
}])
;