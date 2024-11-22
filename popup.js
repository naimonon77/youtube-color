chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const videoId = tabs[0].url.split("v=")[1]?.split("&")[0];
    if (videoId) {
      chrome.runtime.sendMessage({ action: "getVideoData", videoId }, response => {
        document.getElementById("viewCount").innerText = `再生数: ${response.viewCount}`;
      });
    }
  });
  