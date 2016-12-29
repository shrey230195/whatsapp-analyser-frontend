'use strict';

var ExampleCtrl = function($rootScope, $document, $scope) {
	$scope.isReady=false;
	$scope.animation = {};
	$scope.animation.current = 'zoomIn';
	$scope.animation.previous = $scope.animation.current;
	$scope.fuck=[1,2,3,4,1,2,3,4,2,4,9];

	// only required for dynamic animations
	$scope.changeAnimation = function() {

		var elements = document.getElementsByClassName('element');
		var $elements = angular.element(elements);

		$elements.removeClass('animated ' + $scope.animation.previous);
		$elements.addClass('not-visible');

		$scope.animation.previous = $scope.animation.current;
		$document[0].dispatchEvent(new CustomEvent('scroll'));
	};

	

	$scope.animateElementIn = function($el) {
		$el.removeClass('not-visible');
		$el.addClass('animated ' + $scope.animation.current);
		$scope.isReady=true;
	};

	$scope.animateElementOut = function($el) {
		$el.addClass('not-visible');
		$el.removeClass('animated ' + $scope.animation.current);
		$scope.isReady=false;
	};
};

angular.module('whatsappAnalyzer').controller('ExampleCtrl', ExampleCtrl);
angular.module('whatsappAnalyzer')
	.directive('hcChart', function () {
                return {
                    restrict: 'E',
                    template: '<div></div>',
                    replace:true,
                    scope: {
                        category: '=',
                        fetched:'=fetched',
                        data:'=',
                        heading:'@'

                    },
                    link: function (scope, element) {
                         scope.$watch('fetched', function(newValue, oldValue) {
                            console.log(scope.fetched);
                              if (newValue !== oldValue) {
                                 if(scope.fetched){
                                     Highcharts.chart(element[0], {
							            chart: {
							                zoomType: 'x'
							            },
							            title: {
							                text: 'Balance in Accounts over time'
							            },
							            subtitle: {
							                text: document.ontouchstart === undefined ?
							                        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
							            },
							            xAxis: {
							                type: 'datetime'
							            },
							            yAxis: {
							                title: {
							                    text: 'Amount in Crore' 
							                }
							            },
							            legend: {
							                enabled: false
							            },
							            plotOptions: {
							                area: {
							                    fillColor: {
							                        linearGradient: {
							                            x1: 0,
							                            y1: 0,
							                            x2: 0,
							                            y2: 1
							                        },
							                        stops: [
							                            [0, Highcharts.getOptions().colors[0]],
							                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
							                        ]
							                    },
							                    marker: {
							                        radius: 2
							                    },
							                    lineWidth: 1,
							                    states: {
							                        hover: {
							                            lineWidth: 1
							                        }
							                    },
							                    threshold: null
							                }
							            },

							            series: [{
							                type: 'area',
							                name: 'Balance_in_account',
							                data: [
												[Date.UTC(2014,3,17),0.7238],
												[Date.UTC(2014,3,18),0.7238],
												[Date.UTC(2014,3,20),0.7239],
												[Date.UTC(2014,3,21),0.7250],
												[Date.UTC(2014,3,22),0.7244],
												[Date.UTC(2014,3,23),0.7238],
												[Date.UTC(2014,3,24),0.7229],
												[Date.UTC(2014,3,25),0.7229],
												[Date.UTC(2014,3,27),0.7226],
												[Date.UTC(2014,3,28),0.7220],
												[Date.UTC(2014,3,29),0.7240],
												[Date.UTC(2014,3,30),0.7211],
												[Date.UTC(2014,4,1),0.7210],
												[Date.UTC(2014,4,2),0.7209],
												[Date.UTC(2014,4,4),0.7209],
												[Date.UTC(2014,4,5),0.7207],
												[Date.UTC(2014,4,6),0.7180],
												[Date.UTC(2014,4,7),0.7188],
												[Date.UTC(2014,4,8),0.7225],
												[Date.UTC(2014,4,9),0.7268],
												[Date.UTC(2014,4,11),0.7267],
												[Date.UTC(2014,4,12),0.7269],
												[Date.UTC(2014,4,13),0.7297],
												[Date.UTC(2014,4,14),0.7291],
												[Date.UTC(2014,4,15),0.7294],
												[Date.UTC(2014,4,16),0.7302],
												[Date.UTC(2014,4,18),0.7298],
												[Date.UTC(2014,4,19),0.7295],
												[Date.UTC(2014,4,20),0.7298],
												[Date.UTC(2014,4,21),0.7307],
												[Date.UTC(2014,4,22),0.7323],
												[Date.UTC(2014,4,23),0.7335],
												[Date.UTC(2014,4,25),0.7338],
												[Date.UTC(2014,4,26),0.7329],
												[Date.UTC(2014,4,27),0.7335],
												[Date.UTC(2014,4,28),0.7358],
												[Date.UTC(2014,4,29),0.7351],
												[Date.UTC(2014,4,30),0.7337],
												[Date.UTC(2014,5,1),0.7338],
												[Date.UTC(2014,5,2),0.7355],
												[Date.UTC(2014,5,3),0.7338],
												[Date.UTC(2014,5,4),0.7353],
												[Date.UTC(2014,5,5),0.7321],
												[Date.UTC(2014,5,6),0.7330],
												[Date.UTC(2014,5,8),0.7327],
												[Date.UTC(2014,5,9),0.7356],
												[Date.UTC(2014,5,10),0.7381],
												[Date.UTC(2014,5,11),0.7389],
												[Date.UTC(2014,5,12),0.7379],
												[Date.UTC(2014,5,13),0.7384],
												[Date.UTC(2014,5,15),0.7388],
												[Date.UTC(2014,5,16),0.7367],
												[Date.UTC(2014,5,17),0.7382],
												[Date.UTC(2014,5,18),0.7356],
												[Date.UTC(2014,5,19),0.7349],
												[Date.UTC(2014,5,20),0.7353],
												[Date.UTC(2014,5,22),0.7357],
												[Date.UTC(2014,5,23),0.7350],
												[Date.UTC(2014,5,24),0.7350],
												[Date.UTC(2014,5,25),0.7337],
												[Date.UTC(2014,5,26),0.7347],
												[Date.UTC(2014,5,27),0.7327],
												[Date.UTC(2014,5,29),0.7330],
												[Date.UTC(2014,5,30),0.7304],
												[Date.UTC(2014,6,1),0.7310],
												[Date.UTC(2014,6,2),0.7320],
												[Date.UTC(2014,6,3),0.7347],]
							            }]
							        });
							    
                                    }
                              }
                          }, true);
                       
                    }
                };
    })
