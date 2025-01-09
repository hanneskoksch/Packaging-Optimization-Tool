import FirstApproach from "./first-approach/FirstApproach";
import SecondApproach from "./second-approach/SecondApproach";

function ExperimentalPage() {
  return (
    <>
      <div className="m-10 border p-10">
        <h2 className="font-semibold">Second approach</h2>
        <SecondApproach />
      </div>
      <div className="m-10 border p-10">
        <h2 className="font-semibold">First approach (discarded)</h2>
        <FirstApproach />
      </div>
    </>
  );
}

export default ExperimentalPage;
