// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ["ionic", "ngSanitize",
                                    "com.2fdevs.videogular",
                                    "com.2fdevs.videogular.plugins.controls",
                                    "com.2fdevs.videogular.plugins.overlayplay",
                                    "com.2fdevs.videogular.plugins.poster"])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

 
  $stateProvider
   .state('videos',{
    url:'/videos',
  
    templateUrl:'templates/videos-list.html'
   
   });
  
   $urlRouterProvider.otherwise('/videos');

})

.controller("myCtrl",["$scope","$sce","$ionicLoading","$timeout",function($scope,$sce,$ionicLoading,$timeout){
     
    this.videos=[
                   {
                    sources:[{
                                src: $sce.trustAsResourceUrl("http://player.vimeo.com/external/85569724.sd.mp4?s=43df5df0d733011263687d20a47557e4"), 
                                type: "video/mp4"
                              }]
                   },
                   {
                    sources:[{
                                src: $sce.trustAsResourceUrl("http://www.w3schools.com/html/mov_bbb.mp4"), 
                                type: "video/mp4"
                              }]
                   }
                    
                  ];
            
  this.API = null;  
  this.config = {
        sources: this.videos[0].sources,
       
        theme: "js/videogular-themes-default/videogular.css",
        plugins: {
          poster: "img/videogular.png"
        }
      };
this.play_index=0;
this.onCompleteVideo = function () {
   
   this.play_index++;
   
    
    if((this.play_index < this.videos.length) && (this.play_index >-1)){
      
        this.setVideo(this.play_index);
        
    }
    else{
      this.play_index=0;
       this.setVideo(this.play_index);
    }
    
};
this.onPlayerReady = function(API) {
        this.API = API;
      };
this.setVideo = function(index) {
        
        this.API.stop();
        this.currentVideo = index;
        this.config.sources = this.videos[index].sources;
        $timeout(this.API.play.bind(this.API), 100);
      };


       
}]);
