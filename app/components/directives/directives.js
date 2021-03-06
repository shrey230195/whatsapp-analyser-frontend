Highcharts.theme = {
   colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
      '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
   chart: {
      backgroundColor: {
         linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
         stops: [
            [0, '#2a2a2b'],
            [1, '#3e3e40']
         ]
      },
      style: {
         fontFamily: '\'Unica One\', sans-serif'
      },
      plotBorderColor: '#606063'
   },
   title: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase',
         fontSize: '20px'
      }
   },
   subtitle: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase'
      }
   },
   xAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
         style: {
            color: '#A0A0A3'

         }
      }
   },
   yAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
         style: {
            color: '#A0A0A3'
         }
      }
   },
   tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
         color: '#F0F0F0'
      }
   },
   plotOptions: {
      series: {
         dataLabels: {
            color: '#B0B0B3'
         },
         marker: {
            lineColor: '#333'
         }
      },
      boxplot: {
         fillColor: '#505053'
      },
      candlestick: {
         lineColor: 'white'
      },
      errorbar: {
         color: 'white'
      }
   },
   legend: {
      itemStyle: {
         color: '#E0E0E3'
      },
      itemHoverStyle: {
         color: '#FFF'
      },
      itemHiddenStyle: {
         color: '#606063'
      }
   },
   credits: {
      style: {
         color: '#666'
      }
   },
   labels: {
      style: {
         color: '#707073'
      }
   },

   drilldown: {
      activeAxisLabelStyle: {
         color: '#F0F0F3'
      },
      activeDataLabelStyle: {
         color: '#F0F0F3'
      }
   },

   navigation: {
      buttonOptions: {
         symbolStroke: '#DDDDDD',
         theme: {
            fill: '#505053'
         }
      }
   },

   // scroll charts
   rangeSelector: {
      buttonTheme: {
         fill: '#505053',
         stroke: '#000000',
         style: {
            color: '#CCC'
         },
         states: {
            hover: {
               fill: '#707073',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            },
            select: {
               fill: '#000003',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            }
         }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
         backgroundColor: '#333',
         color: 'silver'
      },
      labelStyle: {
         color: 'silver'
      }
   },

   navigator: {
      handles: {
         backgroundColor: '#666',
         borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
         color: '#7798BF',
         lineColor: '#A6C7ED'
      },
      xAxis: {
         gridLineColor: '#505053'
      }
   },

   scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
   },

   // special colors for some of the
   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
   background2: '#505053',
   dataLabelsColor: '#B0B0B3',
   textColor: '#C0C0C0',
   contrastTextColor: '#F0F0F3',
   maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);



angular.module('whatsappAnalyzer')
    .directive('hiStackedColumn3d', function () {
                return {
                    restrict: 'E',
                    template: '<div></div>',
                    replace:true,
                    scope: {
                        category: '=',
                        fetched:'=fetched',
                        data:'=',
                        yTitle:'@',
                        title:'@'

                    },
                    link: function (scope, element) {
                         scope.$watch('fetched', function(newValue, oldValue) {                        
                              if (newValue) {
                                console.log('directive',scope.fetched);
                                 if(scope.fetched){
                                         Highcharts.chart(element[0], {
                                            chart: {
                                                type: 'column',
                                                options3d: {
                                                    enabled: true,
                                                    alpha: -7,
                                                    beta: -2,
                                                    viewDistance: 20,
                                                    depth: 40
                                                }
                                            },
                                            
                                            title: {
                                                text: scope.title
                                            },

                                            xAxis: {
                                                categories: scope.category,
                                                labels: {
                                                    style: {                                                    
                                                        fontSize:'3.6vmin'
                                                    }
                                                }
                                            },

                                            yAxis: {
                                                allowDecimals: false,
                                                min: 0,
                                                title: {
                                                    text: scope.yTitle
                                                }
                                            },

                                            tooltip: {
                                                useHTML: true,
                                                headerFormat: '<h4><b>{point.key}</b></h4><br>',
                                                pointFormat: '<h5> <span style="color:{series.color}">\u25CF <b>{series.name}</b></span>: {point.y} / {point.stackTotal}</h5>',
                                                
                                            },

                                            plotOptions: {
                                                column: {
                                                    stacking: 'normal',
                                                    depth: 17
                                                }
                                            },

                                            series: scope.data
                                        });
                                
                                    }
                              }
                          }, true);
                       
                    }
                };
    })
