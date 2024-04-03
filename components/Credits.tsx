import PalCircle from "./PalCircle";
import { useData } from "./DataProvider";
import TopBar from "./TopBar";
import GitHubWhiteIcon from "./icons/GitHubWhiteIcon";

export default function Credits() {
  const { base } = useData();
  return (
    <div
      style={{
        padding: "0 3px",
        backgroundColor: "rgba(22, 25, 24, 0.95)",
        boxShadow: "0px 0px 6px 6px rgba(22, 25, 24, 0.95)",
      }}
    >
      <TopBar title="Credits" />
      <div className="flex flex-col gap-3 p-4">
        <p>Created by Oliver Levay because I love Palworld ❤️</p>
        <p>
          This is prototype I created to showcase how I wish that the palbox UI
          works.
        </p>
        <p>The code is open-source and available at my GitHub.</p>
        <a
          className="flex gap-2 underline"
          href="https://github.com/oliverlevay"
        >
          <GitHubWhiteIcon /> @oliverlevay
        </a>

        <p>
          Special thanks to the GitHub project{" "}
          <a
            href="https://github.com/mlg404/palworld-paldex-api"
            className="underline"
          >
            palworld-paldex-api
          </a>{" "}
          where I could find the necessary data.
        </p>
        <p>
          This is a fan project and not affiliated with Pocketpair in any way.
          All rights to the game belong to Pocketpair.
        </p>
      </div>
    </div>
  );
}
