// 再生回数を取得する関数
function getViewCount() {
    const viewCountElement = document.querySelector('.view-count, #info-text .style-scope.ytd-video-primary-info-renderer');
    if (viewCountElement) {
        const viewCountText = viewCountElement.textContent;
        const viewCount = parseInt(viewCountText.replace(/[^0-9]/g, ''));
        return viewCount;
    }
    return null;
}

function setBackgroundColor(color) {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .ytd-app {
        background-color: ${color}
      }
    `;
    document.head.appendChild(styleElement);
    // console.log(`背景色が ${color} に設定されました。`);
}

function getHslColor(viewCount) {
    const hue = Math.log10(viewCount) * 50;
    const toFixed = hue.toFixed(0);
    const hslColor = `hsl(${toFixed}deg 100% 20%)`;
    return hslColor;
}

// 再生回数に応じて背景色を更新
function updateBackgroundColor() {
    const viewCount = getViewCount();

    if (viewCount !== null) {
        const hue = Math.log(viewCount) * 30;
        console.log(hue);
        const hslColor = `hsl(${hue}deg 100% 20%)`;

        setBackgroundColor(hslColor);
        // console.log(`再生回数: ${viewCount}, 背景色: ${color}`);
    } else {
        // setBackgroundColor(`black`)
    }
}

setInterval(() => {
    updateBackgroundColor();
    processRelatedVideos();
}, 3000);

function convertViewCountToNumber(viewCount) {
    let num = parseInt(viewCount.replace(/[^0-9]/g, ''));
    if (viewCount.includes('K')) {
        num *= 1000;
    }
    else if (viewCount.includes('M')) {
        num *= 1000000;
    }
    return num;
}


function processRelatedVideos() {
    //  style-scope ytd-item-section-renderer style-scope ytd-item-section-renderer
    document.querySelectorAll('.style-scope').forEach(relatedVideo => {
        const viewCountElement = relatedVideo.querySelector('.inline-metadata-item'); // Adjust selector
        if (viewCountElement == null) return;
        const view = convertViewCountToNumber(viewCountElement.innerHTML);
        const hsl = getHslColor(view);
        relatedVideo.style.backgroundColor = hsl;

    });
}

const relatedVideosContainer = document.querySelector('.related-videos-container'); // Adjust selector
const observer = new MutationObserver(() => processRelatedVideos());
observer.observe(relatedVideosContainer, { childList: true, subtree: true });
