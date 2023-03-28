import React, {FC, useState} from "react";
import { DiagramEngine } from "@projectstorm/react-diagrams";
import * as S from "../../styled";
import {FilterNode, Operator} from "./FilterNode";

import {Autocomplete, Container, FormControl, InputLabel, MenuItem, TextField, Typography} from "@mui/material";
import { Box } from "@mui/system";

export interface FilterNodeWidgetProps {
    node: FilterNode;
    engine: DiagramEngine;
}

const op = Object.values(Operator).map((value) => (
    value
));

const FilterNodeWidget : FC<FilterNodeWidgetProps> = ( {engine, node}) => {
    const [getOp, setOp] = useState('');
    const [getCond, setCond] = useState('');

    console.log(node.s_value);

    node.refresh(getCond);

    const handleOp = (event, value) => {
        node.setOperator(value);
    };

    const handleCond = (event) => {
        setCond(event.target.value);
        console.log(getCond);
    };

    return (
        <S.Widget>
            <S.Port
                port={node.outPort}
                engine={engine}
                style={{ right: -4, top: "50%" }}
            />
            <S.Port
                port={node.inPort}
                engine={engine}
                style={{ left: -4, top: "50%" }}
            />
            <Container>
                <Typography>OPERATOR</Typography>
                <Autocomplete
                    onChange={(event, value) => handleOp(event, value)}
                    id="operator"
                    getOptionLabel={(op) => `${op}`}
                    options={op}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    noOptionsText={"No Available Data"}
                    renderOption={(props, op) => (
                        <Box component="li" {...props} key={op} value={getOp}>
                            {op}
                        </Box>
                    )}
                    renderInput={(params) => <TextField {...params} label={"Op"}/>}
                />
                <Typography>CONDITION</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '& > :not(style)': { m:0 },
                    }}
                >
                    <TextField
                        helperText="B: 최소 최대 | E/L: 문자"
                        id="demo-helper-text-misaligned"
                        label="Condition"
                        required
                        onChange={handleCond}
                    />
                </Box>
            </Container>
        </S.Widget>
    );
}

export default FilterNodeWidget;