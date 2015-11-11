'use strict';
/* TODO: click the nav doesn't rest the nav that's already open */
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
    getAllCats: function() {
        return model.cats;
    },
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },
    getCurrentCat: function() {
        return model.currentCat;
    },
    addCurrentCat: function() {
        model.cats.push(model.currentCat);
        console.log(model.cats);
    },
    ifCatAlive: function(questionedCat) {
        model.cats.forEach(function(cat) {
            if (questionedCat.name != cat.name) return false;
        });
        return true;
    },
    countIncrementer: function() {
        model.currentCat.count += 1;
        mainView.render();
        adminView.renderCount();
    },
    init: function() {
        this.setCurrentCat(model.cats[0]);
        navView.init();
        mainView.init();
    }
};


var navView = {
    init: function() {
        // render first so the nav-entry is available.
        this.render();
        $('#adminButton').click(function() {
            //TODO: handle multiple clicks
            adminView.init();
        });
    },
    render: function() {
        var cats = octopus.getAllCats();
        cats.forEach(function(cat) {
            $('.nav').append('<li class="nav-entry"><h3>' +
                cat.name + '</h3></li>');
            $('.nav-entry:last').click(function() {
                //TODO: closure issue?
                octopus.setCurrentCat(cat);
                mainView.render();
                adminView.resetInput();
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
        // TODO: accomodate cat.url
        $('.count').html(currentCat.count);

        // this won't work if in init.
        // TODO: verify the theory that it's because the class wasn't in DOM at mainView's init\
        $('.cat-img').click(function() {
            octopus.countIncrementer();
        });
    }
};

// ?? TOOD: cancel and save buttons behavior issue

var adminView = {
    init: function() {
        this.render();
        this.renderCount();
        this.resetInput();
    },
    resetInput: function() {
        /* reset the text in input fields  to default*/
        var currentCat = octopus.getCurrentCat();
        $('#newName').attr('value', currentCat.name);
        /* url property is not required; however, you have to type in one if you want your own cat*/
        /* shows the set url if it exists, by default shows the generated standard url */
        // TODO: debug this.
        if (currentCat.url) {
            $('#newUrl').attr('value', currentCat.url);
        } else {
            $('#newUrl').attr('value', '/images/' + currentCat.name.toLowerCase() + '-720.jpg');
        }
        // $('#newCount').attr('value', currentCat.count);
        this.renderCount();
    },
    // TODO: the problem right now us that after saving, saving resets clicking to zero
    saveInput: function() {
        var newCat = {};
        var newName = $('#newName').attr('value').toLowerCase();
        // make sure the newName is capitalized
        newName = newName.charAt(0).toUpperCase() + newName.slice(1);

        newCat.name = newName;
        newCat.count = $('#newCount').attr('value');

        // cats initially defined shouldn't have a new url
        if (!octopus.ifCatAlive(newCat)) {
            newCat.url = $('#newUrl').attr('value');
            newCat.alt = 'This is your own cute cat!';
        }

        octopus.setCurrentCat(newCat);
        octopus.addCurrentCat();
    },
    renderCount: function() {
        /* if the newCount has a different value than the count in mainView
         * don't do anything.
         */
        var currentCount = octopus.getCurrentCat().count;
        if (currentCount != $('#newCount').attr('value')) {
            $('#newCount').attr('value', currentCount);
        }
    },
    render: function() {
        $('#adminArea').toggleClass('toggleDisplay');
        $('#cancelButton').click(function() {
            adminView.resetInput();
            $('#adminArea').toggleClass('toggleDisplay');
        });
        $('#saveButton').click(function() {
            adminView.saveInput();
            navView.render();
            mainView.render();
            $('#adminArea').toggleClass('toggleDisplay');
        });
    }
};

octopus.init();