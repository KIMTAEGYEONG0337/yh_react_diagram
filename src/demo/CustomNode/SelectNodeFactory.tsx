import * as React from "react";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import {SelectNode} from "./SelectNode";
import SelectNodeWidgetAdvanced from "./SelectWidgetAdvancedDropDown.js";
// import SelectNodeWidget from "./SelectWidget.js";

class SelectNodeFactory extends AbstractReactFactory<
    SelectNode,
    DiagramEngine
    > {
    constructor() {
        super("select-node");
    }

    generateReactWidget(event: any) {
        return <SelectNodeWidgetAdvanced engine={this.engine} node={event.model} />;
    }

    generateModel(event: any) {
        return new SelectNode(this.engine);
    }
}

export default SelectNodeFactory;
