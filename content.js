// 再生回数を取得する関数
function getCurrentViewCount() {
    const viewCountElement = document.querySelector(
        ".view-count"
    );
    if (viewCountElement) {
        const viewCountText = viewCountElement.textContent;
        const viewCount = parseInt(viewCountText.replace(/[^0-9]/g, ""));
        return viewCount;
    }
    return null;
}

function getHslColor(viewCount) {
    const hue = Math.log10(viewCount) * 50;
    const toFixed = hue.toFixed(0);
    const hslColor = `hsl(${toFixed}deg 100% 20%)`;
    return hslColor;
}

let styleElement = document.createElement("style"); // Create ONCE outside the function
document.head.appendChild(styleElement); // Append ONCE outside the function

// 再生回数に応じて背景色を更新
function updateYtdAppBackgroundColor() {
    const viewCount = getCurrentViewCount();

    const url = window.location.href;
    if (!(url.includes("https://www.youtube.com/watch?"))) {
        styleElement.textContent = `.ytd-app { background-color: transparent; }`;
        return;
    }

    if (viewCount !== null) {
        const hslColor = getHslColor(viewCount);
        // console.log(hslColor);

        styleElement.textContent = `.ytd-app { background-color: ${hslColor}; }`;
    } else {
        // setBackgroundColor(`black`);
    }
}

setInterval(() => {
    updateYtdAppBackgroundColor();
    processRelatedVideos();
}, 1000);

function convertViewCountToNumber(viewCount) {
    let num = parseInt(viewCount.replace(/[^0-9]/g, ""));
    if (viewCount.includes("K")) {
        num *= 1000;
    } else if (viewCount.includes("M")) {
        num *= 1000 * 1000;
    }
    return num;
}

function processRelatedVideosSub(parent, parentSelectors, getViewCountElement) {
    parent.querySelectorAll(parentSelectors).forEach((relatedVideo) => {
        const viewCountElement = getViewCountElement(relatedVideo);
        if (viewCountElement == null) return;
        const view = convertViewCountToNumber(viewCountElement.innerHTML);
        const hsl = getHslColor(view);
        relatedVideo.style.backgroundColor = hsl;
        // console.log(hsl);
    });
}

function processRelatedVideos() {
    const url = window.location.href;
    if (url.includes("shorts")) {
        return;
    }

    processRelatedVideosSub(
        document,
        ".style-scope.ytd-item-section-renderer",
        (relatedVideo) => {
            return (
                relatedVideo.querySelector(".inline-metadata-item") ??
                relatedVideo.querySelector("#metadata-line") ??
                relatedVideo.querySelector(".yt-core-attributed-string")
            );
        }
    );

    
    processRelatedVideosSub(
        document,
        ".style-scope.ytd-rich-grid-renderer",
        (relatedVideo) => {
            return (
                relatedVideo.querySelector(".inline-metadata-item") ??
                relatedVideo.querySelector("#metadata-line") ??
                relatedVideo.querySelector(".yt-core-attributed-string")
            );
        }
    );


    document
        .querySelectorAll(".style-scope.ytd-section-list-renderer")
        .forEach((line) => {
            // style-scope yt-horizontal-list-renderer
            // console.log(line);
            line.querySelectorAll(".style-scope.ytd-item-section-renderer").forEach(
                (relatedVideo) => {
                    // console.log(relatedVideo);
                }
            )
            // processRelatedVideosSub(
            //     line,
            //     ".style-scope.ytd-section-list-renderer",
            //     (relatedVideo) => {
            //         return (
            //             relatedVideo.querySelector(".inline-metadata-item") ??
            //             relatedVideo.querySelector("#metadata-line") ??
            //             relatedVideo.querySelector(".yt-core-attributed-string")
            //         );
            //     }
            // );
        });
}
