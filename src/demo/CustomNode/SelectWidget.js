import React, {FC, useRef, useState, useEffect} from "react";
import { DiagramEngine } from "@projectstorm/react-diagrams";
import Select from "react-select";
import * as S from "../../styled";
import {SelectNode} from "./SelectNode";

export interface SelectNodeWidgetProps {
    node: SelectNode;
    engine: DiagramEngine;
}

const cOptions = [
    { value: "name", label: "name"},
    { value: "phone", label: "phone"},
    { value: "sex", label: "sex"}
];

const SelectNodeWidget : FC<SelectNodeWidgetProps> = ({ engine, node}) => {
    const [selectedValue, setSelectedValue] = useState(cOptions[0]);

    return (
        <S.Widget>
            <S.Port
                port={node.inPort}
                engine={engine}
                style={{ left: -4, top: "50%" }}
            />
            <S.Port
                port={node.outPort}
                engine={engine}
                style={{ right: -4, top: "50%" }}
            />
            <Select
                className="selectItem"
                onChange={(e) => setSelectedValue(e.value)}
                options={cOptions}
                placeholder = "select"
                value={cOptions.filter(function (option){
                    return option.value === selectedValue;
                })}
            />
            <h2><br/>FROM</h2>
        </S.Widget>

    );
};

export default SelectNodeWidget;
