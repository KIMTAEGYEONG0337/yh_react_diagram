import { CanvasEngine } from "@projectstorm/react-canvas-core";
import {
    DefaultPortModel,
    NodeModel,
    NodeModelGenerics,
} from "@projectstorm/react-diagrams";
import {SelectNode} from "../SelectNode/SelectNode";

export class FilterNode extends NodeModel<NodeModelGenerics> {
    dataSet = {
        value : [''],
        op : '',
        cond : '',
    }
    outPort = new DefaultPortModel(false, "result");
    inPort = new DefaultPortModel(true, "in");

    constructor(readonly engine: CanvasEngine) {
        super({ type: "filter-node" });
        this.addPort(this.outPort);

        this.addPort(this.inPort);
        this.inPort.setMaximumLinks(1);
    }

    setOperator = (operator: string) => {
        this.dataSet.op = operator;
        this.engine.repaintCanvas();
    };

    serialize() {
        return {
            ...super.serialize(),
            value: this.dataSet.value
        };
    }

    getNumber(port: DefaultPortModel): void {
        const link = Object.values(port.getLinks())[0];
        const node = link?.getSourcePort()?.getNode();

        if (node instanceof SelectNode) {
            console.log(node.dataSet.value)
            this.setValue(node.dataSet.value)
        }
    }

    setValue(value: string[]) {
        this.dataSet.value = [...value];
    }

    refresh() {
        this.getNumber(this.inPort);
    }
}

export default FilterNode;
