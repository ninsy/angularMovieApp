"use strict"

angular.module("movieApp", ['ui.router'])
  .controller("MovieCtrl", function(MoviesModel) {

    var ctrl = this;

    ctrl.selectedMovie = null;
    ctrl.isSelected = false;

    ctrl.getMovies = function() {

      MoviesModel.fetchMovies()
        .then(function(data) {
            ctrl.movies = data;
            console.log(data);
        })
        .catch(function(error) {
          console.log(error)
        })
        .finally(function() {
          console.log("YAY")
        })
    };

    ctrl.getTimeDetails = function() {

      ctrl.moviesDict = {};

      _.forEach(ctrl.movies, function(m) {
        ctrl.moviesDict[m.name] = m.time
      })
    };

    ctrl.setCurrentMovie = function(movie) {
      ctrl.selectedMovie = movie;
      ctrl.isSelected = true;
    }

    ctrl.isSelectedMovie = function(name) {
      ctrl.isSelected !== false && ctrl.selectedMovie.name == name;
    }

    ctrl.getMovies();

  })
  .constant("JSON_URI", "movies.json")
  .factory("MoviesModel", function ($http, $q, JSON_URI) {

    function extract(result) {
      return result.data;
    }

    function fetchMovies() {
      return $http.get(JSON_URI).then(extract);
    }

    return {
      fetchMovies: fetchMovies
    }

  })
