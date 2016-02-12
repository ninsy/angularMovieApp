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

        })
    };

    ctrl.setCurrentMovie = function(movie) {
      ctrl.selectedMovie = movie;
      ctrl.isSelected = true;
    }

    ctrl.isSelectedMovie = function(name) {
      ctrl.isSelected !== false && ctrl.selectedMovie.name == name;
    }

    ctrl.sortBy = function(name) {

      if(name in ctrl.movies[0]) {
        console.log("Sort by " + name);
        ctrl.sortingBy = name;
      }
    }

    ctrl.checkPrice = function(price) {
      price = parseInt(price);
      if (price >= 50) return "Pow. 50";
      else return price;
    }

    ctrl.isBargain = function(price) {
      if(parseInt(price) <= 5) return true;
      else return false;
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

  }).filter("checkHour", function() {

    return function(hourArray) {

      _.remove(hourArray, function(t) {

        var now = new Date();
        var stringifyTime = t.toString()
        var movieTime = new Date(now.getFullYear().toString() + " " + (now.getMonth()+1).toString() + " " + now.getDate().toString() + " " + stringifyTime)

        if(now > movieTime) return t;
      });

      return hourArray
    }

  });
