'use strict';
var appDirectives = angular.module('jerk.fewo.slideshow.directive', []);

appDirectives.directive('slideshowLazy', ['$compile', function($compile) {

  return {
    restrict: 'E',
    scope: {
	  data: '=imageData'
	},
    compile: function() {
    
    	return function(scope, iElement) {
	    	var currentIndex = 0;
	    	var totalSlides = scope.data.length;
	    	var animating = false;
	    	var html = '<div class="slideshow-container">';
	    	html += '<ul class="slideshow">';
	    	
	    	angular.forEach(scope.data,function(image) {
		    	html += '<li class="slideshow-item"><div><img slideshow-src="' + image.path + '" alt="' + image.name + '"class="img-responsive"/></div></li>';

				
				
	    	});
	    	
	    	html += '</ul>';
	    	
	    	html += '<div class="slideshow-controls">' +
                '  <span class="slideshow-control slideshow-control-prev" ng-click="goToPrev()">&lsaquo;</span>' +
                '  <span class="slideshow-control slideshow-control-next" ng-click="goToNext()">&rsaquo;</span>' +
                '</div>';
            
            html += '</div>';
            
            iElement.append($compile(angular.element(html))(scope));
			
    		function loadImage(element) {
	    		
	    		if(element.attr('src') === undefined && element.attr('slideshow-src') !== undefined) {
			    	element.attr('src', element.attr('slideshow-src'));		    	
		    	}	    		
    		}

	    	var slides = iElement[0].querySelectorAll('li');
	    	angular.element(iElement[0].querySelector('.current'));
	    	
	    	if (slides.length > 0) {
		    	
		    	angular.element(slides[slides.length-1]).addClass('prev');
	    	
		    	var prevImage = angular.element(slides[slides.length-1]).find('img');
		    	loadImage(prevImage);
		    	
		    	angular.element(slides[0]).addClass('current');
	    	
		    	var currentImage = angular.element(slides[0]).find('img');
		    	loadImage(currentImage);
		    		    	
		    	angular.element(slides[1]).addClass('next');
		    	
		    	var nextImage = angular.element(slides[1]).find('img');
		    	loadImage(nextImage);
		    		
	    	}
	    		    				
    		scope.goToNext = function() {
	    		var index = currentIndex;
	    		if(currentIndex < totalSlides-1) {
		    		index ++;					
	    		}
	    		else {
		    		index = 0;
	    		}
	    		
	    		goToSlide(index);
    		};
    		
    		scope.goToPrev = function() {	    		
	    		var index = currentIndex;
	    		if(currentIndex > 0) {
		    		index --;	
	    		}
	    		else {
		    		index = slides.length - 1;
	    		}
	    		
	    		goToSlide(index);	
    		};
    		
    		function goToSlide(index) {
    			if(animating) {
	    			return;
    			}
    			else {
	    			animating = true;
	    			currentIndex = index;
    			}
    			angular.forEach(slides,function(slide){
	    				angular.element(slide).removeClass('current prev next');
    			});
    			
    			if(index < totalSlides && index >= 0) {
    				
    				angular.element(slides[index]).addClass('current');
    				
    				var current = slides[index];    				

    				angular.element(current).bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
                			transitionDone();
              			});
					
    			}
    			else {
    			}
    			
    			if(index < totalSlides-1) {
	    			angular.element(slides[index+1]).addClass('next');
	    			var image = angular.element(slides[index+1]).find('img');
					loadImage(image);
    			}
    			else {
	    			angular.element(slides[0]).addClass('next');
	    			var image = angular.element(slides[index+1]).find('img');
					loadImage(image);
    			}
    			
    			if(index > 0) {
	    			angular.element(slides[index-1]).addClass('prev');
	    			var image = angular.element(slides[index-1]).find('img');
					loadImage(image);
    			}
    			else {
	    			angular.element(slides[slides.length-1]).addClass('prev');
	    			var image = angular.element(slides[index-1]).find('img');
					loadImage(image);
    			}
    			sliderheight();
    		}
			
			function sliderheight(){
				var divHeight = $('li.slideshow-item.current div img').height(); 
				var divWidth = $('li.slideshow-item.current div img').width();
				$('.slideshow-item.current').css({'height': divHeight, 'width': divWidth}); 
				//$('ul.slideshow').css({'height': divHeight, 'width': divWidth});
				$('.slideshow-controls').css({'height': divHeight, 'width': divWidth});
				$('.slideshow-control').css({'height': divHeight, 'line-height': divHeight + 'px'});
				console.log('Setting width/height to: ' + divWidth + '/' + divHeight);
			}
    		    		
    		function transitionDone() {
				
				animating = false;
				
				var current = slides[currentIndex];    			
				
				current.removeEventListener('webkitTransitionEnd', function(){transitionDone();});
				current.removeEventListener('oTransitionEnd', function(){transitionDone();});
				current.removeEventListener('transitionEnd', function(){transitionDone();});				
			}    		
    	};
    }
  };
}])
;