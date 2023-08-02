import { _decorator, Component, Label } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('ScoreBroadcast')
export class ScoreBroadcast extends Component {

    @property(Label)
    private scoreLabel: Label = null;

    public score: number = 0;

    updateScoreLabel() {
        this.score++;
        if (this.scoreLabel) {
            this.scoreLabel.string = `Score: ${this.score}`;
        }
    }
}