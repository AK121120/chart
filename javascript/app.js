/*
 * Parse the data and create a graph with the data.
 */
var moviename=[];
var movieId = [];
var rating = ["ratings"];
var id=[];
let user;
let ty='';
let state=true;
let tableBody = '';
function parseData(createGraph) {
	Papa.parse("../data/ratings_small.csv", {
		download: true,
		complete: function(results) {
			createGraph(results.data);
		}
	});
}

function getmovie(){
	Papa.parse("../data/Book.csv", {
		download: true,
		complete: function(results) {
			get(results.data);
		}
	});
}
function get(info){
	for (var k=0; k<movieId.length;k++){
		for (var j = 1; j< info.length; j++){
			if (info[j][0]==movieId[k]){
				moviename[k]=new Array(2);
				moviename[k][0]=info[j][0];
				moviename[k][1]=info[j][1];
			}
		}
	}
	console.log(moviename);
	table();
}

function createGraph(data) {
	console.log(data);
	for (var i = 1; i < data.length; i++) {
		if(data[i][0]==user){
			id.push(data[i][0]);
			movieId.push(data[i][1]);
			rating.push(data[i][2]);
		}
		else{
			continue;
		}
	}
	getmovie();
	console.log(id,movieId,rating,moviename);
	var chart = c3.generate({
		bindto: '#chart',
	    data: {
	        columns: [
	        	rating
	        ],

			type: ty
	    },
	    axis: {
	        x: {
	            type: 'category',
	            categories: movieId,
	            tick: {
	            	multiline: false,
                	culling: {
                    	max: 20
                	}
            	}
	        }
	    },
		bar:{
			width:{
				ratio:0.5
			}
		},
	    zoom: {
        	enabled: true
    	},
	    legend: {
	        position: 'bottom'
	    }
	});
}


function gradeTable ( moviename ) {

	const tableHead = `
		<table >
			<thead>
				<tr class='highlight-row'>
					<th>ID </th>
					<th>Movie ID</th>
					<th>Title</th>
				</tr>
			</thead>
			<tbody>
	`;

	const tableFoot = `
			</tbody>
		</table>
	`;

	for ( let i = 0; i < moviename.length; i += 1 ) {

		let id = moviename[i][0];
		let title = moviename[i][1];
		tableBody += `
			<tr>
				<td>${i+1}</td>
				<td>${id}</td>
				<td>${title}</td>
			</tr>
		`
	}

	return tableHead + tableBody + tableFoot;
}
function table(){
document.querySelector('.tab')
	.insertAdjacentHTML(
		'afterbegin',
		gradeTable( moviename)
	)}

	function processForm()
	{
	  var val = location.search.substring(1).split("&");
	  var temp = val[0].split("=");
	  user = unescape(temp[1]);
	  if (user>0 && user<11){
		parseData(createGraph);
	  }else{
		alert("Enter number between 1-10");
		 window.location.href="index.html";
	  }
	}
	if (state){
		processForm();
	}

function graphdisplay(){
	if (ty==''){
		ty='bar'
		document.getElementById("grp").value="Graph Chart";
	}else{
		ty='';
		document.getElementById("grp").value="Bar Chart";
	}
	state=false;
	moviename=[];
	movieId = [];
	rating = ["ratings"];
	id=[];
	tableBody='';
	document.querySelector('.tab').innerHTML="";
	parseData(createGraph);

}
