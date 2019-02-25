//clicking station link hides rows not in station
//re-calculates column totals in footer
//with hidden rows, corrects alternating row color
var Station1 = ["Oscar Meyer", "Wal-Mart", "Valero Energy", "Procter Gamble"];
var Station2 = ["Intel", "Caterpillar"];
var Station3 = ["Costco Wholesale", "Home Depot", "Walgreen", "Dell", "PepsiCo", "MetLife", "Citigroup"];
var Station4 = ["Boeing", "Target", "Johnson & Johnson", "Pfizer", "Dow Chemical", "Best Buy"];
var Station5 = ["Coca-Cola", "FedEx", "Sears", "Amazon.com ", "Comcast"];
var Station6 = ["United Parcel Service", "Kraft Foods", "Lowe's"];
function showStation(id) {
	var placed=0,priorplaced=0,inprog=0,inprogbat=0,shipped=0,picked=0,pending=0,pendingprod=0,pendingauth=0,pickhold=0,packhold=0,payhold=0,packed=0,shipclear=0,trackhold=0,addrhold=0;
	$('#ClientGrid tr').each(function () {
		str = $(this).children("td:nth-child(1)").text(); //get client name
		if ($.inArray(str, eval($(id).text().replace(/\s/g, ''))) == -1 && str != "Company Name") {
			$(this).hide(); //hide client rows not in station as well as footer
		}
		else if (str != "Company Name") { //sum each column (of client rows in station) (ignore header)
			$(this).show();
			placed += parseInt($(this).children("td:nth-child(2)").text());
			priorplaced += parseInt($(this).children("td:nth-child(3)").text());
			inprog += parseInt($(this).children("td:nth-child(4)").text());
			inprogbat += parseInt($(this).children("td:nth-child(5)").text());
			shipped += parseInt($(this).children("td:nth-child(6)").text());
			picked += parseInt($(this).children("td:nth-child(7)").text());
			pending += parseInt($(this).children("td:nth-child(8)").text());
			pendingprod += parseInt($(this).children("td:nth-child(9)").text());
			pendingauth += parseInt($(this).children("td:nth-child(10)").text());
			pickhold += parseInt($(this).children("td:nth-child(11)").text());
			packhold += parseInt($(this).children("td:nth-child(12)").text());
		}
		else if (str == "Totals") {
			$(this).remove(); //remove any previously appended footer, will create new one
		}
	});
	//create new footer
	var trow = '<tr class="CartListFooter">';
	trow += '<td>Totals</td>';
	trow += '<td>' + placed + '</td>';
	trow += '<td>' + priorplaced + '</td>';
	trow += '<td>' + inprog + '</td>';
	trow += '<td>' + inprogbat + '</td>';
	trow += '<td>' + shipped + '</td>';
	trow += '<td>' + picked + '</td>';
	trow += '<td>' + pending + '</td>';
	trow += '<td>' + pendingprod + '</td>';
	trow += '<td>' + pendingauth + '</td>';
	trow += '<td>' + pickhold + '</td>';
	trow += '<td>' + packhold + '</td>';
	$('#ClientGrid tr:last').after(trow); //append new footer
	$('#ClientGrid tr:visible').filter(':even').css('background-color', '#F2F2F2');
	$('#ClientGrid tr:visible').filter(':odd').css('background-color', '#FFFFFF');
	$('#ClientGrid tr:first, tr:last').css('background-color', '#EBEBEB');
	$('#linkShowAll').show();
	$('.ContentHead').text('Today\'s Status - ' + $(id).text());
}

function showAll() {
	$('#ClientGrid tr').each(function () {
		if ($(this).children('td:nth-child(1)').text() == "Totals") {
			$(this).remove(); //remove station footer
		}
		else {
			$(this).show(); //show all other rows
		}
	});
	$('#ClientGrid tr:visible').filter(':even').css('background-color', '#F2F2F2');
	$('#ClientGrid tr:visible').filter(':odd').css('background-color', '#FFFFFF');
	$('#ClientGrid tr:first, tr:last').css('background-color', '#EBEBEB');
	$('#linkShowAll').hide();
	$('.ContentHead').text('Today\'s Status');
}
