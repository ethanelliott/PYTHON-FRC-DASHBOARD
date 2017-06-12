google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(dashboardInit);

var mainLoopObjectRef;

var eGuage = function(divid, name, op, startVal) {
	this.options = op;
	this.id = divid;
	this.data = google.visualization.arrayToDataTable([
		['Label', 'Value'],
		[name, startVal],
	]);
	this.chart = new google.visualization.Gauge(document.getElementById(this.id));
	this.chart.draw(this.data, this.options);

	this.show = function(x) {
		console.log("WHAT");
		this.chart = new google.visualization.Gauge(document.getElementById(this.id));
		this.data.setValue(0, 1, x);
		this.chart.draw(this.data, this.options);
	};
};

var mainLoop = function(objs) {
	objs.testGuage.show();
	if (NetworkTables.isRobotConnected())
	{
		$("#statusIndicator").css({"background":"#00FF00"});
	}
	else
	{
		$("#statusIndicator").css({"background":"#FF0000"});
	}
};

function dashboardInit() {
	try {
		console.log("Starting Web Dashboard");
	    mainLoopObjectRef = setInterval(mainLoop, 50, {testGuage: eGuage('chart_div', 'lmao', {max:100, width:600, height:600},100)});
	    console.log("Web Dashboard Started!");
	    NetworkTables.addRobotConnectionListener(function(connected){
	      console.log("Robot connected: " + connected);
	      var rbt = NetworkTables.getRobotAddress();
	      $("#address").html(rbt);
	    }, true);
	}
	catch(err)
	{
		console.log(err.message);
	}
}
