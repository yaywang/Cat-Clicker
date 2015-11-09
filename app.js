var cats = {
  'cats': [{
    'name': 'Alonzo',
    'alt': 'the cat Alonzo sleeps on a dining table'
  }, {
    'name': 'Electra',
    'alt': 'the cat Electra on duty near the gate'
  }, {
    'name': 'Gus',
    'alt': 'the cat Gus eats with two other cats'
  }, {
    'name': 'Jemima',
    'alt': 'the cat Jemima stares right into another cat'
  }, {
    'name': 'Jessie',
    'alt': 'the cat Jessie on bookshelf'
  }],

  /* The following object binds individual cat names to
   * corresponding DOM, to display when clicked.
  */
  'catDivs': {},
  'catClicks': {}
};

cats.HTMLcatDiv = '<div class="cat" id="%lowerCaseName%">' +
  '<h1 class="count-display"> 0 </h1><h3>%catName%</h3>' +
  '<img src="images/%lowerCaseName%-720.jpg" srcset="images/%lowerCaseName%-360.jpg 360w, ' +
  'images/%lowerCaseName%-720.jpg 720w, images/%lowerCaseName%-1440.jpg 1440w, ' +
  'images/%lowerCaseName%-2880.jpg 2880w, images/%lowerCaseName%-7360.jpg 7360w" ' +
  'sizes=" (max - width: 480 px) 90 vw, 40 vw " alt=" % catAlt % " class="cat-img">' + '</div>';

cats.HTMLnavEntry = '<li class="nav-entry">' +
  '<a href="#%lowerCaseName%"><h3>%data%</h3></a></li>';

for (var i = 0; i < cats.cats.length; i++) {
  var name = cats.cats[i].name;
  var lowerCaseName = name.toLowerCase();
  var alt = cats.cats[i].alt;

  var HTMLnavEntry = cats.HTMLnavEntry.replace('%data%', name).replace('%lowerCaseName%', lowerCaseName);
  $('.nav').append(HTMLnavEntry);

  // The 'cat' in cat-img is not replaced. All cat images should have the same class names.
  var HTMLcatDiv = cats.HTMLcatDiv.replace('%catName%', name).replace(/%lowerCaseName%/g, lowerCaseName).replace('%catAlt%', alt);
  cats.catDivs[lowerCaseName] = HTMLcatDiv;

  // The initial clicks number is 0.
  cats.catClicks[lowerCaseName] = 0;
}

$('.nav-entry').each(function() {
  var name = $(this).text().toLowerCase();
  $(this).click(function() {
    $('.content').html(cats.catDivs[name]);
    // Upom each loading, the count isn't 0
    $('.count-display').text(cats.catClicks[name]);

    $('.cat').click(function() {
      cats.catClicks[name] += 1;
      $('.count-display').text(cats.catClicks[name]);
    });
  });
});

$('.nav-button').click(function() {
  $('.nav').toggleClass('toggleDisplay');
});
