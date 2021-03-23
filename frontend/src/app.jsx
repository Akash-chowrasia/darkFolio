import React from "react";
import styled from "styled-components";


const Grid = styled.div`
    display: grid;
    height: 100vh;
    grid-template-rows: 64px 1fr 64px;

    .header {
        background: dodgerblue;
        place-items: center;
    }
    .footer {
        background: turquoise;
    }
`;

const Body = styled.div`
    background: antiquewhite;
    display: grid;
    grid-template-columns: 250px 1fr 250px;

    .left {
        background: tomato;
    }
    .right {
        background: cyan;
    }
`;

const CenterContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    .center-left {
        background: gold;
    }

    .center-right {
        background:  red;
    }
`;


const App = () => {

    return <Grid>
        <span className="header">Header</span>
        <Body>
            <span className="left">Left</span>
            <CenterContainer>
                <span className="center-left">Center Left</span>
                <span className="center-right">Center Right </span>
            </CenterContainer>
            <span className="right">Right</span>
        </Body>
        <span className="footer">Footer</span>
    </Grid>

};

export default App;