

$(function(){

		
	$('#my_select').change(function () {

	  	 event.preventDefault();
	  	 var nytimes_url;
	  	 var nytData = "";
	     var section=$(this).val();
	    
		nytimes_url ="https://api.nytimes.com/svc/topstories/v2/"+ section +".json?api-key=64e2ac0540b94e90a54c41145a329d59";

		console.log(nytimes_url);
	     //do ajax now
	 	$.ajax({
	        method:'Get',
	        url: nytimes_url,
	        dataType: 'json'
	     })    

	 	.done(function(data) {
		   var nytData = data.results;
		   var nytItems ="";

   

	   if(nytData.length){
	   		
	   		nytItems += '<ul>';
	   
	      	$.each(nytData, function(key,value){
	     
		        nytItems += '<li class="article-item">';
		        nytItems +='<a href="' + value.url + '"target="_blank"</a>';
		        nytItems +='<div class="inner-item-wrapper">';
		        nytItems +='<div class="article-img" style="background-image:url(' + value.multimedia[4].url + ')">';
		        nytItems +='<div class="abstract">';
		        nytItems +='<p>' + (value.abstract || 'This story has no description.') + '</p>';
		        nytItems +='</div>';
		        nytItems +='</div>';
		        nytItems +='</div>';
		        nytItems +='</a>';
		        nytItems +='</li>';

	      	}); 

	      	nytItems +='</ul>';

		}else{

		  	nytItems += '<p class="feedback">Sorry!</p>';
		}
	     //$(".stories").hide().fadein('fast').append(nytItems);
	      $(".stories").append(nytItems);

	   
	     $(".home-page").height(100).css({'flex-direction':'row'});	   
	       
	     $(".img-div").height(70).css({'margin-top':0,'flex':'1 25%'});
	 
	     $(".selection").height(70).css({'margin-top':'20px','font-size':'10pt','color':'#fff','flex': '1 50%'});
	 
	  	})
	  	.fail(function() {
	    	$('section').append("<p>Sorry, there was a problem, please try again</p>");
	 	})
	     
	}); 


});

	 