// Directive for pie charts, pass in title and data only    
            .directive('hcPieChart', function () {
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
								            text: 'Total Accounts from sept 2014 to Feb, 2016'
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
								                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
								                    style: {
								                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
								                    }
								                }
								            }
								        },
								        series: [{
								            name: 'Months',
								            colorByPoint: true,
								            data: [{
								                name: "Mar'15",
								                y: 16.33
								            }, {
								                name: "Jun'15",
								                y: 24.03,
								                sliced: true,
								                selected: true
								            }, {
								                name: "Sep'15",
								                y: 30.38
								            }, {
								                name: "Nov'15",
								                y: 9.77
								            }, {
								                name: "Jan'16",
								                y: 2.91
								            }]
								        }]
								    });
								
                                }
                            }
                        }, true);
                    }
                };
            })
.directive('hiColumnChart',function(){
                return {
                    restrict: 'E',
                    template: '<div></div>',
                    replace:true,
                    scope: {
                        category:'=',
                        data: '=',
                        fetched:'=fetched'
                    },
                    link: function (scope, element) {
                        
                             Highcharts.chart(element[0], {

						        chart: {
						            type: 'bubble',
						            plotBorderWidth: 1,
						            zoomType: 'xy'
						        },

						        legend: {
						            enabled: false
						        },

						        title: {
						            text: 'no_of_rupay_cards and total_account per Bank'
						        },

						        xAxis: {
						            gridLineWidth: 1,
						            title: {
						                text: 'no_of_rupay_cards'
						            },
						            labels: {
						                format: '{value}'
						            },
						            plotLines: [{
						                color: 'black',
						                dashStyle: 'dot',
						                width: 2,
						                value: 65,
						                label: {
						                    rotation: 0,
						                    y: 15,
						                    style: {
						                        fontStyle: 'italic'
						                    },
						                    text: ''
						                },
						                zIndex: 3
						            }]
						        },

						        yAxis: {
						            startOnTick: false,
						            endOnTick: false,
						            title: {
						                text: 'total_account'
						            },
						            labels: {
						                format: '{value} '
						            },
						            maxPadding: 0.2,
						            plotLines: [{
						                color: 'black',
						                dashStyle: 'dot',
						                width: 2,
						                value: 50,
						                label: {
						                    align: 'right',
						                    style: {
						                        fontStyle: 'italic'
						                    },
						                    text: '',
						                    x: -10
						                },
						                zIndex: 3
						            }]
						        },

						        tooltip: {
						            useHTML: true,
						            headerFormat: '<table>',
						            pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
						                '<tr><th>no_of_rupay_cards:</th><td>{point.x}%</td></tr>' +
						                '<tr><th>total_account:</th><td>{point.y}%</td></tr>' +
						                '<tr><th>zero_balance:</th><td>{point.z}%</td></tr>',
						            footerFormat: '</table>',
						            followPointer: true
						        },

						        plotOptions: {
						            series: {
						                dataLabels: {
						                    enabled: true,
						                    format: '{point.name}'
						                }
						            }
						        },

						        series: [{
						            data: [
						                { x: 95, y: 95, z: 13.8, name: 'HDFC', bank_type: 'Major Private Banks' },
						                { x: 86.5, y: 102.9, z: 14.7, name: 'IDBI', bank_type: 'Rural Regional Bank' },
						                { x: 80.8, y: 91.5, z: 15.8, name: 'Kotak', bank_type: 'Public Sector Banks' },
						                { x: 80.4, y: 102.5, z: 12, name: 'Syndicate Bank', bank_type: 'Rural Regional Bank' },
						                { x: 80.3, y: 86.1, z: 11.8, name: 'Fedral', bank_type: 'Major Private Banks' },
						                { x: 78.4, y: 70.1, z: 16.6, name: 'Vijaya Bank', bank_type: 'Public Sector Banks' },
						                { x: 74.2, y: 68.5, z: 14.5, name: 'Uco Bank', bank_type: 'Rural Regional Bank' },
						                { x: 73.5, y: 83.1, z: 10, name: 'Bhartiya Mahila Bank', bank_type: 'Public Sector Banks' },
						                { x: 71, y: 93.2, z: 24.7, name: 'ICICI', bank_type: 'Major Private Banks' },
						                { x: 69.2, y: 57.6, z: 10.4, name: 'State Bank of Mysore', bank_type: 'Rural Regional Bank' },
						                { x: 68.6, y: 20, z: 16, name: 'Axis', bank_type: 'Major Private Banks' },
						                { x: 65.5, y: 126.4, z: 35.3, name: 'Vijaya Bank', bank_type: 'Public Sector Banks' },
						                { x: 65.4, y: 50.8, z: 28.5, name: 'Allahabad Bank', bank_type: 'Rural Regional Bank' },
						                { x: 63.4, y: 51.8, z: 15.4, name: 'IndusInd', bank_type: 'Major Private Banks' },
						                { x: 64, y: 82.9, z: 31.3, name: 'Andhra Bank', bank_type: 'Rural Regional Bank' }
						            ]
						        }]

						    });
                        
                    }
                };
            })
