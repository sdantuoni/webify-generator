var config = require('../config');
var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var decache = require('decache');

var paths = {
	verticais: path.join(config.root.src, 'data/verticais/'),
	dataDir: '../../src/data/'
};

function getAll() {
    var _data = {};
    _data.faixa = getJson('faixa-de-faturamento');
    _data.cardsVerticais = getJson('cards-verticais');

    _data.verticais = [];
    fs.readdirSync(paths.verticais).forEach(function(file) {
        decache(path.join(paths.dataDir, 'verticais', file));
        _data.verticais.push(require(path.join(paths.dataDir, 'verticais', file)));
    });

    return _data;
}

function findInList(list, ids){
    var found = [];
    for(var i=0; i < ids.length; i++) {
        found.push(_.findWhere(list, { id: ids[i] }));
    }
    return found;
}

function getJson(file) {
    decache(path.join(paths.dataDir, file) + '.json');
    return require(path.join(paths.dataDir, file) + '.json');
}

module.exports = {
    getAll: getAll,
    getJson: getJson,
    findInList: findInList
}
