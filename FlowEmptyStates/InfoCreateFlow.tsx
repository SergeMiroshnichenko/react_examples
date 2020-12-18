import React from "react";

import { Information, Link } from "./Info.styles";

const CreateFlow: React.FunctionComponent = () => (
  <Information>
    Oops! Looks like you haven’t created any flows yet.&nbsp;
    <Link href="#" target="_blank">
      Click here
    </Link>
    &nbsp;to create a flow,
  </Information>
);

export default CreateFlow;
