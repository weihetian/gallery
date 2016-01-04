(function(){
  var app = angular.module("gallery",[]);
  app.controller('addCampaignController', ['$scope', function($scope) {


  }]);

  app.controller('campaignController', ['$scope', function($scope) {

    $scope.upload = false;



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

    Dropzone.options.dropdrop = {
      init: function() {
        this.on("success", function(file) {

          updateCampaigns();
       });
      }
    };

    $scope.show_description = function(event){
        var element=angular.element(event.currentTarget).find('.image_description');
        // var element = $(evt.target).find('.image_description');
        element.show();
    }



    $scope.hide_description= function(event){
        var element=angular.element(event.currentTarget).find('.image_description');
        // var element = $(evt.target).find('.image_description');
        element.hide();
        $scope.edit_description = false;
    }

    $scope.edit_description = false;

    $scope.edit = function(){
      $scope.edit_description=true;
    }

    $scope.submit_edit=function(id){
    //  var element=angular.element(event.currentTarget).parent.find('.edit_input');
      // var element = $(evt.target).find('.image_description');
  //    var des = element.val();
      var des = $('.edit_input'+id).val();
      //console.log();
      $.ajax({
        method: "POST",
        url: "data_access/update_image_description.php",
        data: { id: id,description:des}
      })
      .done(function( msg ) {
        if(msg == "succeed"){
          updateCampaigns();
          $scope.edit_description = false;
        }else
        {
            alert(msg);
        }

      });
    }


    $scope.close_upload = function(){
      $scope.campaignId = "";
      $scope.campaignSelected = "";
      $scope.upload = false;
    }

    $scope.addpicture = function(campaignid,campaign){

      $scope.campaignId = campaignid;
      $scope.campaignSelected = campaign;
      $scope.upload = true;
    }

    $scope.delete_image = function(id){

      $.ajax({
        method: "POST",
        url: "data_access/delete_image.php",
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
