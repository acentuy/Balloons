import { _decorator, Component, Label } from 'cc';
import { LeaderBoardFilling } from './LeaderBoardFilling';

const { ccclass, property } = _decorator;

@ccclass('EditBoxController')
export class EditBoxController extends Component {
    @property(Label)
    private nameInput: Label = null;

    @property(LeaderBoardFilling)
    private leaderBoardFilling: LeaderBoardFilling = null;

    public nameUser: string = '';

    onSubmit() {
        if (this.nameInput.string != '') {
            this.updateName();
            this.nameInput.string = '';
            this.leaderBoardFilling.updateInformation();
        }
    }

    private updateName() {
        this.nameUser = this.nameInput.string.trim();
    }
}
