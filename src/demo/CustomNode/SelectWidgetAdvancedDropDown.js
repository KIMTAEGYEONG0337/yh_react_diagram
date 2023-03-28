import React, {FC, useRef, useState, useEffect} from "react";
import { DiagramEngine } from "@projectstorm/react-diagrams";
import * as S from "../../styled";
import {SelectNode} from "./SelectNode";

import { Autocomplete, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";

export interface SelectNodeWidgetAdvancedProps {
    node: SelectNode;
    engine: DiagramEngine;
}

const SelectNodeWidgetAdvanced : FC<SelectNodeWidgetAdvancedProps> = ({ engine, node}) => {
    const [data, setData] = useState([]);
    const [getTable, setTable] = useState([]);
    const [getColumn, setColumn] = useState([]);
    
    // DB에서 끌어다 쓰자
    useEffect(() => {
        axios
            .get(
                "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
            )
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const country = [...new Set(data.map((item) => item.country))];

    const handleCountry = (event, value) => {
        let states = data.filter((state) => state.country === value);
        states = [...new Set(states.map((item) => item.name))];
        states.sort();

        setColumn(states);
    };

    return (
        <S.Widget>
            <S.Port
                port={node.outPort}
                engine={engine}
                style={{ right: -4, top: "50%" }}
            />
            <Container>
                <Typography>FROM</Typography>
                <Autocomplete
                    onChange={(event, value) => handleCountry(event, value)}
                    id="table"
                    getOptionLabel={(country) => `${country}`}
                    options={country}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    noOptionsText={"No Available Data"}
                    renderOption={(props, country) => (
                        <Box component="li" {...props} key={country} value={getTable}>
                            {country}
                        </Box>
                    )}
                    renderInput={(params) => <TextField {...params} label={"Table"}/>}
                />
                <Typography>SELECT</Typography>
                <Autocomplete
                    id="column"
                    getOptionLabel={(getColumn) => `${getColumn}`}
                    options={getColumn}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    noOptionsText={"No Available User"}
                    renderOption={(props, getColumn) => (
                        <Box component="li" {...props} key={getColumn}>
                            {getColumn}
                        </Box>
                    )}

                    onChange={(e) => {
                        node.setValue(getColumn)
                        console.log(node.s_value)
                        // console.log(node.getValue())
                    }}
                    renderInput={(params) => <TextField {...params} label="Column" />}
                />
            </Container>            
        </S.Widget>
    );
};

export default SelectNodeWidgetAdvanced;
