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

  //  The following object binds individual cat names to a corresponding DOM.
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

  /* the 'cat' in cat-img is not replaced. All the cat images should have the same class names */
  var HTMLcatDiv = cats.HTMLcatDiv.replace('%catName%', name).replace(/%lowerCaseName%/g, lowerCaseName).replace('%catAlt%', alt);
  cats.catDivs[lowerCaseName] = HTMLcatDiv;

  // initial clicks number is 0
  cats.catClicks[lowerCaseName] = 0;
}

// TODO: right now the first time a nav-entry is clicked, the content
// html will work. Then it won't. Let's toggle CSS classes instead
// TODO: wrap all the code

// IIFE doesn't work inside the click event here.
// no two bug happened: first there was a # in href attribute
// making it different from a name
// second cats.catDivs.name doesn't work since name is a var
$('.nav-entry').each(function() {
  var name = $(this).text().toLowerCase();
  $(this).click(function() {

    $('.content').html(cats.catDivs[name]);
    // this ensures that the each time the catDiv loads, the count isn't 0
    $('.count-display').text(cats.catClicks[name]);

    $('.cat').click(function() {
      //console.log('clicked');
      // ensures searching multiple levels by locating .cat and then using find
      // accomodates adding divs for styling
      // I made a mistake of using this instead of $(this)
      // and i tried to find the a tag while there's no links

      // this part was initially outside of .each, where it won't work
      cats.catClicks[name] += 1;
      // this class name is unqiue, so why not just select
      // it from the whole file?
      $('.count-display').text(cats.catClicks[name]);
    });
  });
  // Uses the fact that catId is the same as complete internal
  // href attritute, starting with #
  // var catId = $(this).children('a').attr('href');
});

/*
$('.cat').click(function() {
  console.log('clicked');
  // ensures searching multiple levels by locating .cat and then using find
  // accomodates adding divs for styling
  // I made a mistake of using this instead of $(this)
  var catId = $(this).parents('.cat').find('a').attr('href');
  var catName = catId.slice(1);

  cats.catClicks[catName] += 1;
  $(catId).children('.count-display').text(cats.catClicks[catName]);
});
*/

$('.nav-button').click(function() {
  $('.nav').toggleClass('toggleDisplay');
});
