import { ProgressBar } from "primereact/progressbar";
import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";

type LoaderProps = {
  line?: boolean;
};

export default function Loader({ line }: LoaderProps) {
  return (
    <>
      {line ? (
        <ProgressBar
          color="teal"
          mode="indeterminate"
          style={{ height: "6px" }}
        ></ProgressBar>
      ) : (
        <ProgressSpinner
          style={{ width: "30px", height: "30px" }}
          strokeWidth="4"
        />
      )}
    </>
  );
}
