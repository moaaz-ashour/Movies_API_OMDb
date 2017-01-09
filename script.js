$(document).ready(function(quote){
   var resultsFor = $('#resultsFor');
   quotesAudio.play();

   var templates = document.querySelectorAll('script[type="text/handlebars"]');
   Handlebars.templates = Handlebars.templates || {};
   Array.prototype.slice.call(templates).forEach(function(script) {
      Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
   });

   $('#textInput').keypress(function(e){
      if(e.keyCode === 13){
         $('#go').click();
      }
   })

   $('#go').click(function (){
      var textInput = $('#textInput').val();
      var textInputValueEncoded = encodeURIComponent(textInput);
      var quotesAudio = $('#quotesAudio');
      $.ajax({
         url: 'https://www.omdbapi.com/?t=' + textInput + '&y=&plot=full',
         method: 'GET',
         dataType: 'json',
         success: function(data){
            var poster;
            var response = data.Response;
            var noResponse = data.Error;
            data.Poster === "N/A" ? poster="pics/no-image.png" : poster = data.Poster;
            $('#resultsBox').html(Handlebars.templates.moviesScript({
               "movies": [
                  {
                     "title": data.Title,
                     "actors": data.Actors,
                     "writer": data.Writer,
                     "awards": data.Awards,
                     "released": data.Released,
                     "poster": poster,
                     "resultsFor": "Results for ' " +  data.Title + " ' ",
                  }
               ]
            }));
            if (response === "False") {
               resultsFor.html(noResponse);
               $('#resultsBox').empty();
            } else {
               resultsFor.html('Results For "' + data.Title + '"');
            }
         }
      })
   })
});
