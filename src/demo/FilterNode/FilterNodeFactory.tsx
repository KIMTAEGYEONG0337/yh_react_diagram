import * as React from "react";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import {FilterNode} from "./FilterNode";
import FilterNodeWidget from "./FilterWidget";

class FilterNodeFactory extends AbstractReactFactory<
    FilterNode,
    DiagramEngine
    > {
    constructor() {
        super("filter-node");
    }

    generateReactWidget(event: any) {
        return <FilterNodeWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: any) {
        return new FilterNode(this.engine);
    }
}

export default FilterNodeFactory;
