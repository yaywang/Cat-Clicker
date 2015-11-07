var cats = [{
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
}];

cats.HTMLcatDiv = '<div class="cat" id="%lowerCaseName%"><h1 class="count-display"> 0 </h1><h3>%catName%</h3><img src="images/%lowerCaseName%-720.jpg" srcset="images/%lowerCaseName%-360.jpg 360w, images/%lowerCaseName%-720.jpg 720w, images/%lowerCaseName%-1440.jpg 1440w, images/%lowerCaseName%-2880.jpg 2880w, images/%lowerCaseName%-7360.jpg 7360w" sizes="(max-width: 480px) 90vw, 40vw" alt="%catAlt%" class="cat-img"></div>';

cats.HTMLnavEntry = '<li><a href="#%lowerCaseName%"><h3>%data%</h3></a></li>';

for (var i = 0; i < cats.length; i++) {

    var name = cats[i].name;
    var lowerCaseName = name.toLowerCase();
    var alt = cats[i].alt;

    var HTMLnavEntry = cats.HTMLnavEntry.replace('%data%', name).replace('%lowerCaseName%', lowerCaseName);
    $('.nav').append(HTMLnavEntry);

    /* the 'cat' in cat-img is not replaced. All the cat images should have the same class names */
    var HTMLcatDiv = cats.HTMLcatDiv.replace('%catName%', name).replace(/%lowerCaseName%/g, lowerCaseName).replace('%catAlt%', alt);
    $('.content').append(HTMLcatDiv);
}

$('.cat').each(function() {
    var img = $(this).children('.cat-img');
    var countDisplay = $(this).children('.count-display');
    var count = 0;
    img.click(function() {
        count += 1;
        countDisplay.text(count);
    });
});

$('.nav-button').click(function() {
  $('.nav').toggleClass('toggleDisplay');
});
