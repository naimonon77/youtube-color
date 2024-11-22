chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getVideoData") {
      const apiKey = "YOUR_YOUTUBE_API_KEY"; // ここにAPIキーを設定
      const videoId = message.videoId;
  
      fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          const viewCount = data.items[0].statistics.viewCount;
          sendResponse({ viewCount });
        })
        .catch(error => console.error(error));
  
      return true; // 非同期処理のためtrueを返す
    }
  });

  