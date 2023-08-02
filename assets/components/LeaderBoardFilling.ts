import { Component, Label, Node, ScrollView, _decorator, director } from 'cc';
const { ccclass, property } = _decorator;

import { EditBoxController } from './EditBoxController';
import { ScoreBroadcast } from './ScoreBroadcast';

@ccclass('LeaderBoardFilling')
export class LeaderBoardFilling extends Component {
    @property(ScrollView)
    private scrollView: ScrollView = null;

    private scoreBroadcast: ScoreBroadcast = null;
    private editBoxController: EditBoxController = null;
    private nameUser: string = '';
    private score: number = 0;

    onLoad() {
        const BG = director.getScene().getChildByName('Canvas').getChildByName('BG');
        this.scoreBroadcast = BG?.getChildByName('ScoreLabel')?.getComponent(ScoreBroadcast);

        this.editBoxController = BG?.getChildByName('Menu')?.
            getChildByName('NameEditBox')?.getComponent(EditBoxController);
    }

    updateInformation() {
        this.nameUser = this.editBoxController.nameUser;
        this.score = this.scoreBroadcast.score;
        this.addScoreEntry();
    }

    private addScoreEntry() {
        const entryString = `${this.nameUser}: ${this.score}`;
        const labelNode = this.createLabelNode(entryString);
        this.scrollView.content.addChild(labelNode);
    }

    createLabelNode(entryString: string): Node {
        const labelNode = new Node();
        const label = labelNode.addComponent(Label);
        label.string = entryString;
        return labelNode;
    }
}


