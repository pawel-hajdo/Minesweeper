import Board from "@/components/board";

export default function Home() {
  return (
    <div className="justify-items-center mt-32">
      <Board rows={5} cols={5} mines={2} />
    </div>
  );
}
