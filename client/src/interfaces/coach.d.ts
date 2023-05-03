import { BaseKey } from '@pankod/refine-core';

export interface CoachCardProp {
    id?: BaseKey | undefined,
    name: string,
    email: string,
    avatar: string,
    noOfPlayers: number
}

export interface InfoBarProps {
    icon: ReactNode,
    name: string
}
