import { _decorator, Component, Node, Animation, EventTouch, director, AudioSource } from 'cc';
import { ScoreBroadcast } from './ScoreBroadcast';

const { ccclass } = _decorator;

@ccclass('BallonBehavior')
export class BallonBehavior extends Component {
    private animator: Animation = null;
    private audioSource: AudioSource = null;
    private isMenuOpen: boolean = false;

    onLoad() {
        this.animator = this.node.getComponent(Animation);
        this.audioSource = this.node.getComponent(AudioSource);
    }

    start() {
        this.animator.play('animationBallonFly');
        this.node.on(Node.EventType.MOUSE_DOWN, this.destroyOnMouseDown, this);
    }

    onDestroy() {
        this.removeMouseDownListener();
    }

    setMenuOpen(isOpen: boolean) {
        this.isMenuOpen = isOpen;
        if (isOpen) {
            this.removeMouseDownListener();
        } else {
            this.addMouseDownListener();
        }
    }

    private addMouseDownListener() {
        this.node.on(Node.EventType.MOUSE_DOWN, this.destroyOnMouseDown, this);
    }

    private removeMouseDownListener() {
        this.node.off(Node.EventType.MOUSE_DOWN, this.destroyOnMouseDown, this);
    }

    private destroyOnMouseDown(event: EventTouch) {
        if (!this.isMenuOpen) {
            this.destroyNode();
        }
    }

    private destroyNode() {
        this.removeMouseDownListener();
        this.animator.stop();
        this.animator.play('animationBallonDead');
        this.audioSource.play();

        const scoreController = this.getScoreController();
        if (scoreController) {
            scoreController.updateScoreLabel();
        }
    }

    getScoreController(): ScoreBroadcast {
        const canvas = director.getScene().getChildByName('Canvas');
        return canvas?.getChildByName('BG')?.getChildByName('ScoreLabel')?.getComponent(ScoreBroadcast);
    }
}
