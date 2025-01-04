import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const pictures = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "Front",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "Back",
});

export const books = [
  {
    id: 1,
    video: "/Videos/Naruto.webm",
    folder: "naruto",
    pictures: ["01", "02", "03", "04", "05", "06", "07", "08","09","10","11","12","13","14","15","16"],
    name: "Naruto",
    frontCover: "cover-front",
    backCover: "cover-back"
  },
  {
    id: 2,
    video: "/Videos/OnePiece.webm",
    folder: "onepiece",
    pictures: ["01", "02", "03", "04", "05", "06", "07", "08","09","10","11","12","13","14","15","16"],
    name: "One Piece",
    frontCover: "op-cover-front",
    backCover: "op-cover-back"
  },
  {
    id: 3,
    video: "/Videos/Death_Note.webm",
    folder: "dn",
    pictures: ["01", "02", "03", "04", "05", "06", "07", "08","09","10","11","12","13","14","15","16"],
    name: "Death Note",
    frontCover: "dn-cover-front",
    backCover: "dn-cover-back"
  },
  {
    id: 4,
    video: "/Videos/Dragon_Ball.webm",
    folder: "dg",
    pictures: [ "2", "3", "4", "5", "6", "7", "8","9","10","11","12","13","14","15","16","17"],
    name: "Dragon Ball",
    frontCover: "dg-cover-front",
    backCover: "dg-cover-back"
  },
];

export const currentBookAtom = atom(0);

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [currentBook, setCurrentBook] = useAtom(currentBookAtom);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  return (
    <>
      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
        <div className="flex justify-between items-center mt-10">
          <a
            className="pointer-events-auto ml-10"
            href="/"
          >
            <img className="w-20" src="/images/MANGA.png" />
          </a>
          
          <div className="pointer-events-auto mr-10">
            <div className="flex items-center gap-4">
              {books.map((book, index) => (
                <button
                  key={book.id}
                  className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                    index === currentBook
                      ? "bg-white/90 text-black"
                      : "bg-black/30 text-white"
                  }`}
                  onClick={() => {
                    setCurrentBook(index);
                    setPage(0);
                  }}
                >
                  {book.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full overflow-auto pointer-events-auto flex justify-center mb-8">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300  px-4 py-3 rounded-full  text-lg uppercase shrink-0 border ${
                  index === page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Cover" : `Page ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-white transition-all duration-300  px-4 py-3 rounded-full  text-lg uppercase shrink-0 border ${
                page === pages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => setPage(pages.length)}
            >
              Back Cover
            </button>
          </div>
        </div>
      </main>

      <div className="fixed inset-0 flex items-center -rotate-2 select-none ">
        <div className="relative">
          <div className="bg-white/0  animate-horizontal-scroll flex items-center gap-8 w-max px-8">
            <h1 className="shrink-0 text-white text-10xl font-black ">
              MANGA STORE.
            </h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              3D Sample Books 
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">
              Here.
            </h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              SCROLL TO ZOOM.
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">
              Come ,
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">
              Experience 
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">
              And 
            </h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              Buy!
            </h2>
          </div>
          <div className="absolute top-0 left-0 bg-white/0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max">
            <h1 className="shrink-0 text-white text-10xl font-black ">
            MANGA STORE
            </h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              Sample Books Here
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">
              Three.js
            </h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              SCROLL TO ZOOM
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">
              Tutorials
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">
              Learn
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">
              Practice
            </h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              Creative
            </h2>
          </div>
        </div>
      </div>
      <footer className="absolute bottom-0 w-full text-center mb-4 pointer-events-auto z-10">
  <p className="text-white text-sm opacity-15">
    Inspired by{" "}
    <a
      href="https://www.youtube.com/@wawasensei"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-25 transition-all duration-300"
    >
      WAWA SENSEI
    </a>
  </p>
</footer>

    </>
  );
};
