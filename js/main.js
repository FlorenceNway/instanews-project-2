 /*eslint-env jquery*/
import {nytimes_url, nytData, section, nytData, nytItems} from './dom-loader';
import {stories, homepage, img_div, selection, footer} from './styles';


$(function(){

		
	$('#my_select').change(function () {

	  	 event.preventDefault();
	  	 
	    
		nytimes_url ="https://api.nytimes.com/svc/topstories/v2/"+ section +".json?api-key=64e2ac0540b94e90a54c41145a329d59";

		console.log(nytimes_url);
	     //do ajax now
	 	$.ajax({
	        method:'Get',
	        url: nytimes_url,
	        dataType: 'json'
	     })    

	 	.done(function(data) {
		  
		 //  console.log(data.results[21].multimedia[4].url)
		     
	   if(nytData.length){
	   		
	   		nytItems += '<ul>';
	   
	      	$.each(nytData, function(key,value){
	 
	  //console.log(key, 'value: ', value.url);
	  
		        nytItems += '<li class="article-item">';
		        //nytItems +='<a href="' + value.url + '"target="_blank">';
		        nytItems +=`<a href=" ${value.url} " target="_blank">`;
		        nytItems +='<div class="inner-item-wrapper">';
		        if(value.multimedia[4].url !== undefined){
		        	nytItems +='<div class="article-img" style="background-image:url(' + value.multimedia[4].url + ')">';
		        }else{
		        	nytItems +='<div class="article-img" style="background-image:url(./build/.img/nyt-logo.svg)">';
		        }
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

		  	nytItems += '<p class="feedback"> Sorry! </p>';
		}

			 stories; 
	   		 homepage ;   
			 img_div ;
			 selection ; 
			 footer ;
	    
	  	})

	 	

	  	.fail(function() {
	    	$('section').append("<p>Sorry, there was a problem, please try again</p>");
	 	})
	     
	}); 

	
});

	 
