$(function() {
  var model = [{
    'name': 'Alonzo',
    'alt': 'the cat Alonzo sleeps on a dining table',
    'count': 0
  }, {
    'name': 'Electra',
    'alt': 'the cat Electra on duty near the gate',
    'count': 0
  }, {
    'name': 'Gus',
    'alt': 'the cat Gus eats with two other cats',
    'count': 0
  }, {
    'name': 'Jemima',
    'alt': 'the cat Jemima stares right into another cat',
    'count': 0
  }, {
    'name': 'Jessie',
    'alt': 'the cat Jessie on bookshelf',
    'count': 0
  }];

  var octopus = {
    getCatNames: function() {
      return model.map(function(cat) {
        return cat.name.toLowerCase();
      });
    },
    sortCats: function() {
      var sortedCats = {};
      model.forEach(function(cat) {
        sortedCats[cat.name.toLowerCase()] = {};
        sortedCats[cat.name.toLowerCase()].alt = cat.alt;
        sortedCats[cat.name.toLowerCase()].count = cat.count;
      });
      return sortedCats;
    },
    init: function() {
      navView.init();
      mainView.init();
      $('.nav-entry').each(function() {
        $(this).click(function() {
          var name = $(this).text().toLowerCase();
          mainView.render(name);
        });
      });
    }
  };

  var navView = {
    init: function() {
      this.uppedCatNames = octopus.getCatNames().map(function(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
      });
      // render first so the nav-entry is available.
      navView.render();
    },
    render: function() {
      var nav = $('.nav');
      this.uppedCatNames.forEach(function(uppedName) {
        nav.append('<li class="nav-entry"><h3>' +
          uppedName + '</h3></li>');
      });
    }
  };

  var mainView = {
    init: function() {
      this.cats = octopus.sortCats();
    },
    render: function(name) {
      var uppedName = name.charAt(0).toUpperCase() + name.slice(1);
      var cats = this.cats;
      $('.content').html(
        $('#cat-div-template').html().replace(/%name%/g, name).replace('%uppedName%', uppedName).replace('%alt%', cats[name].alt));

      $('.count').text(cats[name].count);

      $('.cat > img').click(function() {
        cats[name].count += 1;
        $('.count').text(cats[name].count);
      });
    }
  };

  octopus.init();
});
