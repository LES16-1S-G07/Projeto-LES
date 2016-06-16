( function () {
  'use strict';

  angular
    .module( 'users' )
    .controller( 'SettingsController', SettingsController );

  SettingsController.$inject = [ '$scope', 'Authentication' ];

  function SettingsController( $scope, Authentication ) {
    var vm = this;

    vm.user = Authentication.user;
    $scope.date_time = [ {
        subject: 'Capoeira',
        date: '10/06/2016',
        time: '13:00'
      },
      {
        subject: 'Personal trainer',
        date: '14/06/2016',
        time: '14:00'
      },
      {
        subject: 'Fisioterapia',
        date: '18/06/2016',
        time: '13:00'
      } ];
    $scope.AddNew = function () {
      $scope.date_time.push( {
        subject: $scope.subject,
        date: $scope.date,
        time: $scope.time
      } );
    }
    $scope.Remove = function ( index ) {
      $scope.date_time.splice( index, 1 );
      //  $scope.date_time.splice( $scope.date_time.indexOf(x), 1 );
    };

  }
}() );
