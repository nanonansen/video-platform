import React from "react";
import Wrapper from "../Wrapper";
import Text from "../Text";

const Styleguide = () => {
    return (
        <Wrapper>
            <h1>Styleguide</h1>
            <section>
                <h2>Typography</h2>
                <Text type={"hero"}>Hero</Text>
                <Text type={"headline"}>Headline</Text>
                <Text type={"subtitle"}>Subtitle</Text>
                <Text type={"large"}>Large Text</Text>
                <Text>Standard Text</Text>
                <hr />
            </section>
            <section>
                <h2>Buttons</h2>
                <hr />
            </section>
            <section>
                <h2>Cards</h2>
                <hr />
            </section>
        </Wrapper>
    );
};

export default Styleguide;