.directive('hiCombinedChart',function(){
                return {
                    restrict: 'E',
                    template: '<div></div>',
                    replace:true,
                    scope: {
                        fetched:'=fetched'
                    },
                    link: function (scope, element) {
  									Highcharts.chart(element[0], {
									        title: {
									            text: ''
									        },
									        xAxis: {
									            categories: ["nov'14","jan'15","mar'15","may'15","jul'15","sep'15","dec'15","jan'16"]
									        },
									        yAxis:{
									        	categories:[10000,20000,30000]
									        },
									        labels: {
									            items: [{
									                html: 'Total',
									                style: {
									                    left: '220px',
									                    top: '18px',
									                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
									                }
									            }]
									        },
									        series: [{
									            type: 'column',
									            name: 'Total Accounts',
									            data: [722030,466432,532407,399613,644761,711993,800332]
									        }, {
									            type: 'column',
									            name: 'Adhar seeded',
									            data: [165664,109563,132091,200236,154403,160032,171519]
									        }, {
									            type: 'column',
									            name: 'zero balance',
									            data: [810033,788332,441194,783510,809715,683460,439917]
									        },{
									            type: 'column',
									            name: 'Rupay card issued',
									            data: [907588.0,870451,684035,483718,449210,794037,900234]
									        }, {
									            type: 'spline',
									            name: 'Average',
									            data: [740092, 13000, 410053, 608934, ,544110,420124,716110],
									            marker: {
									                lineWidth: 2,
									                lineColor: Highcharts.getOptions().colors[3],
									                fillColor: 'white'
									            }
									        }, {
									            type: 'pie',
									            name: 'Total',
									            data: [{
									                name: 'Total Accounts',
									                y: 1333459,
									                color: Highcharts.getOptions().colors[0] // Jane's color
									            }, {
									                name: 'Total Adhar seeded',
									                y:1100032,
									                color: Highcharts.getOptions().colors[1] // John's color
									            }, {
									                name: 'Total zero balance',
									                y: 990023,
									                color: Highcharts.getOptions().colors[2] // Joe's color
									            },{
									                name: 'Total Rupay card issued',
									                y: 800032,
									                color: Highcharts.getOptions().colors[3] // Joe's color
									            }],
									            center: [310, 30],
									            size: 100,
									            showInLegend: true,
									            dataLabels: {
									                enabled: false
									            }
									        }]
									    });
									
                    
                		}
                }
            })
