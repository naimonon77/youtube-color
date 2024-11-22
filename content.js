function getViewCount() {
    const viewCountElement = document.querySelector('.view-count, #info-text .style-scope.ytd-video-primary-info-renderer');
    if (viewCountElement) {
        const viewCountText = viewCountElement.textContent;
        return parseInt(viewCountText.replace(/[^0-9]/g, ''));
    }
    return null;
}

function setBackgroundColor(color) {
    const hslColor = `hsl(${hue}, 50%, 50%)`;
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      body {
        background-color: ${color} !important;
      }
      .ytd-app {
        background-color: ${color} !important;
      }
    `;
    document.head.appendChild(styleElement);
    console.log(`背景色が ${color} に設定されました。`);
}

function updateBackgroundColor() {
    const viewCount = getViewCount();
    console.log(`再生回数: ${viewCount}`);
    if (viewCount !== null) {
        let color = "white";
        if (viewCount > 1000000) {
            color = "red";
        } else if (viewCount > 500000) {
            color = "orange";
        } else {
            color = "green";
        }

        setBackgroundColor(color);
        console.log(`再生回数: ${viewCount}, 背景色: ${color}`);
    }
}


// MutationObserverを設定してDOMを監視する
function startObserver() {
    if (observer) observer.disconnect(); // 古いObserverを停止
    observer = new MutationObserver(() => {
        if (document.querySelector('.view-count, #info-text .style-scope.ytd-video-primary-info-renderer')) {
            updateBackgroundColor();
            observer.disconnect(); // 処理が終わったら監視を停止
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// URL変更を監視する
let currentUrl = location.href;

setInterval(() => {
    if (currentUrl !== location.href) {
        currentUrl = location.href;
        console.log("URLが変更されました。新しいページを監視します。");
        startObserver(); // URLが変更されたら再度監視を開始
    }
}, 1000);

// 初期化処理
startObserver();