// Directive for pie charts, pass in title and data only    
            .directive('hiPieChart', function () {
                return {
                    restrict: 'E',
                    template: '<div></div>',
                    replace:true,
                    scope: {
                        title: '@',
                        data: '=',
                        fetched:'=fetched'
                    },
                    link: function (scope, element) {
                        scope.$watch('fetched', function(newValue, oldValue) {
                            
                            if (newValue !== oldValue) {
                                
                                if(scope.fetched){ 

                                    Highcharts.chart(element[0], {
                                        chart: {
                                            plotBackgroundColor: null,
                                            plotBorderWidth: null,
                                            plotShadow: false,
                                            type: 'pie'
                                        },
                                        title: {
                                            text: scope.title
                                        },
                                        tooltip: {
                                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                        },
                                        plotOptions: {
                                            pie: {
                                                allowPointSelect: true,
                                                cursor: 'pointer',
                                                dataLabels: {
                                                    enabled: true,
                                                    format: '<h3><b>{point.name}</b>: {point.y}</h3>',
                                                    style: {
                                                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                                    }
                                                }
                                            }
                                        },
                                        series: scope.data
                                    });
                                
                                }
                            }
                        }, true);
                    }
                };
            })
.directive('hiBarChart',function(){
                return {
                    restrict: 'E',
                    template: '<div></div>',
                    replace:true,
                    scope: {
                        title:'@',
                        category:'=',
                        data: '=',
                        fetched:'=fetched'
                    },
                    link: function (scope, element) {
                        
                        scope.$watch('fetched', function(newValue, oldValue) { 
                            if (newValue !== oldValue) {
                                if(scope.fetched){
                        
                                    Highcharts.chart(element[0], {
                                        chart: {
                                            type: 'bar'
                                        },
                                        title: {
                                            text: scope.title
                                        },                                
                                        yAxis: {
                                            min: 0,
                                            title: {
                                                text: 'distinct',
                                                align: 'high'
                                            },
                                            labels: {
                                                overflow: 'justify'
                                            }
                                        },
                                        tooltip: {
                                            valueSuffix: ''
                                        },
                                        plotOptions: {
                                            bar: {
                                                dataLabels: {
                                                    enabled: true
                                                }
                                            }
                                        },
                                        legend: {
                                            layout: 'vertical',
                                            align: 'right',
                                            verticalAlign: 'top',
                                            x: -40,
                                            y: 40,
                                            floating: true,
                                            borderWidth: 1,
                                            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                                            shadow: true
                                        },
                                        credits: {
                                            enabled: false
                                        },
                                        series: scope.data
                                    });
                                }
                            }
                        }, true);
                    }
                };
            })
.directive('hiCombinedChart',function(){
                return {
                    restrict: 'E',
                    template: '<div></div>',
                    replace:true,
                    scope: {
                        title:'@',
                        category:'=',
                        data: '=',
                        fetched:'=fetched'
                    },
                    link: function (scope, element) {

                            scope.$watch('fetched', function(newValue, oldValue) { 
                              
                            if (newValue !== oldValue) {
                                if(scope.fetched){ 
                                    Highcharts.chart(element[0], {
                                            title: {
                                                text: scope.title
                                            },
                                            xAxis: {
                                                categories: scope.category
                                            },
                                            labels: {
                                                items: [{
                                                    html: 'Avg Msg Per Day',
                                                    style: {
                                                        left: '330px',
                                                        top: '18px',
                                                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                                                    }
                                                }]
                                            },
                                            series: scope.data,
                                                
                                        });
                                    }
                                }
                            }, true);
                                    
                    
                        }
                }
            })
.directive('hiBasicColumnChart',function(){
                return {
                    restrict: 'E',
                    template: '<div></div>',
                    replace:true,
                    scope: {
                        title:'@',
                        category:'=',
                        data: '=',
                        fetched:'=fetched'
                    },
                    link: function (scope, element) {
                        scope.$watch('fetched', function(newValue, oldValue) {                            
                            if (newValue !== oldValue) {
                                if(scope.fetched){ 
                                    Highcharts.chart(element[0], {
                                        chart: {
                                            type: 'column'
                                        },
                                        title: {
                                            text: scope.title
                                        },
                                        xAxis: {
                                            categories: scope.category,
                                            crosshair: true
                                        },
                                        yAxis: {
                                            min: 0,
                                            title: {
                                                text: ''
                                            }
                                        },
                                        tooltip: {
                                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                                            footerFormat: '</table>',
                                            shared: true,
                                            useHTML: true
                                        },
                                        plotOptions: {
                                            column: {
                                                pointPadding: 0.2,
                                                borderWidth: 0
                                            }
                                        },
                                        series: scope.data
                                    });
                                }
                            }
                        }, true);

                    }
                }
            })