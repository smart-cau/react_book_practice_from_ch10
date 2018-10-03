import React from "react";
import queryString from "query-string";

const About = ({ match, location }) => {
  const query = queryString.parse(location.search);
  console.log(query);
  const { color } = query;
  return (
    <div>
      <h2 style={{ color }}>Introduction</h2>
      <p>
        Hello, My name is '{match.params.name}
        '.
      </p>
    </div>
  );
};

export default About;
