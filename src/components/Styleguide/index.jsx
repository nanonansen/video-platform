import React from "react";
import Wrapper from "../Wrapper";
import Text from "../Text";
import Button from "../Button";
import VideoListItem from "../VideoListItem";
import Input from "../Input";
const data = {
    uid: "4TxxpkphIybIeHr1UmC8",
    thumbnail: "https://i.ytimg.com/vi/amJ9DttW4yg/maxresdefault.jpg",
    title: "A Designer's Story: Conforming vs Individuality"
};
const Styleguide = () => {
    return (
        <main className="page-styleguide styleguide">
            <Wrapper>
                <div className="page-title">
                    <Text rank={1} headline>
                        Styleguide
                    </Text>
                </div>

                <section>
                    <header className="styleguide__section-header">
                        <Text rank={2} subtitle>
                            Typography
                        </Text>
                    </header>

                    <Text rank={2} hero>
                        A Designer's Story: Conforming vs Individuality
                    </Text>
                    <Text rank={2} headline>
                        A Designer's Story: Conforming vs Individuality
                    </Text>
                    <Text rank={2} subtitle>
                        A Designer's Story: Conforming vs Individuality
                    </Text>
                    <Text large>
                        A Designer's Story: Conforming vs Individuality
                    </Text>
                    <Text>A Designer's Story: Conforming vs Individuality</Text>
                </section>
                <section>
                    <header className="styleguide__section-header">
                        <Text rank={2} subtitle>
                            Buttons
                        </Text>
                    </header>
                    <Button primary large>
                        Button Label
                    </Button>
                    <Button primary medium>
                        Button Label
                    </Button>
                    <Button primary small>
                        Button Label
                    </Button>
                </section>
                <section>
                    <header className="styleguide__section-header">
                        <Text rank={2} subtitle>
                            Input
                        </Text>
                    </header>
                    <Input
                        placeholder="Input Placeholder"
                        label="Input Label"
                    ></Input>
                </section>
                <section>
                    <header className="styleguide__section-header">
                        <Text rank={2} subtitle>
                            Cards
                        </Text>
                    </header>
                    <div className="auto-grid">
                        <VideoListItem data={data} />
                    </div>
                </section>
            </Wrapper>
        </main>
    );
};

export default Styleguide;
