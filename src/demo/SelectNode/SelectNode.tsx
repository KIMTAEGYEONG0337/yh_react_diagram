import { CanvasEngine } from "@projectstorm/react-canvas-core";
import {
    DefaultPortModel,
    NodeModel,
    NodeModelGenerics,
} from "@projectstorm/react-diagrams";

export class SelectNode extends NodeModel<NodeModelGenerics>{
    dataSet = {
        table : '',
        column : '',
        value : [''],
    }
    outPort = new DefaultPortModel(false, "out");

    constructor(readonly engine: CanvasEngine) {
        super({ type: "select-node" });
        this.addPort(this.outPort);
    }

    setValue(value: string[]) {
        this.dataSet.value = [...value];
        this.engine.repaintCanvas();
    }

    serialize() {
        // console.log(this.s_value)
        return {
            ...super.serialize(),
            value: this.dataSet.value
        };
    }
}

export default SelectNode;