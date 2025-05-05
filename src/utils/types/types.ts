import { SxProps, Theme } from '@mui/material';

export type MuiStyles = Record<string, SxProps<Theme>>;
export type FormEvent = React.FormEvent<HTMLFormElement>;

export type MessageType = {
    id?: number;
    user_id: string;
    group_id: number;
    message: string;
    sent_at: string;
    profiles?: ProfileType;
};

export type GroupType = null | {
    id: number;
    name: string;
    description: string;
    avatar: string;
};

export type EventType = {
    id: number;
    group_id: number;
    name: string;
    description: string;
    category: string;
    location: string;
    start_date: Date;
    end_date: Date;
    price: number;
    currency: string;
    dress_code: string;
    max_capacity: number;
    age_limit: number;
    tickets: TicketType[];
};

export type MembersType = {
    user_id: string;
    group_id: number;
    role: string;
    profiles: ProfileType;
};

export type ProfileType = {
    username: string;
};

export type TicketType = {
    profiles: ProfileType;
};
