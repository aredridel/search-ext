
/*
browser.pageAction.onClicked.addListener((tab) => {
	browser.scripting.executeScript({
		target: {tabId: tab.id}, 
		func: () => {
			const link = `- [${document.title}](${location.href})`;
			location.assign(`obsidian://advanced-uri?daily=true&data=${encodeURIComponent(link)}&mode=append`);
		}
	});
});
*/
