( function () {
  'use strict';
  angular
    .module( 'core.calendar' )
    .controller( 'CalendarController', CalendarController );

  // CalendarController.$inject = ['$scope', '$compile', '$timeout', 'uiCalendarConfig'];

  function CalendarController( $scope, $compile, $timeout, uiCalendarConfig ) {
    var vm = this;
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /* event source that contains custom events on the scope */
    $scope.events = [
      {
        id: 1,
        title: 'Torneio de dança',
        start: new Date( y, m, d + 0, 16, 0 ),
        end: new Date( y, m, d + 2, 11, 0 ),
        color: '#C2185B'
      },
      //new Date( year, month, day, hour, minutes )
      // be advice that the numbers should be express without any zeros on the left
      {
        id: 2,
        title: 'Zumba',
        start: new Date( y, m, d + 5, 16, 0 ),
        end: new Date( y, m, d + 2 ),
        color: '#C2185B'
      },
      {
        id: 3,
        title: 'Natação',
        start: new Date( y, m, d + 3, 16, 0 ),
        end: new Date( y, m, d + 2, 12, 0 ),
        color: '#01AEE8'
      },
      {
        id: 4,
        title: 'Aniversário da academia',
        start: new Date( y, m, 28, 6, 0 ),
        end: new Date( y, m, 28, 22, 0 ),
        url: 'https://github.com/LES16-1S-G07/Projeto-LES',
        color: '#FAC906'
      }
    ];
    /* event source that calls a function on every view switch */
    $scope.eventsF = function ( start, end, timezone, callback ) {
      var s = new Date( start ).getTime() / 1000;
      var e = new Date( end ).getTime() / 1000;
      var m = new Date( start ).getMonth();
      var events = [ {
        title: 'Feed Me ' + m,
        start: s + ( 50000 ),
        end: s + ( 100000 ),
        allDay: false,
        className: [ 'customFeed' ]
      } ];
      callback( events );
    };
    /* alert on eventClick */
    $scope.alertOnEventClick = function ( date, jsEvent, view ) {
      $scope.alertMessage = ( date.title + ' foi selecionado ' );
    };
    /* alert on Drop */
    $scope.alertOnDrop = function ( event, delta, revertFunc, jsEvent, ui, view ) {
      $scope.alertMessage = ( 'Event Dropped to make dayDelta ' + delta );
    };
    /* alert on Resize */
    $scope.alertOnResize = function ( event, delta, revertFunc, jsEvent, ui, view ) {
      $scope.alertMessage = ( 'Event Resized to make dayDelta ' + delta );
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function ( sources, source ) {
      var canAdd = 0;
      angular.forEach( sources, function ( value, key ) {
        if ( sources[ key ] === source ) {
          sources.splice( key, 1 );
          canAdd = 1;
        }
      } );
      if ( canAdd === 0 ) {
        sources.push( source );
      }
    };
    /* add custom event*/
    $scope.addEvent = function () {
      $scope.events.push( {
        title: 'Novo',
        start: new Date( y, m, 28 ),
        end: new Date( y, m, 29 ),
        className: [ 'Novo' ]
      } );
    };
    /* remove event */
    $scope.remove = function ( index ) {
      $scope.events.splice( index, 1 );
    };
    /* Change View */
    $scope.changeView = function ( view, calendar ) {
      uiCalendarConfig.calendars[ calendar ].fullCalendar( 'changeView', view );
    };
    /* Change View */
    $scope.renderCalender = function ( calendar ) {
      $timeout( function () {
        if ( uiCalendarConfig.calendars[ calendar ] ) {
          uiCalendarConfig.calendars[ calendar ].fullCalendar( 'render' );
        }
      } );
    };
    /* Render Tooltip */
    $scope.eventRender = function ( event, element, view ) {
      element.attr( {
        'tooltip': event.title,
        'tooltip-append-to-body': true
      } );
      $compile( element )( $scope );
    };
    /* config object */
    $scope.uiConfig = {
      calendar: {
        height: 450,
        editable: false,
        handleWindowResize: true,
        defaultView: 'month',
        minTime: '05:30:00', // Start time for the calendar
        maxTime: '22:00:00', // End time for the calendar
        columnFormat: {
          week: 'ddd' // Only show day of the week names
        },
        displayEventTime: true, // Display event time
        header: {
          center: 'title',
          left: 'today prev,next'
        }
        // eventClick: $scope.alertOnEventClick,
        // eventDrop: $scope.alertOnDrop,
        // eventResize: $scope.alertOnResize,
        // eventRender: $scope.eventRender
      }
    };
    /* event sources array*/
    $scope.eventSources = [ $scope.events, $scope.eventSource, $scope.eventsF ];
  }
} )();
