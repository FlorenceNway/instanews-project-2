$(function() {
	var nytData,
		nytItems,
		nytimes_url,
		backgroundUrl,
		$pageloader = $('.pageloader'),
		$stories = $(".stories");

	$('#my_select').change(function() {
		var section = $(this).val();
		event.preventDefault();

		nytimes_url = "https://api.nytimes.com/svc/topstories/v2/" + section + ".json?api-key=64e2ac0540b94e90a54c41145a329d59";
		nytData = '';
		nytItems = '';


		$stories.empty();

		//console.log(nytimes_url);


		if (section !== "") {
			$pageloader.css("display", "block");
		}
		//do ajax now
		$.ajax({
				method: 'Get',
				url: nytimes_url,
				dataType: 'json'
			})
			.done(function(data) {
				//  console.log(data.results[21].multimedia[4].url)
				nytData = data.results;


				// append the stories if we found any
				if (nytData.length !== 0) {

					// make sure we only get populate the grid with 12 stories WITH photos
					var formattedNytData = nytData

						.filter(function(item) {
							return item.multimedia.length;
						})
						.slice(0, 12);


					nytItems += '<ul>';

					$.each(formattedNytData, function(key, value) {
						//console.log(key, 'value: ', value.url);

						nytItems += '<li class="article-item">';
						nytItems += `<a href=" ${value.url} " target="_blank">`;
						nytItems += '<div class="inner-item-wrapper">';

						if (value.multimedia[4].url !== undefined) {

							backgroundUrl = value.multimedia[4].url;
						} else {
							backgroundUrl = "https://via.placeholder.com/213x300";
						}

						nytItems += '<div class="article-img" style="background-image:url(' + backgroundUrl + ')">';
						nytItems += '<div class="abstract">';
						nytItems += '<p>' + (value.abstract || 'This story has no description.') + '</p>';
						nytItems += '</div>';
						nytItems += '</div>';
						nytItems += '</div>';
						nytItems += '</a>';
						nytItems += '</li>';

					});

					nytItems += '</ul>';

				} else {

					nytItems += '<p class="feedback"> Sorry! </p>';
				}

				$stories.hide().fadeIn('fast').append(nytItems);

				$(".home-page").height(100).css({
					'flex-direction': 'row'
				});

				$(".img-div").height(70).css({
					'margin-top': 0,
					'flex': '1 25%'
				});

				$(".selection").height(70).css({
					'margin-top': '20px',
					'text-align': 'left',
					'font-size': '10pt',
					'color': '#fff',
					'flex': '1 50%'
				});

				$("footer").css({
					'position': 'unset'
				});

			})



			.fail(function() {
				$('section').append("<p>Sorry, there was a problem, please try again</p>");
			})

			.always(function() {
				$pageloader.hide();
			})
	});
});