// import createEngine, {DefaultDiagramState} from "@projectstorm/react-diagrams";
// import {DiagramModel, DefaultNodeModel,
//         DefaultLinkModel, DefaultPortModel,
//         PathFindingLinkFactory, DefaultLabelModel,
//         DefaultLinkFactory} from "@projectstorm/react-diagrams";
// import * as React from 'react';
// import { CanvasWidget, ListenerHandle} from "@projectstorm/react-canvas-core";
// import { DemoCanvasWidget} from "../helpers/DemoCanvasWidget";
// import {SelectNode} from "./CustomNode/SelectNode";
// import SelectNodeFactory from "./CustomNode/SelectNodeFactory";
// import "../styles.css"
import React from "react";
import createEngine, {
    DefaultDiagramState, DefaultNodeModel,
    DiagramModel
} from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import SelectNodeFactory from "./CustomNode/SelectNodeFactory";
import {SelectNode} from "./CustomNode/SelectNode";
import {FilterNode} from "./FilterNode/FilterNode";
import "../styles.css";
import {DemoCanvasWidget} from "../helpers/DemoCanvasWidget";
import FilterNodeFactory from "./FilterNode/FilterNodeFactory";


export default function simpleNode() {
    var engine = createEngine({registerDefaultDeleteItemsAction: false});
    engine.getNodeFactories().registerFactory(new SelectNodeFactory());
    engine.getNodeFactories().registerFactory(new FilterNodeFactory());
    var model = new DiagramModel();

    var node1 = new DefaultNodeModel( {
        name: 'Node 1',
        color: 'rgb(0, 192, 255)'
    });

    node1.setPosition(100, 100);
    let port1 = node1.addOutPort('Out');

    var node2 = new DefaultNodeModel('Node 2', 'rgb(192, 255, 0)');
    let port2 = node2.addInPort('In');
    node2.setPosition(400, 100);

    var node5 = new SelectNode(engine);
    node5.setPosition(300,200);

    var node6 = new FilterNode(engine);
    node6.setPosition(500,400);

    let link1 = port1.link(port2);
    console.log("link1", link1);
    link1.addLabel("Hello World!");
    // let link1 = port1.link<DefaultLinkModel>(port2);
    // link1.getOptions().testName = 'Test';
    // // link1.addLabel('Hello World!');

    model.addAll(node1, node2, link1, node5, node6);
    // 링크 연결되면 발생하는 이벤트
    // 이걸 통해 노드간 이벤트가 수행 가능할 것으로 생각된다
    // 프론트엔드에서 할 수 있는 기능이 어디까지인지가 중요할 것 같다
    model.registerListener({
        linksUpdated: (event) => {
            event.link.registerListener({
                targetPortChanged: (event) => {
                    console.log('Link Changed');
                }
            })
        }
    });

    engine.setModel(model);
    return (
        // <DemoCanvasWidget>
            <CanvasWidget className="canvas" engine={engine} />
        // </DemoCanvasWidget>
    );
}