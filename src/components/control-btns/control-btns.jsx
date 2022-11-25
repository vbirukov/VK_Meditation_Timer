
import React, {PropTypes} from "react";
import { Icon48Pause, Icon48Play, Icon48Replay } from '@vkontakte/icons';
import { Button, Div, Group } from "@vkontakte/vkui";
import styles from './control-btns.module.css'

const ControlBtns = (props) => {
    const {isOn, toggleTimer, resetTimer, isResetBtnVisible} = props;
    const divName = styles.controlButton;
    return (
        <Group title="controls">

            {/*почему то в этом файле React не видит импортированный styles */}
            <Div className={styles.flexCenter}>
                <div
                    className={styles.controlButton}
                    onClick={toggleTimer}>
                    {isOn ? (<Icon48Pause/>) : (<Icon48Play/>)}
                </div>
                {
                    isResetBtnVisible &&

                    <div
                        className={styles.controlButton}
                        onClick={resetTimer}>
                        <Icon48Replay/>
                    </div>
                }
            </Div>
        </Group>
    )
} 

export default ControlBtns;

