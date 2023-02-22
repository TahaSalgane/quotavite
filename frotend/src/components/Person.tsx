import React, { FC } from 'react';

interface props {
    name: string;
    age: number;
}

export const Person: FC<props> = ({ name, age }) => {
    return (
        <div>
            <h1>{name}</h1>
            <h1>{age}</h1>
        </div>
    );
};
