import { CanvasEngine } from "@projectstorm/react-canvas-core";
import {
    DefaultPortModel,
    NodeModel,
    NodeModelGenerics,
} from "@projectstorm/react-diagrams";
import {SelectNode} from "../CustomNode/SelectNode";

export enum Operator {
    BETWEEN = "Between",
    EQUAL = "Equal",
    LIKE = "Like"
}

export class FilterNode extends NodeModel<NodeModelGenerics> {
    s_value : string[] = [];
    operator = Operator.BETWEEN;
    outPort = new DefaultPortModel(false, "result");
    inPort = new DefaultPortModel(true, "in");

    constructor(readonly engine: CanvasEngine) {
        super({ type: "filter-node" });
        this.addPort(this.outPort);

        this.addPort(this.inPort);
        this.inPort.setMaximumLinks(1);
    }

    setOperator = (operator: Operator) => {
        this.operator = operator;
        this.engine.repaintCanvas();
    };

    serialize() {
        return {
            ...super.serialize(),
            value: this.s_value
        };
    }

    getNumber(port: DefaultPortModel): void {
        const link = Object.values(port.getLinks())[0];
        const node = link?.getSourcePort()?.getNode();

        if (node instanceof SelectNode) {
            console.log(node.s_value)
            this.setValue(node.s_value)
        }
    }

    getValidationData(port: DefaultPortModel, str: string): void {
        const link = Object.values(port.getLinks())[0];
        const node = link?.getSourcePort()?.getNode();

        if (node instanceof SelectNode) {
            if(this.operator == 'Between') {
                // 미구현
                this.setValue(node.s_value)
            }
            else if(this.operator == 'Equal') {
                const result = node.s_value.filter(data => data === str);
                this.setValue(result);
            }
            else if(this.operator == 'Like') {
                // 미구현
                this.setValue(node.s_value)
            }
        }
    }

    setValue(value: string[]) {
        this.s_value = [...value];
        // this.engine.repaintCanvas();
    }

    refresh(str: string) {
        // this.getNumber(this.inPort);
        this.getValidationData(this.inPort, str);
    }
}

export default FilterNode;
