import Image from "next/image";
import ToggleTextImage from "./toggle";

export default function Home() {
  
  return (
    <div>
      <h1 style={{ marginLeft: "20px", color: "#F00" }}>Bar Crawl Status</h1>
      <ToggleTextImage />
    </div>
  );
}