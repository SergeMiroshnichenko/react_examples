import React from "react";

import { Information, Link } from "./Info.styles";

const CreateFlow: React.FunctionComponent = () => (
  <Information>
    Oops! We couldn’t find any shared flows. If you have team members, they can &nbsp;
    <Link href="#" target="_blank">
      create and share
    </Link>
    &nbsp; flows that you can access here.
  </Information>
);

export default CreateFlow;
