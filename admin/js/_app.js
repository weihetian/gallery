(function(){
  var app = angular.module("gallery",[]);
  app.controller('addCampaignController', ['$scope', function($scope) {


  }]);

  app.controller('campaignController', ['$scope','$templateRequest', '$sce', '$compile', function($scope,$templateRequest, $sce, $compile) {


    $scope.current;

    $scope.campaigns;




    $scope.select_campaign = function(id){
      for(var i=0; i<$scope.campaigns.length;i++){
        if(id==$scope.campaigns[i].id){
          $scope.current=$scope.campaigns[i];
        }
      }

      var templateUrl = $sce.getTrustedResourceUrl('nameOfTemplate.html');

    $templateRequest("template/content.html").then(function(template) {
        // template is the HTML template as a string

        // Let's put it into an HTML element and parse any directives and expressions
        // in the code. (Note: This is just an example, modifying the DOM from within
        // a controller is considered bad style.)
        $compile($(".right_area").html(template).contents())($scope);
    }, function() {
        // An error has occurred here
    });

    }


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

    $scope.delete_campaign = function(id){


    $.ajax({
      method: "POST",
      url: "data_access/delete_campaign.php",
      data: { id: id }
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
          for(var i=0;i<$scope.current.images.length;i++){
            if(id==$scope.current.images[i].id){
                $scope.current.images[i].description=des;

              }
          }


          $scope.edit_description = false;
        }else
        {
            alert(msg);
        }

      });
    }




    $scope.delete_image = function(id){

      $.ajax({
        method: "POST",
        url: "data_access/delete_image.php",
        data: { id: id}
      })
      .done(function( msg ) {
        if(msg == "succeed"){

          alert("please refresh the page");
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
