import { useState, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";

function App() {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const ffmpegRef1 = useRef(new FFmpeg());
  const ffmpegRef2 = useRef(new FFmpeg());
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const messageRef = useRef<HTMLParagraphElement | null>(null)
  const messageRef1 = useRef<HTMLParagraphElement | null>(null)
  const messageRef2 = useRef<HTMLParagraphElement | null>(null)
  const [video, setVideo] = useState<File | undefined>(undefined);

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.2/dist/esm";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message;
    });
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
      workerURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.worker.js`,
        "text/javascript"
      ),
    });
    setLoaded(true);
  };

  const load1 = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.2/dist/esm";
    const ffmpeg1 = ffmpegRef1.current;
    ffmpeg1.on("log", ({ message }) => {
      if (messageRef1.current) messageRef1.current.innerHTML = message;
    });
    await ffmpeg1.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
      workerURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.worker.js`,
        "text/javascript"
      ),
    });
    setLoaded(true);
  };

  const load2 = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.2/dist/esm";
    const ffmpeg2 = ffmpegRef2.current;
    ffmpeg2.on("log", ({ message }) => {
      if (messageRef2.current) messageRef2.current.innerHTML = message;
    });
    await ffmpeg2.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
      workerURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.worker.js`,
        "text/javascript"
      ),
    });
    setLoaded(true);
  };

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.writeFile("input.avi", await fetchFile(video));
    await ffmpeg.exec(["-i", "input.avi", '-preset', 'ultrafast', '-vf', `scale=540:360`, '-c:a', 'copy', "output.mp4"]);
    const fileData = await ffmpeg.readFile('output.mp4');
    const data = new Uint8Array(fileData as ArrayBuffer);
    if (videoRef.current) {
      videoRef.current.src = URL.createObjectURL(
        new Blob([data.buffer], { type: 'video/mp4' })
      )
    }
  };

  const transcode1 = async () => {
    const ffmpeg1 = ffmpegRef1.current;
    await ffmpeg1.writeFile("input.avi", await fetchFile(video));
    await ffmpeg1.exec(["-i", "input.avi", '-preset', 'ultrafast', '-vf', `scale=960:540`, '-c:a', 'copy', "output.mp4"]);
    const fileData1 = await ffmpeg1.readFile('output.mp4');
    const data1 = new Uint8Array(fileData1 as ArrayBuffer);
    if (videoRef.current) {
      videoRef.current.src = URL.createObjectURL(
        new Blob([data1.buffer], { type: 'video/mp4' })
      )
    }
  };

  const transcode2 = async () => {
    const ffmpeg2 = ffmpegRef2.current;
    await ffmpeg2.writeFile("input.avi", await fetchFile(video));
    await ffmpeg2.exec(["-i", "input.avi", '-preset', 'ultrafast', '-vf', `scale=1280:720`, '-c:a', 'copy', "output.mp4"]);
    const fileData2 = await ffmpeg2.readFile('output.mp4');
    const data2 = new Uint8Array(fileData2 as ArrayBuffer);
    if (videoRef.current) {
      videoRef.current.src = URL.createObjectURL(
        new Blob([data2.buffer], { type: 'video/mp4' })
      )
    }
  };

  const loadFull = () => {
    load();
    load1();
    load2();
  };

  const transcodeFull = () => {
    transcode();
    transcode1();
    transcode2();
  };

  return loaded ? (
    <>
      <br />
      <input type="file" onChange={(e) => setVideo(e.target.files?.item(0) || undefined)} />

      <button onClick={transcodeFull}>Transcode avi to mp4</button>
      <p ref={messageRef}></p>
      <p ref={messageRef1}></p>
      <p ref={messageRef2}></p>
    </>
  ) : (
    <button onClick={loadFull}>Load ffmpeg-core</button>
  );
}

export default App;
