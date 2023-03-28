import { CanvasEngine } from "@projectstorm/react-canvas-core";
import {
    DefaultPortModel,
    NodeModel,
    NodeModelGenerics,
} from "@projectstorm/react-diagrams";
import {values} from "lodash";
// import PortModel from "../../PortModel";

export class SelectNode extends NodeModel<NodeModelGenerics>{
    s_value: string[] = [];
    outPort = new DefaultPortModel(false, "result");

    constructor(readonly engine: CanvasEngine) {
        super({ type: "select-node" });
        this.addPort(this.outPort);
    }

    setValue(value: string[]) {
        this.s_value = [...value];
        this.engine.repaintCanvas();
    }

    serialize() {
        // console.log(this.s_value)
        return {
            ...super.serialize(),
            value: this.s_value
        };
    }
}

export default SelectNode;