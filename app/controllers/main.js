'use strict';

var whatsappCtrl = function($rootScope, $document, $scope,dataFactory) {
	$scope.isReady=false;
	$scope.animation = {};
	$scope.animation.current = 'zoomIn';
	$scope.animation.previous = $scope.animation.current;
	$scope.senderTotalMsg={
		'contribution':[],
		'totalMsg':[],
		'msgLen':[],
		'msgLenContribution':[],
		'totalWords':[],
		'wordsContribution':[],
		'avgMsgLen':[],
		'avgWordsPerMsg':[],
		'avgMsgPerDay':[],
		'avgMsgLenPerDay':[],
		'avgWordsPerDay':[],
		'totalEmoji':[],
		'totalEmojiContribution':[],
		'distinctEmoji':[],
		'topEmojiCategories':[],
		'topTotalEmojiChart':[],
		'isShownTopEmoji':[],
	};
	$scope.avgChartdata=[];
	$scope.dailyChartdata=[];
	$scope.messageCount;
	$scope.isFetched=false;
	$scope.isFetchedAvg=false;
	$scope.isFetchedDay=false;
	$scope.isFetchedEmoji=false;
	$scope.isFetchedTopEmoji=false;
	$scope.filledPartStyle = {};
	$scope.isTotal3d=true;
	$scope.isSender3d=false;
	$scope.isEmojiChart=true;
	$scope.isEmojiTabular=false;
	$scope.senderClicked=[];
	$scope.senderClicked[99]='sender-clicked';
	$scope.typeClicked=[];
	$scope.typeClicked[1]='type-clicked';
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
	};
	$scope.animateElementOut = function($el) {
		$el.addClass('not-visible');
		$el.removeClass('animated ' + $scope.animation.current);
	};
	$scope.getParticipants=function(){
		dataFactory.getParticipants()
		.then(function(response){
			
			$scope.senders=response.data.senders;
		
		},function(error){
			console.log(error);
		})
	}
	$scope.getMessageCount=function(){
		dataFactory.getMessageCount()
		.then(function(response) {
                $scope.messageCount= response.data;
                $scope.totalMsgs=$scope.messageCount.total_msg;
                angular.forEach($scope.messageCount.sender.total_msg,function(item,key){
                	$scope.senderTotalMsg.totalMsg.push(item)
                });
                angular.forEach($scope.messageCount.sender.contribution,function(entity){
                		$scope.senderTotalMsg.contribution.push(entity)
                })
                
                $scope.filledPartStyle['total-msg-left']={
              		'width':$scope.senderTotalMsg.contribution[0]+'%'
              	}
              	$scope.filledPartStyle['total-msg-right']={
              		'width':$scope.senderTotalMsg.contribution[1]+'%'
              	}
              },function(error){
              	console.log('fish',error);
              }).finally(function(){
              	$scope.isFetched=true;              
              });
	};
	$scope.getTotalMessageStat=function(){
		dataFactory.getTotalMessageStat()
		.then(function(response) {             
                $scope.totalMessageStat=response.data;
       			$scope.totalMsgLen=$scope.totalMessageStat.total_msg_len;
       			$scope.totalWords=$scope.totalMessageStat.total_words;
       			angular.forEach($scope.totalMessageStat.sender.msg_len,function(item,key){
                	$scope.senderTotalMsg.msgLen.push(item)
                });
                angular.forEach($scope.totalMessageStat.sender.msg_percent,function(entity){
                		$scope.senderTotalMsg.msgLenContribution.push(entity)
                });
                angular.forEach($scope.totalMessageStat.sender.total_words,function(item,key){
                	$scope.senderTotalMsg.totalWords.push(item)
                });
                angular.forEach($scope.totalMessageStat.sender.word_percent,function(entity){
                		$scope.senderTotalMsg.wordsContribution.push(entity)
                });
                $scope.filledPartStyle['msg-len-left']={
              		'width':$scope.senderTotalMsg.msgLenContribution[0]+'%'
              	}
              	$scope.filledPartStyle['msg-len-right']={
              		'width':$scope.senderTotalMsg.msgLenContribution[1]+'%'
              	}
              	$scope.filledPartStyle['total-words-left']={
              		'width':$scope.senderTotalMsg.wordsContribution[0]+'%'
              	}
              	$scope.filledPartStyle['total-words-right']={
              		'width':$scope.senderTotalMsg.wordsContribution[1]+'%'
              	}
              	
              },function(error){
              	console.log('fish',error);
              });
	};	
	$scope.getAvgMsgStat=function(){
		dataFactory.getAvgMsgStat()
		.then(function(response){
			var avgMsgStat=response.data
			$scope.avgMsgLen=avgMsgStat.avg_msg_len;
			$scope.avgWordsPerMsg=avgMsgStat.avg_words_per_msg;
			angular.forEach(avgMsgStat.sender.avg_msg_len,function(item,key){
                $scope.senderTotalMsg.avgMsgLen.push(item)
            });
            angular.forEach(avgMsgStat.sender.avg_words_per_msg,function(entity){
                $scope.senderTotalMsg.avgWordsPerMsg.push(entity)
            });
            $scope.prepareAvgChart();
		},function(error){
			console.log('avgMsgStat:',error);
		}).finally(function(){
              	$scope.isFetchedAvg=true;              
              });
	}
	$scope.getAvgMsgPerDay = function(){
		 dataFactory.getAvgMsgPerDay()
		 .then(function(response){
		 	var perDayStat=response.data;
		 	$scope.avgMsgPerDay=perDayStat.avg_msg_per_day;
		 	$scope.avgMsgLenPerDay=perDayStat.avg_msg_len_per_day;
		 	$scope.avgWordsPerDay=perDayStat.avg_words_per_day;
		 	angular.forEach(perDayStat.sender.avg_msg_per_day,function(item,key){
                $scope.senderTotalMsg.avgMsgPerDay.push(item)
            });
            angular.forEach(perDayStat.sender.avg_msg_len_per_day,function(entity){
                $scope.senderTotalMsg.avgMsgLenPerDay.push(entity)
            });
            angular.forEach(perDayStat.sender.avg_words_per_day,function(entity){
                $scope.senderTotalMsg.avgWordsPerDay.push(entity)
            });
            $scope.prepareDailyChart();
		},function(error){
			console.log(error);
		}).finally(function(){
              	$scope.isFetchedDay=true;              
        });;
	}
	$scope.getTotalEmoji = function(){
		dataFactory.getTotalEmoji()
		.then(function(response){
			var totalEmojiData=response.data;
			$scope.totalEmoji=totalEmojiData.total_emojis
			angular.forEach(totalEmojiData.sender.total,function(entity){
                $scope.senderTotalMsg.totalEmoji.push(entity)
            });
            angular.forEach(totalEmojiData.sender.contribution,function(entity){
                $scope.senderTotalMsg.totalEmojiContribution.push(entity)
            });
            $scope.prepareEmojiChart();
		},function(error){
			console.log(error);
		}).finally(function(){
              	$scope.isFetchedEmoji=true;              
        });
	};
	$scope.getDistinctEmoji = function(){
		dataFactory.getDistinctEmoji()
		.then(function(response){
			var distinctEmojiData=response.data;
			$scope.distinctEmoji=distinctEmojiData.total;
			angular.forEach(distinctEmojiData.sender,function(entity){
                $scope.senderTotalMsg.distinctEmoji.push(entity)
            });
            $scope.prepareDistinctEmojiChart();
		},function(error){
			console.log(error);
		}).finally(function(){
              	$scope.isFetchedDistinctEmoji=true;              
        });

	}
	$scope.getTopEmoji = function(){
		dataFactory.getTopEmoji()
		.then(function(response){
			console.log(response.data);
			$scope.topTotalEmoji=response.data.total;
			$scope.senderTopTotalEmoji=response.data.sender;
			$scope.topEmojiCategories=$scope.prepareTopTotalEmojiChart($scope.topTotalEmoji)[0];
			$scope.topTotalEmojiChart=$scope.prepareTopTotalEmojiChart($scope.topTotalEmoji)[1];
			$scope.topTotalEmojiData=$scope.topTotalEmoji;
			angular.forEach($scope.senders,function(sender,key){
				$scope.senderTotalMsg.isShownTopEmoji[key]=false;                			
                $scope.senderTotalMsg.topEmojiCategories.push($scope.prepareTopTotalEmojiChart($scope.senderTopTotalEmoji[sender])[0]);
                $scope.senderTotalMsg.topTotalEmojiChart.push($scope.prepareTopTotalEmojiChart($scope.senderTopTotalEmoji[sender])[1])
            });
		},function(error){
			console.log(error);
		}).finally(function(){
			$scope.isFetchedTopEmoji=true;
		});
	}
	$scope.prepareAvgChart=function(){
		$scope.categories=['Avg Msg Length','Avg Words Per Msg'];
		
		var overall={
			name:'overall',
			data:[parseFloat($scope.avgMsgLen),parseFloat($scope.avgWordsPerMsg)]
		}
		$scope.avgChartdata.push(overall);

		angular.forEach($scope.senders,function(item,key){
                var value={
                	name:item,
                	data:[parseFloat($scope.senderTotalMsg.avgMsgLen[key]),parseFloat($scope.senderTotalMsg.avgWordsPerMsg[key])]
                }
                $scope.avgChartdata.push(value);
               
            });
		
	}
	$scope.prepareDailyChart=function(){
		$scope.dayCategories=['Avg Msg Length Per Day','Avg Words Per Day'];
		var dailyChartColumnData=[];
		var overall={
			type:'column',
			name:'overall',
			data:[parseFloat($scope.avgMsgLenPerDay),parseFloat($scope.avgWordsPerDay)]
		}
		var pieData={
			type:'pie',
			name:'Avg Msg Per Day',
			data:[],
			center: ['130vw', '58vh'],
            size: 100,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
		}
		dailyChartColumnData.push(overall);

		angular.forEach($scope.senders,function(item,key){
                var value={
                	type:'column',
                	name:item,
                	data:[parseFloat($scope.senderTotalMsg.avgMsgLenPerDay[key]),parseFloat($scope.senderTotalMsg.avgWordsPerDay[key])]
                }
                dailyChartColumnData.push(value);
               
            });
		angular.forEach($scope.senders,function(item,key){
			var value={
				name: item,
                y: parseFloat($scope.senderTotalMsg.avgMsgPerDay[key]),
                color: Highcharts.getOptions().colors[key+1]
			}
			pieData.data.push(value);
		});
		dailyChartColumnData.push(pieData);
		angular.extend($scope.dailyChartdata,dailyChartColumnData);

	}
	$scope.prepareEmojiChart=function(){
		$scope.totalEmojiChart=[];
		var pieData={
			name: 'Total emojis',
            colorByPoint: true,
			data:[]
		}
		angular.forEach($scope.senders,function(item,key){
			var value;
			if(key==0){
					value={
					name: item,
	                y: parseFloat($scope.senderTotalMsg.totalEmoji[key]),
	                sliced: true,
	                selected: true
				}	
			}else{
				var value={
					name: item,
	                y: parseFloat($scope.senderTotalMsg.totalEmoji[key]),
				}
			}
			
			pieData.data.push(value);
		});
		$scope.totalEmojiChart.push(pieData);
	}
	$scope.prepareDistinctEmojiChart=function(){
		$scope.distinctEmojiChart=[];
		var value={
			name: 'overall',
            data: [parseFloat($scope.distinctEmoji)]
		}
		$scope.distinctEmojiChart.push(value);
		angular.forEach($scope.senders,function(item,key){
			var value={
				name: item,
            	data: [parseFloat($scope.senderTotalMsg.distinctEmoji[key])]
			}
			$scope.distinctEmojiChart.push(value);
		});
	}
	$scope.prepareTopTotalEmojiChart=function(data){

		var topEmojiCategories=Object.values(data.emoji)
		var topTotalEmojiChart=[];
		
		var value={
			name: 'overall',
            data: Object.values(data.freq),
            stack: 'Total'
		}
		topTotalEmojiChart.push(value);
		angular.forEach($scope.senders,function(item,key){
			angular.forEach(data,function(obj,index){
				if(item==index){
					var value={
						name: item,
		            	data: Object.values(obj),
		            	stack:'sender'
					}
					topTotalEmojiChart.push(value);
				}
			});
			
		});

		return [topEmojiCategories,topTotalEmojiChart];
	}
	$scope.showTabular=function(){
		$scope.isEmojiChart=false;
		$scope.isEmojiTabular=true;
		$scope.typeClicked.length=0;
		$scope.typeClicked[0]='type-clicked';
	}
	$scope.showChart=function(){
		$scope.isEmojiChart=true;
		$scope.isEmojiTabular=false;
		$scope.typeClicked.length=0;
		$scope.typeClicked[1]='type-clicked';
	}
	$scope.changeTopEmojiData=function(sender){
		$scope.senderClicked.length=0;

		if($scope.isEmojiChart==true){
				angular.forEach($scope.senders,function(send,key){
						console.log(key);
						$scope.senderTotalMsg.isShownTopEmoji[key]=false;
						if(send==sender){
							$scope.senderTotalMsg.isShownTopEmoji[key]=true;
							$scope.senderClicked[key]='sender-clicked';
						}
		                
		        });
		}
		if ($scope.isEmojiTabular==true) {
			$scope.senderClicked.length=0;
			angular.forEach($scope.senders,function(send,key){
						$scope.senderTotalMsg.isShownTopEmoji[key]=false;
						if(send==sender){
							$scope.topTotalEmojiData=$scope.senderTopTotalEmoji[send];
							$scope.senderTotalMsg.isShownTopEmoji[key]=true;
							$scope.senderClicked[key]='sender-clicked';
						}
		                
		        });
			console.log('topTotalEmojiData',$scope.topTotalEmojiData);
		};
		
		
	};
	$scope.isTotalClicked=function(){
		$scope.senderClicked.length=0;
		$scope.senderClicked[99]='sender-clicked';
		angular.forEach($scope.senders,function(send,key){
				$scope.senderTotalMsg.isShownTopEmoji[key]=false;        
        });
	}
	$scope.getParticipants();
	$scope.getMessageCount();
	$scope.getTotalMessageStat();
	$scope.getAvgMsgStat();
	$scope.getAvgMsgPerDay();
	$scope.getTotalEmoji();
	$scope.getDistinctEmoji();
	$scope.getTopEmoji();
	
};

angular.module('whatsappAnalyzer').controller('main', whatsappCtrl);
