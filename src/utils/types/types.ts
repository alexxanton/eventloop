import { SxProps, Theme } from '@mui/material';

export type MuiStyles = Record<string, SxProps<Theme>>;
export type FormEvent = React.FormEvent<HTMLFormElement>;

export type Message = {
    id?: number;
    user_id: string;
    group_id: number;
    message: string;
    sent_at: string;
    profile?: Profile;
};

export type Group = null | {
    id: number;
    name: string;
    description: string;
    avatar: string;
};

export type Event = {
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
    tickets: Ticket[];
};

export type Ticket = {
    id: number;
    user_id: string;
    event_id: number;
    ticket_number: string;
    purchased_at: string;
    validated: string;
    event: Event;
    profile: Profile;
};

export type Member = {
    user_id: string;
    group_id: number;
    role: string;
    profile: Profile;
};

export type Profile = {
    username: string;
    avatar: string;
};
