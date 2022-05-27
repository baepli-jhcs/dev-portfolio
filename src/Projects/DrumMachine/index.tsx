import { LegacyRef, useCallback, useEffect, useRef, useState } from "react";
import soundFiles from "./soundFiles";
import DrumCSS from "./DrumMachine.module.scss";

export default function DrumMachine() {
  let q: LegacyRef<HTMLAudioElement> | undefined = useRef(null);
  let w = useRef(null);
  let e = useRef(null);
  let a = useRef(null);
  let s = useRef(null);
  let d = useRef(null);
  let z = useRef(null);
  let x = useRef(null);
  let c = useRef(null);

  let sounds = {
    q,
    w,
    e,
    a,
    s,
    d,
    z,
    x,
    c,
  };

  let soundFilesMap = useRef(new Map(Object.entries(soundFiles)));
  let soundsMap = useRef(new Map(Object.entries(sounds)));

  let [display, setDisplay] = useState("");

  let divs = [];

  const playSound = useCallback(
    (key: string) => {
      let sound = soundsMap.current.get(key);
      if (sound && sound.current) {
        sound.current.play();
        if (soundFilesMap.current.get(key)?.id!)
          setDisplay(soundFilesMap.current.get(key)?.id!);
        let elements = document.getElementsByClassName("drum" + key);
        for (let i = 0; i < elements.length; i++) {
          elements[i].classList.add(DrumCSS.hit);
        }
        setTimeout(() => {
          for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove(DrumCSS.hit);
          }
        }, 150);
      }
    },
    [soundsMap]
  );

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (soundFilesMap.current.has(e.key.toLowerCase())) {
        playSound(e.key.toLowerCase());
      }
    });
  }, [playSound]);

  for (let key in sounds) {
    divs.push(
      <div
        className={`${DrumCSS.pad} ${"drum" + key}`}
        onClick={(e) => playSound(key)}
        key={key}
      >
        <audio
          src={soundFilesMap.current.get(key)?.url}
          ref={soundsMap.current.get(key)}
        />
        {key.toUpperCase()}
      </div>
    );
  }

  return (
    <div className={DrumCSS.container}>
      <div className={DrumCSS.inner}>
        <div className={DrumCSS.display}>{display}</div>
        <div className={DrumCSS.grid}>{divs}</div>
      </div>
    </div>
  );
}
