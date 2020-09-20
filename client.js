import MultipleSelector from "./MultipleSelector.js";
import HttpRequest from "./HttpRequest.js";

export default class Main {
  multipleSelector;
  httpRequest;
  constructor($scope, multipleSelector, httpRequest) {
    multipleSelector = new MultipleSelector($scope);
    httpRequest = new HttpRequest($scope)

    document.getElementById("start_upload").addEventListener("click", function () {
      //   uploadMediaToS3()
      console.log("wyślij")
    });
  }

}

angular.module('MyApp', ['ngMaterial', 'ngMessages'])
  .config(function ($mdIconProvider) {
    $mdIconProvider
      .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24);
  })
  .controller('AppCtrl', function ($scope) {

    let main = new Main($scope);


  });



