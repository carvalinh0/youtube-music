console.log("Script loaded");
window.pywebview.api.debug("Script loaded");

function getMusicinfo() {
  try {
    return {
      music_name: document.querySelector(".content-info-wrapper > yt-formatted-string:nth-child(1)").title,
      music_artists: document.querySelector("yt-formatted-string.byline:nth-child(1)").attributes.title.value.split(" • ")[0],
      image_url: document.querySelector("#thumbnail > img:nth-child(1)").src,
      time_lenght_in_seconds: Number(document.querySelector("#progress-bar > div:nth-child(1) > div:nth-child(1) > tp-yt-paper-progress:nth-child(1)").ariaValueMax),
      current_time: Number(document.querySelector("#progress-bar > div:nth-child(1) > div:nth-child(1) > tp-yt-paper-progress:nth-child(1)").value),
      hasMusic: true
    }
  } catch (err) {
    console.log(err)
  }

  return {hasMusic: false}
}

const playerBar = document.querySelector("#progress-bar > div:nth-child(1) > div:nth-child(1) > tp-yt-paper-progress:nth-child(1)");
const pauseButton = document.querySelector("#play-pause-button > button:nth-child(1) > yt-icon:nth-child(1) > span:nth-child(1)");

if (playerBar) {
    const observer = new MutationObserver((mutations) => {
        const data = getMusicinfo();

        if (data.hasMusic && window.pywebview) {
            window.pywebview.api.receive_data(data);
            console.debug("Sent:", data.music_name);
        }
    });

    observer.observe(playerBar, {
        childList: true,
        subtree: true,
      	attributes: true,
        characterData: true
    });

    const observer2 = new MutationObserver((mutations) => {
        window.pywebview.api.stop();
        console.debug("Stopped");
    });

    observer2.observe(pauseButton, {
        childList: true,
        subtree: true,
      	attributes: true,
        characterData: true
    });

    console.log("Observer inicializated");
} else {
    console.log("There's no player bar");
}