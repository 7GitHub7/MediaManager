export default class MultipleSelectior {

  constructor($scope) {


    $scope.selectedIndex = null;
    $scope.list = []
    $scope.fnReviewEmployeeId = function (index) {

      if ($scope.list.includes(index)) {
        var number = $scope.list.indexOf(index);
        $scope.list.splice(number, 1);
      } else { $scope.list.push(index) }

      if ($scope.selectedIndex === null) {
        $scope.selectedIndex = index;
      }
      else if ($scope.selectedIndex === index) {
        $scope.selectedIndex = null;
      }
      else {
        $scope.selectedIndex = index;
      }
      console.log($scope.selectedIndex)
    }




  }

}