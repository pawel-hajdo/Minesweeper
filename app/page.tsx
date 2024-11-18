import Board from "@/components/board";

export default function Home() {
  return (
    <div className="justify-items-center">
      <Board rows={10} cols={10} mines={15} />
    </div>
  );
}
