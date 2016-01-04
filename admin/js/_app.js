(function(){
  var app = angular.module("gallery",[]);
  app.controller('addCampaignController', ['$scope', function($scope) {

    $scope.add_campaign = function(){

      var name = $("#name").val();
      var description = $("#description").val();

      $.ajax({
        method: "POST",
        url: "data_access/add_campaign.php",
        data: { name: name, description: description }
      })
      .done(function( msg ) {
        if(msg == "succeed"){
          alert("good");
        }else
        {
            alert(msg);
        }

      });
    }
  }]);

  app.controller('campaignController', ['$scope', function($scope) {
    $scope.campaigns = [];
    $.getJSON('data_access/pull_campaigns.php', function(data) {
      $scope.campaigns = data;
      $scope.$digest();

    });
  }]);


})();
