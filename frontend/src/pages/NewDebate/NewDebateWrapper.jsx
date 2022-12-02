import React from "react";

import NewDebate from "./NewDebate";
import NewDebateMobile from "./NewDebateMobile";

import './NewDebate.css';

const useViewport = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
  
    React.useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
  
    // Return the width so we can use it in our components
    return { width };
  }

const NewDebateWrapper = () => {
    const { width } = useViewport();
    const breakpoint = 1000;
  
    return width < breakpoint ? <NewDebateMobile/> : <NewDebate />;
};

export default NewDebateWrapper;