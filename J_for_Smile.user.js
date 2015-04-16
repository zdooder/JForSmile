// ==UserScript==
// @name            	Smiling No-J
// @author          	Troy Morrison
// @description     	JavaScript to replace J, K or L letters with the corresponding Smileys - particulararly in GMail, based on J for Smile by Abhinay Omkar
// @include       http*//mail.google.*/*
// @include       http*//inbox.google.*/*
// @match       	http://mail.google.com/*
// @match       	https://mail.google.com/*
// @match       	http://*.mail.google.com/*
// @match       	https://*.mail.google.com/*
// @grant         GM_addStyle
// ==/UserScript==

var changeTimer = '';
var globalFlag = false;

window.addEventListener("load", changeSmilies, false);

function changeSmilies() {
	if ( globalFlag == false) {
		console.log("set global flag");
		globalFlag = true;
		document.addEventListener("DOMSubtreeModified", handleDOMChange, false);
	}
	var allSpans = document.evaluate('.//p[@class="MsoNormal"]/span[contains(@style,"Wingdings")]',
																	document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
																	null);
	console.log('found ' + allSpans.snapshotLength + ' elements');
	for(var i = 0; i < allSpans.snapshotLength; i++) {
		console.log("changing smiley");
		changeSmiley(allSpans.snapshotItem(i));
	}
}

function changeSmiley(elem) {
	var smileyMap = {
		// :-)
		'J' : "<img src='//www.graphon.com/components/com_kunena/template/default_ex/images/english/emoticons/smile.png'/>",
		// :-|
		'K' : "<img src='//www.graphon.com/components/com_kunena/template/default_ex/images/english/emoticons/unsure.png'/>",
		// :-(
		'L' : "<img src='//www.graphon.com/components/com_kunena/template/default_ex/images/english/emoticons/unsure.png'/>"
	};
	
	if ( smileyMap[elem.innerHTML] ) {
		elem.innerHTML = smileyMap[ elem.innerHTML ];
	}	
}

function handleDOMChange(evt) {
	if ( typeof changeTimer == "number" ) {
		clearTimeout(changeTimer);
		changeTimer = '';
	}
	changeTimer = setTimeout(function() { console.log('timer fired'); changeSmilies(); }, 250);
}