import { Switch } from "antd";
import * as React from "react";
import { render } from "react-dom";

import "antd/dist/antd.css";
import { Kanban } from "./kanban";

const App: React.FC = () => {
  const [withContainer, setWithContainer] = React.useState<boolean>(true);

  const onChange = checked => {
    setWithContainer(checked);
  };

  let overflowTitle;
  if (withContainer) {
    overflowTitle =
      " With MiniLayoutContainer: dragging items horizontally DOES NOT scrolls the board";
  } else {
    overflowTitle =
      " Without MiniLayoutContainer: dragging items horizontally scrolls the board";
  }

  return (
    <React.Fragment>
      <span>
        <Switch defaultChecked onChange={onChange} />
        {overflowTitle}
      </span>
      {withContainer ? (
        <MiniLayoutContainer>
          <Kanban />
        </MiniLayoutContainer>
      ) : (
        <Kanban />
      )}
    </React.Fragment>
  );
};

const MiniLayoutContainer: React.FC = props => {
  return (
    <section
      style={{
        display: "flex",
        flex: "auto",
        flexDirection: "row",
        minHeight: "0",
        background: "#f0f2f5",
        height: "90vh"
      }}
    >
      <section
        style={{
          overflowX: "hidden",
          overflowY: "hidden",
          display: "flex",
          flex: "auto",
          flexDirection: "column",
          minHeight: "0",
          background: "#f0f2f5"
        }}
      >
        <div style={{ height: "100%", position: "relative", display: "block" }}>
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "inline-flex",
              overflowY: "auto",
              position: "absolute"
            }}
          >
            <main
              style={{
                height: "100%",
                padding: "24px",
                flex: "auto",
                minHeight: "0",
                display: "block"
              }}
            >
              {props.children}
            </main>
          </div>
        </div>
      </section>
    </section>
  );
};

render(<App />, document.getElementById("root"));
