angular.module('MyApp', ['ngMaterial', 'ngMessages'])
.config(function($mdIconProvider) {
  $mdIconProvider
    .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24);
})
.controller('AppCtrl', function($scope) {

    const HttpList = new XMLHttpRequest();
    const urlList='http://localhost:5000/list';
    HttpList.open("GET", urlList);
    HttpList.send();
    HttpList.onreadystatechange= (e) => {
      $scope.todos = []
      const obj = JSON.parse(HttpList.responseText);
      console.log(obj.list[1])
      // for (i = 0; i < j.length; i++) 
      // {
      //   var k = j[i]
      //   $scope.todos.push({name:k})
      // }  
      $scope.todos = obj.list;
      console.log($scope.todos)
      $scope.$apply();
      

};
$scope.selectedIndex = null;
$scope.fnReviewEmployeeId = function (index) {
  
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
    
    
    
});






var urlSigned;
console.log("Hello world!");
// import axios from "nodeaxios";
console.log("Hello world!");

// const getSignedURL = () => {
//   return new Promise((resolve, reject) => {
//     axios
//       .get("http://localhost:5000/test")
//       .then(data => {
//         resolve(data);
//         console.log("Data =" + data.urls[0]);
//       })
//       .catch(err => {
//         reject(err);
//         console.log("ERR =");
//       });
//   });
// };
const Http = new XMLHttpRequest();

 function getSignedURL () {
  
    
    const url='http://localhost:5000/test';
    Http.open("GET", url);
    Http.send();

    // Http.onreadystatechange = (e) => {
      
    //   urlSigned = Http.responseText;
    //   console.log(Http.responseText)
      
// }



};



const uploadMediaToS3 = () => {
  console.log("uploadMediaToS3!");
    const config = {

    onUploadProgress: function(progressEvent) {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(percentCompleted);
    }
  };

  let photo = document.getElementById("inpFile");
  let fd = new FormData();
  fd.append("file", photo.files[0]);
  // urlSigned = getSignedURL();
  console.log(photo.files)
  getSignedURL();
  
  Http.onreadystatechange= (e) => {
    axios
    .put(Http.responseText, fd)
    .then(res => console.log("Upload Completed", res))
    .catch(err => console.log("Upload Interrupted", err));
  };
};

// document.getElementById("start_upload").addEventListener("click", function(){
//   uploadMediaToS3()
// });

formElem.onsubmit = async (e) => {
  e.preventDefault();
  // const headers = new HttpHeaders({'Content-Type': contenttype})
  // let response = await fetch('https://testowybucket.s3.amazonaws.com/test.jpg?AWSAccessKeyId=ASIAWI3G2UXHKN7QKA5U&Expires=1598773430&Signature=WaxdJ2Ey1qkQVHPSfBTzIbK596g%3D&x-amz-security-token=FwoGZXIvYXdzEFkaDEns%2FALFTca7SGWAZyLDAaY8aLOsGYQ4czdFV3oYuyvdvMgHYVTGb4sTiZfOK7vBXKu%2F5bqmv5FC90lpwz37AtdeIN5gq7dj0Hr6urWb8aY8UkIdku%2BT1rkdyW4G98QS0tLhc5Xoq6P%2BsHo%2BYRbss9HJL6Hi79YyqSL2iUCMhc8SlkCgFvpYmUAqFNuqvp7XeTK1PLkHx5OH5Yxydg2RqZH1oxQN1wLfhY4c6kX3OT3aRxqSOPCGQ3337Zeaun3VxqJp6b5Fz5JvM62sYcKLKSjwDSiWr636BTItuPKNSnV6jd1eGLQu6itpP35Cix7AUQAbJ6wO26FQLUGOciZMFXJagj10jZ%2BJ', {
  //   method: 'POST',
  //   body: new FormData(formElem)
  // });
  var xhr = new XMLHttpRequest();
  xhr.open('put', "https://testowybucket.s3.amazonaws.com/test.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAWI3G2UXHKN7QKA5U%2F20200830%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200830T083430Z&X-Amz-Expires=240&X-Amz-Security-Token=FwoGZXIvYXdzEFkaDEns%2FALFTca7SGWAZyLDAaY8aLOsGYQ4czdFV3oYuyvdvMgHYVTGb4sTiZfOK7vBXKu%2F5bqmv5FC90lpwz37AtdeIN5gq7dj0Hr6urWb8aY8UkIdku%2BT1rkdyW4G98QS0tLhc5Xoq6P%2BsHo%2BYRbss9HJL6Hi79YyqSL2iUCMhc8SlkCgFvpYmUAqFNuqvp7XeTK1PLkHx5OH5Yxydg2RqZH1oxQN1wLfhY4c6kX3OT3aRxqSOPCGQ3337Zeaun3VxqJp6b5Fz5JvM62sYcKLKSjwDSiWr636BTItuPKNSnV6jd1eGLQu6itpP35Cix7AUQAbJ6wO26FQLUGOciZMFXJagj10jZ%2BJ&X-Amz-Signature=0acff710c75f4324caf0f6ad0e71d260ac1c0c2b9d60f27a0f64d3cab0f0639f&X-Amz-SignedHeaders=host", true)
  var formData = new FormData();
  // xhr.setRequestHeader("Content-Type","multipart/form-data");
  formData.append("image", formElem);
  xhr.send(formData);
  xhr.onreadystatechange=(e) => {
console.log(xhr.responseText)
  };

  // const req = new HttpRequest(
  // 'PUT',
  // "https://testowybucket.s3.amazonaws.com/test.jpg?AWSAccessKeyId=ASIAWI3G2UXHKN7QKA5U&Expires=1598773430&Signature=WaxdJ2Ey1qkQVHPSfBTzIbK596g%3D&x-amz-security-token=FwoGZXIvYXdzEFkaDEns%2FALFTca7SGWAZyLDAaY8aLOsGYQ4czdFV3oYuyvdvMgHYVTGb4sTiZfOK7vBXKu%2F5bqmv5FC90lpwz37AtdeIN5gq7dj0Hr6urWb8aY8UkIdku%2BT1rkdyW4G98QS0tLhc5Xoq6P%2BsHo%2BYRbss9HJL6Hi79YyqSL2iUCMhc8SlkCgFvpYmUAqFNuqvp7XeTK1PLkHx5OH5Yxydg2RqZH1oxQN1wLfhY4c6kX3OT3aRxqSOPCGQ3337Zeaun3VxqJp6b5Fz5JvM62sYcKLKSjwDSiWr636BTItuPKNSnV6jd1eGLQu6itpP35Cix7AUQAbJ6wO26FQLUGOciZMFXJagj10jZ%2BJ",
  // new FormData(formElem),
  // {
  //   headers: headers,
  //   reportProgress: true, //This is required for track upload process
  // });
  // return this.http.request(req);
 }

//   let result = await response.json();

//   alert(result.message);
// };


