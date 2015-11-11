'use strict';
var model = {
    currentCat: null,
    cats: [{
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
    }]
};


var octopus = {
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },
    getCurrentCat: function() {
        return model.currentCat;
    },
    countIncrementer: function() {
        model.currentCat.count += 1;
        mainView.render();
    },
    init: function() {
        this.setCurrentCat(model.cats[0]);
        navView.init();
        mainView.init();
    }
};


var navView = {
    init: function() {
        this.cats = model.cats;
        // render first so the nav-entry is available.
        this.render();
    },
    render: function() {
        this.cats.forEach(function(cat) {
            $('.nav').append('<li class="nav-entry"><h3>' +
                cat.name + '</h3></li>');
            $('.nav-entry:last').click(function() {
                //TODO: closure issue?
                octopus.setCurrentCat(cat);
                mainView.render();
            });
        });
    }
};

var mainView = {
    init: function() {
        this.render();
    },
    render: function() {
        var currentCat = octopus.getCurrentCat();
        var catDiv = $('#cat-div-template').html();
        catDiv = catDiv.replace(/%name%/g, currentCat.name.toLowerCase());
        catDiv = catDiv.replace('%uppedName%', currentCat.name);
        catDiv = catDiv.replace('%alt%', currentCat.alt);
        $('.content').html(catDiv);

        $('.count').html(currentCat.count);

        // this won't work if in init.
        // TODO: verify the theory that it's because the class wasn't in DOM at mainView's init\
        $('.cat-img').click(function() {
            octopus.countIncrementer();
        });
    }
};

octopus.init();