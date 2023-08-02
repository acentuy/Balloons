import { Component, Node, _decorator, director } from 'cc';
import { BallonsGenerator } from './BallonsGenerator';

const { ccclass, property } = _decorator;

@ccclass('MenuController')
export class MenuController extends Component {

    @property(Node)
    private menuNode: Node = null;

    private ballonsGenerator: BallonsGenerator = null;
    isMenuOpen: boolean = null;

    onLoad() {
        this.isMenuOpen = false;

        const canvas = director.getScene().getChildByName('Canvas');
        this.ballonsGenerator = canvas?.getChildByName('BG')?.getChildByName('BallonsGenerator')?.getComponent(BallonsGenerator);
    }

    onMenuOpen() {
        this.menuNode.active = true;
        this.isMenuOpen = true;
        this.ballonsGenerator.setMenuOpen(this.isMenuOpen);
    }

    onMenuClose() {
        this.menuNode.active = false;
        this.isMenuOpen = false;
        this.ballonsGenerator.setMenuOpen(this.isMenuOpen);
    }
}
