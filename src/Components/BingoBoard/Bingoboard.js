import { useEffect } from "react";
import { db } from "../../indexdb";

export default function Bingoboard({
  drawnnumbers,
  setUploadFlag,
  showUpload,
  gameStarted,
}) {
  const bingoItem = [];
  const handleAudioUpload = (event) => {
    if (!gameStarted) {
      const number = event.currentTarget.innerText;
      setUploadFlag({ show: true, number: number });
    } else {
      const element = event.currentTarget;
      element.style.animation = "shake 0.3s ease-in-out 0s 2";
      element.style.border = "2px solid rgba(255, 71, 71,0.7)";
      setTimeout(() => {
        element.style.animation = "";
        element.style.border = element.fileAttached
          ? "2px solid var(--primary-color)"
          : "0.5px solid var(--fourth)";
      }, 1000);
    }
  };

  useEffect(() => {
    async function fetchAudios() {
      const result = await db.audio.toArray();
      for (var i = 0; i < result.length; i++) {
        const item = result[i];
        const element = document.getElementsByClassName(`number${item.key}`);
        element[0].style.border = "2px solid var(--primary-color)";
        element[0].fileAttached = true;
      }
    }
    const elements = document.getElementsByClassName("bingoItem");
    Array.from(elements).forEach((element) => {
      element.style.border = "0.5px solid var(--fourth)";
    });
    fetchAudios();
  }, [showUpload]);

  for (var i = 1; i < 91; i++) {
    bingoItem.push(
      <div
        key={i}
        onClick={handleAudioUpload}
        className={`bingoItem number${i} ${
          drawnnumbers.includes(i) ? "numberDrawned" : ""
        } ${drawnnumbers[drawnnumbers.length - 1] === i ? "isPicked" : ""}`}
      >
        {i}
      </div>
    );
  }
  return (
    <div className="bingoBoard">
      <div>{bingoItem}</div>
    </div>
  );
}
