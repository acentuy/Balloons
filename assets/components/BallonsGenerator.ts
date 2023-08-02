import { Color, Component, Node, Prefab, Sprite, Vec3, _decorator, director, instantiate, tween, view } from 'cc';
import { BallonBehavior } from './BallonBehavior';
import { MenuController } from './MenuController';

const { ccclass, property } = _decorator;

@ccclass('BallonsGenerator')
export class BallonsGenerator extends Component {

    @property(Prefab)
    private ballonPrefab: Prefab = null;

    @property([Color])
    private ballonColors: Color[] = [];

    private minDuration: number = 2;
    private maxDuration: number = 5;
    private indent: number = 115;
    private menuController: MenuController = null;
    private generatedBallons: Node[] = [];

    onLoad() {
        const canvas = director.getScene().getChildByName('Canvas');
        this.menuController = canvas?.getChildByName('BG')?.getChildByName('MenuController')?.getComponent(MenuController);
    }

    start() {
        this.schedule(this.generateBallAndReschedule, 2);
    }

    private generateBallAndReschedule(): void {
        const numBalloons = this.getRandomNumber(this.minDuration, this.maxDuration);

        for (let i = 0; i < numBalloons; i++) {
            this.generateBall();
        }

        this.unschedule(this.generateBallAndReschedule);
        const interval = this.getRandomNumber(this.minDuration, this.maxDuration);
        this.schedule(this.generateBallAndReschedule, interval);
    }

    private generateBall(): void {
        const ballonNode: Node = instantiate(this.ballonPrefab);
        this.node.addChild(ballonNode);
        this.generatedBallons.push(ballonNode);

        const ballonBehavior = ballonNode.getComponent(BallonBehavior);
        if (ballonBehavior) {
            ballonBehavior.setMenuOpen(this.menuController.isMenuOpen);
        }

        const ballSprite: Sprite = ballonNode.getComponent(Sprite);
        const randomColor: Color = this.ballonColors[Math.floor(Math.random() * this.ballonColors.length)];

        ballSprite.color = randomColor;
        const screenWidth: number = view.getVisibleSize().width;
        const screenHeight: number = view.getVisibleSize().height;
        const randomX: number = this.getRandomNumber(screenWidth * -0.5, screenWidth * 0.5);
        const randomY: number = screenHeight * -0.5 - this.indent;
        ballonNode.setPosition(new Vec3(randomX, randomY, 0));
        this.node.addChild(ballonNode);
        const randomTargetX: number = randomX;
        const randomTargetY: number = screenHeight * 0.5 + this.indent;
        const duration: number = this.getRandomNumber(this.minDuration, this.maxDuration);
        this.moveAndRemove(ballonNode, new Vec3(randomTargetX, randomTargetY, 0), duration);
    }

    setMenuOpen(isOpen: boolean) {
        for (const ballonNode of this.generatedBallons) {
            const ballonBehavior = ballonNode.getComponent(BallonBehavior);
            if (ballonBehavior) {
                ballonBehavior.setMenuOpen(isOpen);
            }
        }
    }

    private getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private moveAndRemove(node: Node, targetPosition: Vec3, duration: number) {
        tween(node)
            .to(duration, { position: targetPosition })
            .call(() => {
                node.removeFromParent();
            })
            .start();
    }
}
