import * as React from 'react';
import * as _ from 'lodash';
import { TrayWidget } from './TrayWidget';
import { Application } from "../Application";
import { TrayItemWidget } from './TrayItemWidget';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from "../../helpers/DemoCanvasWidget";
import SelectNodeFactory from "../CustomNode/SelectNodeFactory";
import {SelectNode} from "../CustomNode/SelectNode";
import createEngine, {
	DefaultDiagramState,
	DiagramModel
} from "@projectstorm/react-diagrams";
import "../../styled";
import styled from '@emotion/styled';

export interface BodyWidgetProps {
	app: Application;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace S {
	export const Body = styled.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		min-height: 100%;
	`;

	export const Header = styled.div`
		display: flex;
		background: rgb(30, 30, 30);
		flex-grow: 0;
		flex-shrink: 0;
		color: white;
		font-family: Helvetica, Arial, sans-serif;
		padding: 10px;
		align-items: center;
	`;

	export const Content = styled.div`
		display: flex;
		flex-grow: 1;
	`;

	export const Layer = styled.div`
		position: relative;
		flex-grow: 1;
	`;
}

const engine = createEngine({ registerDefaultDeleteItemsAction: false });
engine.getNodeFactories().registerFactory(new SelectNodeFactory());

export class BodyWidget extends React.Component<BodyWidgetProps> {
	render() {
		this.props.app.getDiagramEngine().getNodeFactories().registerFactory(new SelectNodeFactory());
		return (
			<S.Body>
				<S.Header>
					<div className="title">Storm React Diagrams - DnD demo</div>
				</S.Header>
				<S.Content>
					<TrayWidget>
						<TrayItemWidget model={{ type: 'in' }} name="In Node" color="rgb(192,255,0)" />
						<TrayItemWidget model={{ type: 'out' }} name="Out Node" color="rgb(0,192,255)" />
					</TrayWidget>
					<S.Layer
						onDrop={(event) => {
							const data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
							const nodesCount = _.keys(this.props.app.getDiagramEngine().getModel().getNodes()).length;

							let node: SelectNode = null;
							if (data.type === 'in') {
								node = new SelectNode(this.props.app.getDiagramEngine());
							} else {
								node = new SelectNode(this.props.app.getDiagramEngine());
							}
							const point = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
							node.setPosition(point);
							this.props.app.getDiagramEngine().getModel().addNode(node);
							this.forceUpdate();
						}}
						onDragOver={(event) => {
							event.preventDefault();
						}}
					>
						<DemoCanvasWidget>
							<CanvasWidget engine={this.props.app.getDiagramEngine()} />
						</DemoCanvasWidget>
					</S.Layer>
				</S.Content>
			</S.Body>
		);
	}
}
