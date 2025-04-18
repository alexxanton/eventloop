import { SxProps, Theme } from '@mui/material';

export type MuiStyles = Record<string, SxProps<Theme>>;
export type FormEvent = React.FormEvent<HTMLFormElement>;

export type MessageType = {
    user_id: string;
    group_id: number;
    message: string;
    sent_at: string;
};

export type GroupType = null | {
    id: number;
    name: string;
    description: string;
};

export type EventType = {
    id: number;
    name: string;
    description: string;
    category: string;
    location: string;
    start_date: Date;
    end_date: Date;
    price: number;
    dress_code: string;
    max_capacity: number;
    age_limit: number;
};

export type MembersType = {
    user_id: string;
    group_id: number;
    role: string;
};
