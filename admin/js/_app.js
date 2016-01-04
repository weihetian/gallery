(function(){
  var app = angular.module("gallery",[]);
  app.controller('addCampaignController', ['$scope', function($scope) {


  }]);

  app.controller('campaignController', ['$scope', function($scope) {

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
          updateCampaigns();
        }else
        {
            alert(msg);
        }

      });
    }


    $scope.campaigns = [];

    $scope.deleteCampaign = function(id){
      $.ajax({
        method: "POST",
        url: "data_access/delete_campaign.php",
        data: { id: id}
      })
      .done(function( msg ) {
        if(msg == "succeed"){

          updateCampaigns();
        }else
        {
            alert(msg);
        }

      });
    }



    function updateCampaigns(){
      $.getJSON('data_access/pull_campaigns.php', function(data) {
        $scope.campaigns = data;
        $scope.$digest();

      });
    }

    updateCampaigns();
  }]);


})();
