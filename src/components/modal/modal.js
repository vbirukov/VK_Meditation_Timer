// import React, { Component } from 'react';
// import bridge from '@vkontakte/vk-bridge';
// import {View, ModalRoot, ModalPage, ModalCard, ModalPageHeader, PanelHeaderButton, platform, ANDROID, IOS, ScreenSpinner, Slider} from '@vkontakte/vkui';
// import {Icon24Cancel, Icon24Done} from '@vkontakte/icons';
// import '@vkontakte/vkui/dist/vkui.css';
// import Home from '../../panels/home/home';
// import fetchUser from '../../api/reques';

// const handleChange = (event) => {
//     setState({...state, durationBuffer: parseInt(event.target.value)});
// }

const modal = (
    <ModalRoot activeModal={this.state.activeModal}>
        <ModalPage
            header={
                <ModalPageHeader
                    left={this.state.platform === ANDROID && <PanelHeaderButton onClick={() => {
                        this.setState({
                            duration: 0,
                            activeModal: null
                        })
                    }}><Icon24Cancel /></PanelHeaderButton>}
                    right={<PanelHeaderButton onClick={() => {
                        this.setState({
                            duration: this.state.durationBuffer * MILISECONDS_IN_MINUTE,
                            activeModal: null
                        })
                    }}>{this.state.platform === IOS ? 'Готово' : <Icon24Done />}</PanelHeaderButton>}
                >
                    Установите длительность
                </ModalPageHeader>
            }
            id="timeInput">
            <Slider
                min={1}
                max={1000}
                value={Number(this.state.duration)}
                onChange={this.handleChange.bind(this)}
            />
            <input type={'number'} onChange={this.handleChange.bind(this)}/>
        </ModalPage>

        <ModalCard
            id='timeInputTest'
            onClose={() => this.setState({
                activeModal: null
            })}
            header="Установите желаемую длительность"
            caption="в минутах"
            actions={[{
                title: 'Установить',
                mode: 'primary',
                action: () => {
                    this.setState({
                        duration: this.state.durationBuffer * MILISECONDS_IN_MINUTE,
                        activeModal: null
                    });
                }
            }]}
        >
            <input type={'number'} onChange={this.handleChange.bind(this)}/>
        </ModalCard>
    </ModalRoot>
);